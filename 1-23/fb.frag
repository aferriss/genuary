precision highp float;

uniform vec2 res;
uniform float time;
uniform sampler2D tex0;

float diff(vec2 t, vec2 b){
 	vec3 t1 = texture2D(tex0, t).xyz;
    vec3 t2 = texture2D(tex0, b).xyz;
    return dot(t1, vec3(1.0)) - dot(t2, vec3(1.0));
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(){
    vec2 uv = gl_FragCoord.xy / res;
    uv.y*= 0.997;
	uv = -1.0 + 2.0*uv;
    uv.x *= 1.002;
    uv = uv*0.5 + 0.5;
    
    vec2 step = vec2(1.0 / res) * 1.1;
    
    /*
    vec2 topL = uv - step;
    vec2 topR = uv + vec2(step.x, -step.y);
    vec2 bottomL = uv + vec2(-step.x, step.y);
    vec2 bottomR = uv + step;
    */
    
    vec2 top = uv + vec2(0.0,-step.y);
    vec2 bottom = uv + vec2(0.0,step.y);
    vec2 left = uv + vec2(-step.x, 0.0);
    vec2 right = uv + vec2(step.x, 0.0);
    
    float gradient1 = diff(left, right) ;
    float gradient2 = diff(top, bottom) ;
    
    vec4 fc = vec4( ((length(gradient1)*length(gradient2))*1.0));
    
    if(time < 0.1){
        gl_FragColor = vec4(rand(uv));
        gl_FragColor.a = 1.0;
    } else {
        vec4 old = texture2D(tex0, uv);
        fc.rgba = (fc.rgba * fc.a) + (old*(1.0 - fc.a));
        fc+= 0.005;
    	// gl_FragColor = clamp(fc, vec4(0.0), vec4(1.0));
        gl_FragColor = fc;//
        gl_FragColor.a = 1.0;
    }
}