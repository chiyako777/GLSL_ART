#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K��

	vec2 color = (vec2(1.0)+p.xy) * 0.5;	//���K���������W���A�J���[��0�`1�͈̔͂ɒ���

	gl_FragColor = vec4(color,1.0,1.0);
	
}
