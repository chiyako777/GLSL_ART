#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

	float color = 1.1 - length(m-p);	//�}�E�X�ʒu�ɋ߂��قǖ��邭�Ȃ�B1.1���猸�Z���Ă���̂ŋ�����0.1�ȉ��̏ꍇ�͖��邳�ő�B
	 
	color = pow(color,11);	//�R���g���X�g���������邽�߂ɗݏ悷��B
							//�w���̒l�ɂ���āA�u�����������Ȃ�΂Ȃ�قǈÂ��v�Ȃ�����A�u���ȏ�̋����ɂȂ�Ƃ܂����邭�v�Ȃ����肷��
							//�ˎw���֐��̌`�𒲂ׂĂ݂悤

	gl_FragColor = vec4(vec3(color),1.0);

}
