precision highp float;

uniform sampler2D tex0;
uniform vec2 res;
uniform vec2 p;

varying vec2 uv;

// Calculates the error.
// Samples a texture at an offset, then gets a delta between the two noise textures
float error(float x, float y){
	vec2 tc = gl_FragCoord.xy / res;
	vec4 tex = texture2D(tex0, tc + vec2(x, y) * ( 1.0 / res));
	// The following line is just 
	return tex.y * (1.0 - tex.z) - tex.y * tex.z;
}

void main(){
	vec2 tc = gl_FragCoord.xy / res;
	vec4 tex = texture2D(tex0, tc);

	// kernel weights
	// You can play with these to change the look of the dither
	float k0 = 1.0 ;
	float k1 = 2.0 ;
	float k2 = 4.0 ;
	float k3 = 8.0 ;
	float k4 = 16.0 ;
	float k5 = 0.0;


	// Sum all the kernel weights
	float sz = (k0*2.0 + k1*2.0 + k2) * 2.0 + (k1*2.0 + k3*2.0 + k4) * 2.0 + (k2*2.0 + k4*2.0 );

	// Normalize the weights
	k0 /= sz;
	k1 /= sz;
	k2 /= sz;
	k3 /= sz;
	k4 /= sz;
	k5 /= sz;

	// Sum up the error for all the pixels in a 2x2 grid around each pixel
	float sum = tex.x + ( 
					   error(-2.0, -2.0) * k0
					  + error(-1.0, -2.0) * k1
					  + error(0.0, -2.0) * k2
					  + error(1.0, -2.0) * k1
					  + error(2.0, -2.0) * k0

					  + error(-2.0, -1.0) * k1
					  + error(-1.0, -1.0) * k3
					  + error(0.0, -1.0) * k4
					  + error(1.0, -1.0) * k3
					  + error(2.0, -1.0) * k1

					  + error(-2.0, 0.0) * k2
					  + error(-1.0, 0.0) * k4
					  + error(0.0, 0.0) * k5
					  + error(1.0, 0.0) * k4
					  + error(2.0, 0.0) * k2

					  + error(-2.0, 1.0) * k1
					  + error(-1.0, 1.0) * k3
					  + error(0.0, 1.0) * k4
					  + error(1.0, 1.0) * k3
					  + error(2.0, 1.0) * k1

					  + error(-2.0, 2.0) * k0
					  + error(-1.0, 2.0) * k1
					  + error(0.0, 2.0) * k2
					  + error(1.0, 2.0) * k1
					  + error(2.0, 2.0) * k0
	);


	vec4 color = vec4(0.0);

	// If the sum of the error is > .5, we invert it
	if(sum > 0.5){
		color = vec4(tex.x, 1.0-sum, 1.0, 1.0);
	} else {
		color = vec4(tex.x, sum, 0.0, 1.0);
	}

	vec2 pixelCoord = floor(gl_FragCoord.xy);

	int fx = int(gl_FragCoord.x);
	int fy = int(gl_FragCoord.y);

	if(( int(mod(pixelCoord.x, 2.0)) == int(p.x)) && ( int(mod(pixelCoord.y, 2.0)) == int(p.y))){
		gl_FragColor = color;
	} else {
		gl_FragColor = tex; 
	}



}