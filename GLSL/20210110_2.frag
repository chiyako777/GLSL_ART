//���̃I�[�u
#version 140

flat in int t;		//�t���[���J�E���g

void main(void){
	vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K�����ꂽ�l

	//���̋����𒲐�
	//float l = 0.1 / length(p);		// ���_��p �̋�����0.1�ȉ��̎��͌��̗ʂ��ő�B p��������傫���Ȃ�ƁA���񂾂�Â��Ȃ�
	float l = 0.1 * abs(sin(t*0.001)) / length(p);	//�W���� 0.1 �� abs(sin(t)) ��0�`1 ����Z���āA�I�[�u�̑傫����ω�������
	
	//gl_FragColor = vec4(vec3(l),1.0);
	gl_FragColor = vec4(l,0.0,1.0,1.0);		//�J���t���ɂ��Ă݂�
}
