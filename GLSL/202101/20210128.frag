//�Ԃ�`��
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	//vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

	vec2 m = vec2(0,0);

	//float color = 0.01 / abs(0.8 * sin(atan(p.x,p.y) * 10) - length(m-p));			
							//(1) ����l���狗�������Z������Βl�ŁA���Z�B���̋����ɋ߂Â��قǁA���Z���ʂ�����Ȃ��傫���Ȃ��Ă����B�i=�����Ȃ�j
							//    length�����Z����Ώۂ̐��l�ɁA�A�[�N�^���W�F���g�̒萔�{��sin���|����
							//    �������邱�ƂŁA�u�����v�̒������Z�������ő������A�Ԃ̌`�̖͗l�ɂȂ�

	//float color = 0.01 / abs(0.8 * sin(atan(p.x,p.y) * 10) * sin(frameCount * 0.0005) - length(m-p));			
							//(2) (1)����Alength�����Z����Ώۂ̐��l�Ƀt���[���J�E���g��sin���|���āA�Ԃ̑傫�����ω�����悤�ɂ���

	float color = 0.01 / abs(0.8 * sin(atan(p.x,p.y) * 10) - length(m-p) * sin(atan(p.x,p.y) * 10));
							//(3) (2)�E(4)�̍��킹�|��
							//    �܂���(4)�̃����_�����O���ʂ��^�񒆂ɃM���b�Ƌl�܂銴���ɂȂ��āA�ׂ����ː���ɂȂ�
							//    �܂��A�����ƌ��Z�l�Ɋ|�����킹��W�������������烊���O�������c��
	
	//float color = 0.01 / abs(0.8  - length(m-p) * sin(atan(p.x,p.y) * 10));
							//(4) ���Z����length���ɁA�A�[�N�^���W�F���g�萔�{��sin���|����B������0.8�߂��̂ɖ��邭�Ȃ�Ȃ��Ƃ����A������0.8��艓���̂ɃA�[�N�^���W�F���g�萔�{sin�̒l�����܂��n�}���Č��ʓI�ɖ��邭�Ȃ�Ƃ���Ƃ��������


	gl_FragColor = vec4(vec3(color),1.0);

}
