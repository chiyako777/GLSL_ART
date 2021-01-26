#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

	float a = 10.0;		//�ւ̎����𐧌�B�l���傫���ق�sin�̒l�̏z���������Ȃ�˗ւ̎������Z���Ȃ�
	float b = 7.0;		//�A�j���[�V�����̑����𐧌�  �l���傫���قǉ��Z���鐔�l�̌X�����傫���Ȃ��sin�̒l�̏z���������Ȃ�˃A�j���[�V�����������Ȃ�

						//���uframeCount�͂ǂ�ǂ񑝂���̂ɂȂ��A�j���[�V�����̑��������Ȃ́H�v�Ƃ����̂����o�I�Ƀs���Ɨ��ɂ����̂ŕ⑫
						//  �u frameCount * b * 0.003 �v�̕����́AframeCount�̑����ɔ�����ʂ������Ă����i�����I�ȑ������j
						//�@�u��ʓI�ɑ����Ă����l�v�����Z���Ă����̂ŁA�l�������瑝���čs���Ă��A�j���[�V�����̑��x�͂����ƕς��Ȃ�
						
	float t = sin(length(m - p) * a + frameCount * b *0.003);
	
	gl_FragColor = vec4(vec3(t),1.0);

}
