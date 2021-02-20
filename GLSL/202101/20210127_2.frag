#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

	vec2 v = vec2(0.0,1.0);

	//float t = dot(p,v) / length(p-v);		//(1)���ς�length�ŏ��Z���邱�Ƃɂ���āA�����������Ȃ�قǈÂ�

	//float t = dot(p,v) / sin(length(p-v));	//(2)���Z�l��sin�ŏz������Blength�������ő�ł���3������sin0���`��100�� �����Â��ʐς�������

	//float t = dot(p,v) / sin(2 * length(p-v));	//(3)sin�̒��g��length*2�ɁBsin�l���}�C�i�X�ɂ��U���悤�ɂȂ�Bdot(p,v)���}�C�i�X�������ꍇ�A�ł������Đ��̐��ɂȂ邩��A��ʉ������ɂ������������ł���

	//float t = dot(p,v) / sin(3 * length(p-v));		//(4)sin�̏z�𑝂₷

	//float t = dot(p,v) / sin(7 * length(p-v));		//(5)sin�̏z�𑝂₷

	float t = dot(p,v) / sin(7 * length(p-v) + frameCount * 0.001);		//(6)�A�j���[�V������t����

	gl_FragColor = vec4(vec3(t),1.0);

}
