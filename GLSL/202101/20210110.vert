#version 140

attribute vec3 position;
uniform int frameCount;
varying float x;
out int t;		//�t���[���J�E���g

void main(void){
	x = position.x;
	t = frameCount;
	gl_Position = vec4(position,1.0);
}
