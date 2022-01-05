precision highp float;

varying vec2 uv;

uniform vec2 res;
uniform sampler2D curTex;
uniform sampler2D lastTex;

void main(){
	vec2 fc = gl_FragCoord.xy / res;

	vec4 cur = texture2D(curTex, fc);
	vec4 last = texture2D(lastTex, fc);

	gl_FragColor = mix(last - 0.009, cur, cur.a);// + last * 0.9; 
	gl_FragColor.a = 1.0;

}