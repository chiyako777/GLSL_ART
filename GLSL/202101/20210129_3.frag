//fan
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	//vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

	vec2 m = vec2(0,0);

	//float color = 0.01 / abs(0.8  +  (sin(atan(p.x,p.y)*10)*0.02)  -  length(m-p));

	float a = atan(p.x,p.y) - length(p) * 0.5;
	float u = abs( sin(a * 10) );		//length ���猸�Z����l�ɁA�A�[�N�^���W�F���g����length(p)�����������l��sin���g��
										//length(p)���������Ƃɂ���ċN������ʁF�{���Ȃ疾�邢�����Â��Ȃ�
																				 �{���Ȃ�Â��������邭�Ȃ�
																				 ����ɁA���̃Y����������ɂ���ĕς�邱�ƂŁA�Ԃт炪�Ȃ���
																				 �܂�������ƃC���[�W�N���ĂȂ����ǁE�E�E
	float color = 0.01 / abs(u-length(p));

	gl_FragColor = vec4(vec3(color),1.0);

}
