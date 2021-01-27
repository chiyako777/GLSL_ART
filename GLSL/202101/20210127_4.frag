#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

	float t = atan(p.x,p.y) + frameCount * 0.0001;		//�A�[�N�^���W�F���g��-�΁`�΂̒l���擾
	t = sin(t * 10.0);									//�A�[�N�^���W�F���g��萔�{���āAsin�ŏz������@�萔�̕��������ː��̖{����������
	
	gl_FragColor = vec4(vec3(t),1.0);

}
