precision highp float;

varying vec2 uv;

void main(){
	vec2 m = mod(gl_FragCoord.xy, 4.0);

	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
	// gl_FragColor *= vec4(m.x * m.y);
	gl_FragColor.a = 1.0;

}