attribute vec3 aPosition;
attribute vec3 aVertexColor;
attribute vec2 aTexCoord;
attribute float aId;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform mat3 uNormalMatrix;

varying vec3 vVertexColor;
varying vec2 vTexCoord;
varying float vId;
varying float rr;

uniform float time;
uniform float nPlanes;
uniform vec2 res;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
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

	vVertexColor = aVertexColor;
    vTexCoord = aTexCoord;

    float randScale = rand(vec2(nid+0.4)) * 3.0;
    
    vec4 p = vec4(aPosition, 1.0);
  
    // Random Scale
	p.xy *= 20.0;
	p.x *= 0.02;
	p.y *= 5.0;
	// p.y *= 0.5;
    // p.xy *= randScale;
    // p.xy *= sin(time* 0.02 + rand(vec2(nid + 2.0)) * 6.28) * 2.0 ;
	p = rotationMatrix(vec3(1.0, 0.0, 0.0), 1.5707) * p;

    
    // Do the mvm mult here so we don't get weird transforms
	vec4 positionVec4 = uModelViewMatrix * p;
  
    // Random rotation
    // positionVec4 = rotationMatrix(vec3(0.0, 0.0, 1.0), rand(vec2(nid+0.3))) * positionVec4;
  
    // Random X position
    positionVec4.x += rand(vec2(nid)) * res.x - res.x * 0.5;
    positionVec4.y += rand(vec2(nid + 0.01)) * res.y - res.y * 0.5;

	rr = rand(vec2(nid + 0.05));
	// float z = time * 2.0 * (1.0 + rand(vec2(nid + 0.003)));
	// z = mod(z, res.y + 150.0);
	// positionVec4.z += z;

    // Move to the top
    // positionVec4.y -= res.y * 0.6;
  
    // Slowly falling
    // float y = time * (1.0 + rand(vec2(nid + 0.1) ) );
  
    // Random Y offset
    // y += rand(vec2(nid + 0.2)) * res.y * 1.6;
  
    // Reset at the bottom
    // y = mod(y, res.y + 150.0);

  
    // Add the movement to the particle
    // positionVec4.y += y;

    float near = 0.01;
    float far = 3000.0;
    float fov = 60.0 / 180.0 * 3.141592;
    float f = 1.0 / tan(fov / 2.0);
    float aspect = res.x / res.y;

    float nf = 1.0 / (near - far);
    mat4 pm = mat4(f / aspect, 0.0, 0.0, 0.0, 0.0, f, 0.0, 0.0, 0.0, 0.0, (far + near) * nf, -1, 0.0, 0.0, 2.0 * far * near * nf, 0.0);
    
  
	gl_Position = pm * positionVec4;
}