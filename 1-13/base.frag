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

	float steps = 1.0;
	vec2 tc = floor(uv * steps) / steps;
	float r = rand(time*0.01 + tc);
	float g = rand(time*0.01 + tc+0.01);
	float b = rand(time*0.01 + tc+0.02);

	vec2 pixel = 1.0 / res;
	float edge = step(uv.x, pixel.x * 1.0);
	vec4 c = vec4(r, g, b, 1.0) * edge;
	c = smoothstep(0.0, 1.0, c);

	float off = 0.01;

	vec4 t = texture2D(tex0,  uv - vec2(off, 0.0));
	float l = dot(t.rgb, vec3(0.333));
	t = texture2D(tex0,  uv + vec2(sin(uv.y * 3.0 + time * 1.0 ) * 0.001, 0.0) - vec2(pixel.x  + l * 0.005, t.r * 0.01 - 0.005));

	vec4 left = mix(t, c, edge);
	left.rgb = rgb2hsv(left.rgb);

	left.g = clamp(left.g + 0.005, 0.0, 1.0);

	left.rgb = hsv2rgb(left.rgb);

	left = mix(left, smoothstep(0.0, 1.0, left), l * 0.05);

	gl_FragColor = left;
	gl_FragColor.a = 1.0;
}