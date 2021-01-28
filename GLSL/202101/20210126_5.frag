#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

	//float color = 1 - abs(0.5 - length(m-p)) * 13;		//(1)�}�E�X�̃s�N�Z��������0.5�ɋ߂Â��قǖ��邭�Ȃ�B�萔����Z���āA�R���g���X�g�����������Ă���

	float color = 0.01 / abs(0.8 * sin(frameCount * 0.001) - length(m-p));			
							//(2) ����l���狗�������Z������Βl�ŁA���Z�B���̋����ɋ߂Â��قǁA���Z���ʂ�����Ȃ��傫���Ȃ��Ă����B(1)���������O����������o��
							//    length�����Z����Ώۂ̐��l��sin�|�����āA�����O�̑傫�����ω�����悤��

	gl_FragColor = vec4(vec3(color),1.0);

}
