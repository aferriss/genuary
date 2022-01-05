precision highp float;

uniform vec2 res;
uniform float time;

const int noiseSwirlSteps = 1;
const float noiseSwirlValue = 0.15;
const float noiseSwirlStepValue = noiseSwirlValue / float(noiseSwirlSteps);

const float noiseScale = 1.50;
const float noiseTimeScale = 0.05;


float simplex(vec3 v);
float getNoise(vec3 v);


void main(){
	vec2 uv = gl_FragCoord.xy / res;
    
	// float noise1 = getNoise(vec3( uv * noiseScale, time * noiseTimeScale));
    // float noise2 = getNoise(vec3( uv * noiseScale, time * noiseTimeScale+123.0));
    // float noise3 = getNoise(vec3( uv * noiseScale, time * noiseTimeScale-54.0));
    
    // float n1 = smoothstep(0.6, 0.62, noise1);
    // float n2 = smoothstep(0.6, 0.62, noise2);
    // float n3 = smoothstep(0.6, 0.62, noise3);
    
    // vec3 noise = mix(vec3(0.0), vec3(1.0,0.0,0.0), n1);
    // noise = mix(noise, vec3(0.0,1.0,0.0), n2);
    // noise = mix(noise, vec3(0.949,0.407,0.011), n3);
   
    // vec4 t = texture(iChannel0, uv);
    // t.rgb = mix(t.rgb, noise, clamp(n1 + n2 +n3, 0.0, 1.0));
    
    float nx = 0.0;
	float ny = 0.0;
	float nz = 0.0;
    const int ITERATIONS = 3;
    float SPEED = 0.1;
    float DISPLACEMENT = 0.025;
    float YSCALE = 1.0;
   
	for (int i=1; i<ITERATIONS; i++){
		float ii = pow(float(i), 2.0);
		float ifrac = float(i)/float(ITERATIONS);
		float t = ifrac * time * SPEED;
		float d = (1.0-ifrac) * DISPLACEMENT;
		nx += simplex( vec3(uv.x*ii-1.0*ifrac, uv.y*YSCALE*ii-t, time * SPEED )) ;//* d * 2.0;
		ny += simplex( vec3(10.0 + uv.x*ii-1.0*ifrac, 34.1 + uv.y*YSCALE*ii-t, time *SPEED)) ;//* d * 2.0;
		nz += simplex( vec3(20.0 + uv.x*ii-1.0*ifrac, 34.1 + uv.y*YSCALE*ii-t, time *SPEED)) ;//* d * 2.0;
    }

	nx = abs(nx);
	ny = abs(ny);
	nz = abs(nz);
	// float noise = getNoise(vec3(uv * noiseScale, time * noiseTimeScale));
    // noise = noise * noise * noise * noise * 2.0;  //more contrast
    // gl_FragColor = vec4(noise, noise, noise, 1.0);
    
    // vec4 tex = texture(iChannel0, uv + nx);
	//float flame = shape( vec2(uv.x+nx, uv.y) );
    //noise = pow(noise*1.5, 5.0);
    //noise = floor(noise * 3.0) / 3.0;
    //noise = noise * noise * noise * noise * 2.0;  //more contrast
    gl_FragColor = vec4(nx,ny,nz, 1.0);//vec4(n1 + n2 + n3);//vec4(vec3(noise), 1.0);
	gl_FragColor.a = 1.0;
}


float fbm3(vec3 v) {
    float result = simplex(v);
    //result += simplex(v * 2.) / 2.;
    //result += simplex(v * 4.) / 4.;
    //result /= (1. + 1./2. + 1./4.);
    return result;
}

float fbm5(vec3 v) {
    float result = simplex(v);
    result += simplex(v * 2.) / 2.;
    result += simplex(v * 4.) / 4.;
    result += simplex(v * 8.) / 8.;
    result += simplex(v * 16.) / 16.;
    result /= (1. + 1./2. + 1./4. + 1./8. + 1./16.);
    return result;
}

float getNoise(vec3 v) {
    //  make it curl
    for (int i=0; i<noiseSwirlSteps; i++) {
    	v.xy += vec2(fbm3(v), fbm3(vec3(v.xy, v.z + 1000.))) * noiseSwirlStepValue;
    }
    //  normalize
    return fbm5(v) / 2. + 0.5;
}

//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float simplex(vec3 v)
  {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
  }