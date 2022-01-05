precision highp float;
varying vec3 vVertexColor;
varying vec2 vTexCoord;
varying float vId;

varying float vrz;
varying float vrand;
uniform float time;

varying vec2 fc;

uniform sampler2D noiseTex;
uniform vec2 res;
// uniform sampler2D last;

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
	
	vec2 fc = gl_FragCoord.xy / (res * 1.0);

	vec4 t = texture2D(noiseTex, fc);

	float steps = 10.0 ;

	// quantize the uvs
	vec2 fuv = floor(vTexCoord * steps) / steps;

	// Create a gradient
	float l = 1.0-clamp(length(fuv * 2.0 - 1.0), 0.0, 1.0);

	// Step over it ot get star shapes
	l = step(vrand, l);

	// discard black pixels
	if(l == 0.0){
		discard;
	}

	// fade with distance and cut with our mask
	vec4 col = vec4(fract(t.r + t.g) ) * l;
	gl_FragColor = col;
	gl_FragColor.a = l;
}