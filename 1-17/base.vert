attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelViewProjectionMatrix;

varying vec2 vTexCoord;

uniform float time;
uniform vec2 res;


void main (){

    vTexCoord = aTexCoord;

	gl_Position = uModelViewProjectionMatrix * vec4(aPosition, 1.0);
}