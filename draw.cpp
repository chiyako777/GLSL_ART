#pragma once
#include "draw.h"
#include "shape.h"
#include "shader.h"

extern GLuint* buffer;

void drawSimpleSolidShere(int initFlg) {
	int slices = 32;
	int stacks = 16;
	
	if (initFlg == 0) {
		//** �`��f�[�^�쐬
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		solidSphere(slices, stacks, buffer);

		//** �V�F�[�_�[�ǂݍ���
		std::string vShaderFileName = R"#(simple.vert)#";
		std::string fShaderFileName = R"#(simple.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);
	}

	//** �V�F�[�_�[��attribute�ϐ��ɒ��_�f�[�^��n��
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//���_�C���f�b�N�X�f�[�^��L���������Ă���
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer[1]);

	//����`��
	glDrawElements(GL_TRIANGLES, slices * stacks * 2 * 3, GL_UNSIGNED_INT, 0);

	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
	glBindBuffer(GL_ARRAY_BUFFER, 0);

}