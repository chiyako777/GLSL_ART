//�ȒP�ȉA�e�t��

#version 120

invariant gl_Position;
attribute vec3 position;
uniform mat4 projectionMatrix;
varying vec3 diffuseColor;

void main(void){
	//�V�F�[�f�B���O�Ώۂ��A���a1�̒P�ʋ��Ȃ̂ŁA���_���W�����̂܂܂��̓_�ɂ�����@���x�N�g���Ƃ��Ďg��
	//�����x�N�g�����f�t�H���g��(0,0,1)�Ƃ���ƁA�@���x�N�g���ƌ����x�N�g���̓��ς͒��_��z���W�ƈ�v����
	//���_��z���W�l���g�U���ːF(diffuseColor)�Ƃ��Đݒ肷�邱�ƂƂ���

	diffuseColor = vec3(position.z);		// [ position.z , position.z , position.z ]  
	gl_Position = projectionMatrix * vec4(position,1.0);
	

}
