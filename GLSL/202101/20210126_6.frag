//���ς��g�����O���f�[�V����
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

	vec2 v = vec2(0.0,1.0);

	//p�����ߑł����Ă݂āA�F�̕ω�������
	//vec2 p = vec2(0.1,1.0);		//�^����(y=1.0 �Ȃ�x�����ł����Ă��^����)�@��|p||v|cos�Ɓ�p.y = 1�̂Ƃ��Ap.x�̒l�ɂ�炸���ʂ�1��������
									//											 (�y���ؖ�)
									//											 cos�� = |p|/abs(p.x)
									//                                           |v| = 1 �Ȃ̂ŁA dot(p,v) = |p| * |p| / abs(p.x)
									//											 p.y = 1 �Ȃ̂ŁA|p|�͊m����1�ȏ�
									//											 ���W�� -1�`1 �͈̔͂Ȃ̂ŁA 0 < abs(p.x) < 1
									//											 1�ȏ�̐��l��0�`1�̐��l�ŏ��Z����̂�����A���ʂ͊m����1�ȏ�
									//											 ����āA p.y = 1�̂Ƃ��Ap.x�̒l�ɂ�炸�o�͐F�͐^�����ɂȂ�
									//											 �������Ƃ� 0 < y < 1�͈̔͂ł�������˂���āA�����_�����O���ʂ��������ɋψ�ȃO���f�[�V�����ƂȂ��Ă���


	float t = dot(p,v);			//p,v�̂Ȃ��p���s�p�F�F����@�݊p�Ft�����̒l�ɂȂ�̂Ő^����

	gl_FragColor = vec4(vec2(t),1.0,1.0);

}

