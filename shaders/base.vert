attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelViewProjectionMatrix;

varying vec2 v_uv;

void main (){
    vec4 p = vec4(aPosition, 1.0);
    v_uv = aTexCoord;
  
	gl_Position = uModelViewProjectionMatrix * p;
}
