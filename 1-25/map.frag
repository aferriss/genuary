precision highp float;

uniform vec2 res;
uniform float time;
uniform sampler2D tex0;

float colormap_red(float x) {
    return 1.61361058036781E+00 * x - 1.55391688559828E+02;
}

float colormap_green(float x) {
    return 9.99817607003891E-01 * x + 1.01544260700389E+00;
}

float colormap_blue(float x) {
    return 3.44167852062589E+00 * x - 6.19885917496444E+02;
}

vec4 colormap(float x) {
    float t = x * 255.0;
    float r = clamp(colormap_red(t) / 255.0, 0.0, 1.0);
    float g = clamp(colormap_green(t) / 255.0, 0.0, 1.0);
    float b = clamp(colormap_blue(t) / 255.0, 0.0, 1.0);
    return vec4(r, g, b, 1.0);
}

float getVal(vec2 uv){
    return length(texture2D(tex0,uv).xyz);
}
    
vec2 getGrad(vec2 uv,float delta){
    vec2 d=vec2(delta,0);
    return vec2(
        getVal(uv+d.xy)-getVal(uv-d.xy),
        getVal(uv+d.yx)-getVal(uv-d.yx)
    )/delta;
}

void main(){
    vec2 uv = gl_FragCoord.xy / res;
    
    vec3 n = vec3(getGrad(uv,1.0/res.y),350.0);
    n=normalize(n);
    vec3 light = normalize(vec3(0.25,0.75,2.25));
    float diff=clamp(dot(n,light),0.5,1.0);
    float spec=clamp(dot(reflect(light,n),vec3(0,0,-1)),0.0,1.0);
    spec=pow(spec,128.0)*1.0;
    
    // float osc = sin(time*0.25)*0.5 + 0.5;
    vec4 fb = texture2D(tex0, uv);
    fb = colormap(1.0-fb.r);
    // fb.rgb += vec3(0.05, 0.05,0.0);
    fb*=0.95;
	gl_FragColor = fb * diff + spec;
	gl_FragColor.a = 1.0;
}