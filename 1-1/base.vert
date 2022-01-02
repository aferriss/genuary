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
    p.xy *= randScale;
    p.xy *= sin(time* 0.02 + rand(vec2(nid + 2.0)) * 6.28) * 2.0 ;
    
    // Do the mvm mult here so we don't get weird transforms
	vec4 positionVec4 = uModelViewMatrix * p;
  
    // Random rotation
    positionVec4 = rotationMatrix(vec3(0.0, 0.0, 1.0), rand(vec2(nid+0.3))) * positionVec4;
  
    // Random X position
    positionVec4.x += rand(vec2(nid)) * res.x - res.x * 0.5;
    
    // Move to the top
    positionVec4.y -= res.y * 0.6;
  
    // Slowly falling
    float y = time * (1.0 + rand(vec2(nid + 0.1) ) );
  
    // Random Y offset
    y += rand(vec2(nid + 0.2)) * res.y * 1.6;
  
    // Reset at the bottom
    y = mod(y, res.y + 150.0);

  
    // Add the movement to the particle
    positionVec4.y += y;
    
  
	gl_Position = uProjectionMatrix * positionVec4;
}