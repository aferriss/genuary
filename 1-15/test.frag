precision highp float;
varying vec2 vTexCoord;
uniform float time;
uniform sampler2D tex0;
uniform vec2 res;


void main () {
	vec2 uv = vTexCoord;

	gl_FragColor = abs(texture2D(tex0, uv)).rrra;
	gl_FragColor.a = 1.0;
}