//���̃����O
#version 140

flat in int t;		//�t���[���J�E���g

void main(void){
	vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K�����ꂽ�l

	//���̋����𒲐�
	float l = 1 - abs(0.7 - length(p))*5;

	gl_FragColor = vec4(l,0.0,1.0,1.0);		//�J���t���ɂ��Ă݂�
}
