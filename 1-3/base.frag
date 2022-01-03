precision highp float;
varying vec3 vVertexColor;
varying vec2 vTexCoord;
varying float vId;

varying float vrz;
varying float vrand;
uniform float time;


void main () {
	

	float steps = 10.0 ;

	// quantize the uvs
	vec2 fuv = floor(vTexCoord * steps) / steps;

	// Create a gradient
	float l = 1.0-clamp(length(fuv *2.0 - 1.0), 0.0, 1.0);

	// Step over it ot get star shapes
	l = step(vrand, l);

	// discard black pixels
	if(l == 0.0){
		discard;
	}

	// fade with distance and cut with our mask
	gl_FragColor = vec4(vrz / 2000.0) * l;
	// gl_FragColor.rgb *= 1.5;
	gl_FragColor.a = l;
}