precision highp float;
varying vec2 vTexCoord;
uniform float time;
uniform sampler2D tex0;
uniform vec2 res;

float rand(vec2 co){
	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 rgb2hsv(vec3 c){
	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
	vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c){
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(clamp(fract(c.xxx + K.xyz), 0.0, 0.999) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main () {
	vec2 uv = gl_FragCoord.xy / res;
	vec2 tc = uv;

	float r = rand(vec2(0.02 + floor(time + 10.1)));

	if(r < 0.5){
		float mask = step(tc.x, rand(vec2(0.01) + floor(time * 20.0)));
		vec4 tex = texture2D(tex0, fract(tc + vec2(0.0, mask * 0.025)));
		gl_FragColor = tex;

	} else {
		float mask = step(tc.y, rand(vec2(0.01) + floor(time * 20.0)));
		vec4 tex = texture2D(tex0, fract(tc + vec2(mask * 0.025, 0.0)));
		gl_FragColor = tex;
	}

	gl_FragColor.rgb = rgb2hsv(gl_FragColor.rgb);
	// gl_FragColor.r += 0.0005;
	// gl_FragColor.g += 0.005;
	gl_FragColor.r += gl_FragColor.b * 0.001;
	// gl_FragColor.g = fract(gl_FragColor.r * 0.01);
	// gl_FragColor.b = fract( gl_FragColor.g + 0.01);
	gl_FragColor.rgb = hsv2rgb(gl_FragColor.rgb);

	if(time < 1.0){
		gl_FragColor = vec4(uv, 0.5, 1.0);
	}
	gl_FragColor.a = 1.0;
}