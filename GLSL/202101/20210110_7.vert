#version 140

attribute vec3 position;
uniform int frameCount;

out int t;		//�t���[���J�E���g

void main(void){
	t = frameCount;
	gl_Position = vec4(position,1.0);
}
