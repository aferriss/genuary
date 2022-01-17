attribute vec3 aPosition;
attribute vec3 aVertexColor;
attribute vec2 aTexCoord;
attribute float aId;
attribute vec2 aDataCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform mat3 uNormalMatrix;

varying vec3 vVertexColor;
varying vec2 vTexCoord;
// varying float vId;

uniform float time;
uniform float nPlanes;
uniform vec2 res;
uniform sampler2D tex0;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main (){
    // Normalized vertex id
    // float nid = aId / nPlanes;
    // vId = nid;

	vVertexColor = aVertexColor;
    vTexCoord = aTexCoord;

	float gridWidth = sqrt(nPlanes);
	float x = mod(aId, gridWidth) / gridWidth;
	float y = floor(aId / gridWidth) / gridWidth;
	vec4 d = texture2D(tex0, aDataCoord) ;

    
    vec4 p = vec4(aPosition, 1.0);
	d.xy -= res * 0.5;
  
	vec4 positionVec4 = uModelViewMatrix * p;

	positionVec4.xy += d.xy ;
  
	gl_Position = uProjectionMatrix * positionVec4;
}