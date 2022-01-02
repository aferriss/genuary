precision highp float;

varying vec2 uv;
uniform vec2 res;
uniform float useFragCoords;
uniform sampler2D tex0;

void main(){
	vec2 tc = uv;
	if(useFragCoords == 1.0){
		tc = gl_FragCoord.xy / res;
	}

	gl_FragColor = texture2D(tex0, tc);

}