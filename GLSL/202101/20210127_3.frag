#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

	vec2 v = vec2(0.0,1.0);
	
	//float t = dot(p,v) / (length(p) * length(v));			//(1) dot(p,v) = |p||v|cos�Ɓ@�Ȃ̂� dot(p,v) / (length(p) * length(v)) = cos��
															//����Ė��邳�́Av�Ƃ̂Ȃ��p��0�ɋ߂��قǖ��邭�Ȃ�A�Ȃ��p���傫���Ȃ�قǈÂ��Ȃ�

	float t =abs(dot(p,v)) / (length(p) * length(v));		//(2) ���ς̐�Βl���Ƃ��ă}�C�i�X�ɐU��Ȃ��悤�ɂ��邱�ƂŁA�������ɂ��O���f�[�V�������`�悳�ꂽ

	gl_FragColor = vec4(vec3(t),1.0);

}
