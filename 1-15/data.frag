precision highp float;

varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform sampler2D initTex;
uniform vec2 res;
uniform float time;
uniform vec2 mouse;
uniform vec2 windowRes;


float rand(vec2 co){
	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(){
	vec2 uv = gl_FragCoord.xy / res;

	vec4 d = texture2D(tex0, uv);

	vec2 pos = d.xy;
	vec2 vel = d.zw;

	vec2 dir = (mouse) - pos;
	vec2 dn = normalize(dir);

	vel += dn * 2.0;

    // damping
    vel *= 0.995;
    
    // move
    pos += vel ;

	gl_FragColor =  vec4(pos, vel);


	if(time < 1.0){
		float vx = rand(uv) * 2.0 - 1.0;
		float vy = rand(uv + 0.01) * 2.0 - 1.0;
		float px = rand(uv + 0.02) ;
		float py = rand(uv + 0.03) ;
		
		// gl_FragColor = vec4(vec2(floor(uv * 10.0 ) / 10.0), vec2(vx, vy) * 2.0 - 1.0);
		// gl_FragColor = vec4(uv * 2.0 - 1.0, vx, vy);
		// gl_FragColor.xy *= 100.0;
		gl_FragColor = vec4(vec2(px, py) * windowRes , vec2(vx, vy));
	}
}