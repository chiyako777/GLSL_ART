//���̃I�[�u(�����`��) �� @doxas����
#version 140

flat in int t;		//�t���[���J�E���g

void main(void){
	vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K�����ꂽ�l

	float destColor = 0.0;

	//�I�[�u�̐� = �펞�T��
	for(float i=1.0; i<6.0 ;i++){
		//sin,cos���W���Ɏg���āA�I�[�u�̈ʒu�𓮂����Bi�̒l���傫���I�[�u�قǓ������x������
		vec2 q = p + vec2(cos(t*i*0.0005),sin(t*i*0.0005));
		destColor += 0.1 / length(q);
	}

	gl_FragColor = vec4(destColor,0.0,1.0,1.0);
}
