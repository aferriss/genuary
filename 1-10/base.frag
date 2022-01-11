precision highp float;
varying vec3 vVertexColor;
varying vec2 vTexCoord;
varying float vId;

uniform float time;


void main () {
	// vec4 c = vec4(vVertexColor, 1.0);

	// // just cranking contrast
	// c = smoothstep(0.0, 1.0, c);
	// c = smoothstep(0.0, 1.0, c);
	// c = smoothstep(0.0, 1.0, c);
	if(fract(time * 0.001) < vId){
		// discard;
	}

	gl_FragColor = vec4(abs(vTexCoord.x * 2.0 - 1.0));
	// gl_FragColor.rgb /= 5.0;
	// gl_FragColor.a = 1.0;
}