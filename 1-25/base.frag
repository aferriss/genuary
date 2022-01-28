precision highp float;
varying vec3 vVertexColor;
varying vec2 vTexCoord;
varying float vId;
varying float rr;

uniform float time;


float rand(vec2 co){
	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main () {
	vec4 c = vec4(vVertexColor, 1.0);

	// just cranking contrast
	// c = smoothstep(0.0, 1.0, c);
	// c = smoothstep(0.0, 1.0, c);
	// c = smoothstep(0.0, 1.0, c);

	float y = fract(vTexCoord.y * 1.0 + time * 0.01 );
	float yy = fract(vTexCoord.y * 1.0 + time * 0.01 + vId );
	// y = step(0.5, y);

	// if(y == 0.0){
	// 	discard;
	// }

	// y *= step(0.5, fract(vTexCoord.y * 1000.0));
	// y *= yy;

	// gl_FragColor = vec4(y);
	gl_FragColor = 1.0-vec4(y *  (yy * 2.0 - 1.0));
	// gl_FragColor = 1.0-smoothstep(0.0, 1.0, gl_FragColor);

	// if(vId < 0.33){
	// 	gl_FragColor *= vec4(0.0, 1.0, 0.0, 1.0);
	// } else if(vId < 0.66) {
	// 	gl_FragColor *= vec4(0.0, 0.8, 0.4, 1.0);
	// } else {
	// 	gl_FragColor *= vec4(0.4, 0.8, 0.0, 1.0);
	// }
	// gl_FragColor = 1.0 - gl_FragColor;

	// } else if(vId < 0.66){
	// 	gl_FragColor *= vec4(1.0, 0.0, 0.0, 1.0);
	// } else {
	// 	gl_FragColor *= vec4(0.0, 0.0, 1.0, 1.0);
	// }
	// gl_FragColor += 0.2;


	
	gl_FragColor.a = 1.0;
}