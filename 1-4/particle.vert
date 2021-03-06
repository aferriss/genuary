attribute vec3 aPosition;
attribute vec3 aVertexColor;
attribute vec2 aTexCoord;
attribute float aId;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform mat3 uNormalMatrix;
uniform mat4 uModelViewProjectionMatrix;

varying vec3 vVertexColor;
varying vec2 vTexCoord;
varying float vId;

uniform float time;
uniform float nPlanes;
uniform vec2 res;

varying float vrz;
varying float vrand;

uniform float seed;
uniform sampler2D noiseTex;

varying vec2 fc;

float rand(vec2 co){
    return fract(sin(dot(co.xy + seed ,vec2(12.9898,78.233))) * 43758.5453);
}

mat4 rotationMatrix(vec3 axis, float angle){
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

void main (){
    // Normalized vertex id
    float nid = aId / nPlanes;
    vId = nid;

    // Going to reconstruct the projection matrix bc I think p5 is doing something weird
    float near = 0.01;
    float far = 3000.0;
    float fov = 60.0 / 180.0 * 3.141592;
    float f = 1.0 / tan(fov / 2.0);
    float aspect = res.x / res.y;

    float nf = 1.0 / (near - far);
    mat4 pm = mat4(f / aspect, 0.0, 0.0, 0.0, 0.0, f, 0.0, 0.0, 0.0, 0.0, (far + near) * nf, -1, 0.0, 0.0, 2.0 * far * near * nf, 0.0);
	// vec4 mpvp = (uModelViewProjectionMatrix * vec4(aPosition, 1.0));
	// fc = mpvp.xy / mpvp.w;


	vVertexColor = aVertexColor;
    vTexCoord = aTexCoord;

    vrand = rand(vec2(nid + 0.12));
    
    vec4 p = vec4(aPosition, 1.0);

    mat4 mv = uModelViewMatrix;

    float maxDist = 2000.0;

    // Three random numbers for xyz
    float rx = rand(vec2(nid + 0.3)) * res.x * 2.0 - res.x;
    float ry = rand(vec2(nid + 0.4)) * res.y * 2.0 - res.y;
    float rz = rand(vec2(nid + 0.5)) * 500.0;

    // Add movement to the z
    // rz += time * 8.0;

    // Reset 
    // rz = mod(rz, maxDist);
    vrz = rz;

    // Scoot back so we don't see the reset
    // rz -= 1000.0;

    // Add in a random position

  
	vec4 pos = pm * uModelViewMatrix * vec4(aPosition + vec3(rx, ry, 0.0), 1.0);
	fc = (pos.xy / pos.w) * 0.5 + 0.5;
	vec4 tex = texture2D(noiseTex, fc);
	vec3 disp = (fract(tex.rgb) ) * 100.0;
  
    p.xyz += vec3(rx, ry, rz) + disp;

	gl_Position = pm * uModelViewMatrix * p;

}