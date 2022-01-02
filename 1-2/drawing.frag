precision highp float;

uniform sampler2D tex0;

uniform vec2 res;
uniform vec2 mouse;

void main(){
	vec2 tc = gl_FragCoord.xy / res;

	float t = texture2D(tex0, tc).r;
	t -= 0.005;
	t += step(length(tc - (mouse)), 0.05) ;

	gl_FragColor = vec4(t, t, t, 1.0);
}