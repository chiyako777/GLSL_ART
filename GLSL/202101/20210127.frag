//���ς��g�����O���f�[�V�����ł�����ƗV��
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//�}�E�X���W(0�`1)��-1�`1�͈̔͂ɒ����i����ŏ��j

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

	float color1;
	float color2;
	for(float i=-1; i<1; i+=0.1){
		vec2 v = vec2(sin(frameCount * 0.001),cos(frameCount * 0.001));
		color1 += dot(p,v) * 0.25;
	}

	for(float i=1; i>-1; i-=0.1){
		vec2 v = vec2(sin(frameCount * 0.001),cos(frameCount * 0.001));
		color2 += dot(p,v) * 0.25;
	}


	gl_FragColor = vec4(color1 * color2 * 0.3,color1 * color2 * 0.75,0.75,1.0);

}
