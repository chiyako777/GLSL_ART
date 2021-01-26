#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	//vec2 m = vec2(mouse.x * 2.0 - 1.0,mouse.y * 2.0 - 1.0);		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 m = vec2(0,0);		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

	//float t = sin(0.001 * frameCount);
	float harfpi = 3.141592 / 2;
	//float t = sin( distance(m,p) / sqrt(8) * harfpi);	//(1) m,p�Ԃ̋������Z���قǈÂ��Bt�̒l��0�`1���z����@�idistance�̍ő�l����8�Ȃ̂ŁA���Z���Đ��K���j
	float t = sin( distance(m,p) / sqrt(8) * harfpi * frameCount * 0.01);	//(2) (1)�̏�Ԃ�frameCount���|���ăA�j���[�V������

	gl_FragColor = vec4(1.0,t,0.7,1.0);
	
}