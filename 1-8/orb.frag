precision highp float;

varying vec2 v_uv;

#define n 100 

uniform vec2 res;
uniform float time;

const int nParticles = n;
const float softness = 500.0;
const vec4 bgColor = vec4(0.0,0.0,0.0,1.0);

uniform float rands0[n];
uniform float rands1[n];
uniform float rands2[n];
uniform vec2 mouse;
uniform float sins[n];
uniform float coss[n];

float random (int i){
 return fract(sin(float(i)*43.0)*4790.234);   
}

float softEdge(float edge, float amt){
    return clamp(1.0 / (clamp(edge, 1.0/amt, 1.0)*amt), 0.,1.);
}

void main(){
    vec2 uv = gl_FragCoord.xy / res;
    vec2 tc = uv;
    float aspect = res.x / res.y;
    
    gl_FragColor = bgColor;
    
    vec2 coord = vec2(uv.x * aspect, uv.y);
    vec2 pos = vec2(aspect * 0.5, 0.5);
    vec2 dd = coord - pos;
    float np = float(nParticles);
    for(int i = 0; i< nParticles; i++){
        vec2 tc = uv;
        
        // float r = rands0[i];
        // float r2 = rands1[i];
        // float r3 = rands2[i];

		float pct = float(i) / np; 
		tc.x -= sins[i];
		tc.y -= coss[i];
 
        // tc.x -= sin(time*1.125 + (float(i)/float(nParticles))*mouse.x * 0.2)* 0.4;
        // tc.y -= cos(time*1.025 + (float(i)/float(nParticles))*mouse.y * 0.2)* 0.4;
		// tc.x -= (abs(fract(time*0.1 + pct + r + mouse.y * 0.2)*2.0 - 1.0) * 2.0 - 1.0) * 0.4;
		// tc.y -= (abs(fract(time*0.1+0.5 + pct + r2 + mouse.x * 0.2)*2.0 - 1.0) * 2.0 - 1.0) * 0.4;
                    
        vec2 cc = tc * 2.0 - 1.0;
        cc.x *= aspect;
        float l = dot(cc * 4.0, cc * 4.0);
		// l *= 0.5;
		// l *= l  ;
        
        vec4 orb = vec4(vec3(pct), softEdge(l, softness));
		orb *= 1.5;
		// orb *= 0.9;
        
        gl_FragColor = mix(gl_FragColor, orb, orb.a);
    }
	gl_FragColor.a = 1.0;
}