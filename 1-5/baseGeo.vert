attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelViewProjectionMatrix;
uniform mat4 uModelViewMatrix;

uniform vec2 res;

varying vec2 uv;

void main (){
    vec4 p = vec4(aPosition, 1.0);
    // p.xy = p.xy * 2.0;
    uv = aTexCoord;

    // float near = 0.01;
    // float far = 3000.0;
    // float fov = 60.0 / 180.0 * 3.141592;
    // float f = 1.0 / tan(fov / 2.0);
    // float aspect = res.x / res.y;

    // float nf = 1.0 / (near - far);
    // mat4 pm = mat4(f / aspect, 0.0, 0.0, 0.0, 0.0, f, 0.0, 0.0, 0.0, 0.0, (far + near) * nf, -1, 0.0, 0.0, 2.0 * far * near * nf, 0.0);
  
	gl_Position =uModelViewProjectionMatrix * p;
}
