attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelViewProjectionMatrix;

varying vec2 uv;

void main (){
    vec4 p = vec4(aPosition, 1.0);
    p.xy = p.xy * 2.0;
    uv = aTexCoord;
  
	gl_Position = p;
}
