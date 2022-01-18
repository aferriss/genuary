precision highp float;
varying vec2 vTexCoord;
uniform float time;
uniform sampler2D tex0;
uniform vec2 res;
uniform vec2 mouse;

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
	vec2 uv = vTexCoord;

    float y = floor(abs(uv.x * 2.0 - 1.0) * mouse.x) + 1.0;

    uv.y = fract(abs(uv.y ) * mouse.y + time * 0.9 * y);
    
    float m0 = step(0.333, uv.y);
    float m1 = step(0.666, uv.y);
   
    vec4 c = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 color = mix(c, c.yxzw, m0);
    color = mix(color, c.yzxw, m1);
    
    gl_FragColor = color;
	gl_FragColor.a = 1.0;
}