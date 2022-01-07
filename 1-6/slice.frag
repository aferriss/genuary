precision highp float;

uniform vec2 res;
uniform sampler2D preTex;
uniform sampler2D lastTex;
uniform float time;
uniform vec4 random;
uniform float sliceAmount;

vec2 rotate(float deg, vec2 anchorPoint, vec2 uv) {
	float pi = 3.14159265359;
	float angle = deg * (pi/180.0);
	vec2 pix = (uv - anchorPoint) * res;
	vec2 q;
	q.x =   cos(angle)*pix.x + sin(angle)*pix.y;
	q.y = - sin(angle)*pix.x + cos(angle)*pix.y;
	return q / res + anchorPoint;
}

float rand(vec2 co){
	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(){

	vec2 fc = gl_FragCoord.xy / res;
	vec2 tc = fc;
	// tc = tc * 2.0 - 1.0;
	// tc *= 0.995;
	// tc = tc * 0.5 + 0.5;

	vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
	
	vec4 r = random;
	// r.xy = floor(r.xy * 3.0) / 3.0;

	if(random.z == 0.0){
		color.g = step(r.x, tc.x);
	} else if(random.z == 1.0){
		color.r = step(r.y, tc.y);
	}

	if(random.w == 0.0){
		color.rgb *= -1.0;
	}

	gl_FragColor = texture2D(lastTex, fract(tc + vec2(color.rg) * sliceAmount) ) ;
// gl_FragColor = vec4(color.g + color.r);
	gl_FragColor.a = 1.0;

	

	if(time < 1.0){
		gl_FragColor = texture2D(preTex, fc);
	}
}

