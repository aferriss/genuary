precision highp float;
varying vec2 uv;
uniform float time;
uniform vec2 res;
uniform sampler2D tex0;

float rand(vec2 co){
	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main () {
	vec2 tc = gl_FragCoord.xy / res;

	// Two sets of random noise
	float r0 = rand(tc);
	float r1 = rand(tc + 0.1);

	// a circular gradient
	// float l = length(tc - 0.5);
	// l = step(l, 0.25);
	// l *= 0.5;

	// Use our drawing buffer as input
	vec4 t = texture2D(tex0, tc);

	gl_FragColor = vec4(t.r, r0, r1, 1.0);
}