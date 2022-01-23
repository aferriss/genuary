precision highp float;
varying vec2 vTexCoord;
uniform float time;
uniform sampler2D tex0;
uniform vec2 res;
uniform vec2 mouse;

float rand(vec2 co){
	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}


void main () {
	vec2 uv = vTexCoord;
	vec2 tc = vTexCoord;
	float xSteps = 30.0;

	// uv.y += 0.2;
	uv = 1.0-abs(uv * 2.0 - 1.0);

	uv.y -= time * 0.3;
	uv.x = floor(uv.x * xSteps) / xSteps;

	uv.y += sin(uv.x + time) * 0.2;
	uv.y += cos(uv.x * 10.0 + time * 0.1) * 0.1;
	uv.y += sin(uv.y * 10.0 - time * 1.5 ) * 0.02;


	float steps = 20.0;
	float f =  floor(( uv.y * 2.0 + sin(uv.x * 6.28 + time + uv.y * 6.0) * 0.1) * steps) / steps;

    gl_FragColor = 1.0-vec4(fract(f * 2.0 ));
	gl_FragColor += fract(tc.x * xSteps ) * 0.1;
	gl_FragColor.a = 1.0;
}