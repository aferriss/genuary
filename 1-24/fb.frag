precision highp float;

uniform vec2 res;
uniform float time;
uniform sampler2D tex0;
uniform sampler2D tex1;

varying vec2 vTexCoord;

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
    vec2 tc = uv;

    tc = tc * 2.0 - 1.0;
    tc *= 0.999;
    tc = tc * 0.5 + 0.5;

    vec4 t = texture2D(tex0, tc);
    t = texture2D(tex0, fract(tc + (t.rg*2.0-1.0) * 0.0035));

    t += 0.003;
    t = fract(t);
    
    //t += texture(iChannel1, uv * 0.5) * 0.005;
    
    gl_FragColor = t;
    // gl_FragColor = vec4(uv, 0.0, 1.0);

    gl_FragColor.a = 1.0;
    
    if(time < 1.0 ){
      gl_FragColor.r = texture2D(tex1, uv  *0.5).r;
      gl_FragColor.g = texture2D(tex1, uv  *0.501).r;
      gl_FragColor.b = texture2D(tex1, uv  *0.505).r;
      gl_FragColor.a = 1.0;
    }
}