precision highp float;


varying vec3 vVertexColor;
varying vec2 vTexCoord;
// varying float vId;

uniform float time;
uniform float nPlanes;
uniform vec2 res;
uniform sampler2D tex0;

void main(){
	float d = dot(vTexCoord - 0.5, vTexCoord - 0.5) * 2.5;
	d = 1.0 - d;
	gl_FragColor = vec4(1.0, 0.9, 0.8, 1.0) * d;
}