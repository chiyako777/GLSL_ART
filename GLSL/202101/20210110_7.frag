//���̃I�[�u(�����`��)�A�����W �� ����@doxas����
#version 140

flat in int t;		//�t���[���J�E���g

void main(void){
	vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K�����ꂽ�l

	float destColor = 0.0;

	//�Ԃ̐�
	for(float a=-1; a<1; a+=0.5){
		//�I�[�u�̐� = �펞�U��
		for(float i=1.0; i<7.0 ;i++){
		
			//�I�[�u�̈ʒu�𓮂����x�N�g��
			vec2 q = p + vec2(cos(i) / 2 * abs(cos(t*0.001)) , sin(i) / 2 * abs(cos(t*0.001)));

			//���邳�����X�ɏ�悹����Ă����āA�ŏI�I�ɑS�����Z�������邳���h����
			//destColor += 0.07 * cos(t * 0.001) / length(q);
			destColor += 0.03 * cos(t * 0.001) / distance(q,vec2(a,a));

		}
	}

	gl_FragColor = vec4(destColor,0.0,1.0,1.0);
}
