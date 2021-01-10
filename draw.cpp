#pragma once
#include "draw.h"
#include "shape.h"
#include "shader.h"
#include "matrix.h"

extern GLuint* buffer;
extern int frameCount;

//�V���v���ȋ��̕`��
void drawSimpleSolidShere(int initFlg) {
	int slices = 32;
	int stacks = 16;
	
	if (initFlg == 0) {
		//** �`��f�[�^�쐬
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		solidSphere(slices, stacks, buffer);

		//** �V�F�[�_�[�ǂݍ���
		std::string vShaderFileName = R"#(GLSL/simple.vert)#";
		std::string fShaderFileName = R"#(GLSL/simple.frag)#";
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

//�A�e�̕t�������̕`��
void drawShadeSolidShere(int initFlg) {
	int slices = 32;
	int stacks = 16;

	if (initFlg == 0) {
		//** �`��f�[�^�쐬
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		solidSphere(slices, stacks, buffer);

		//** �V�F�[�_�[�ǂݍ���
		std::string vShaderFileName = R"#(GLSL/simpleShade.vert)#";
		std::string fShaderFileName = R"#(GLSL/simpleShade.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);

		//** ���e�s��쐬 **
		GLfloat temp0[16], temp1[16];
		//ookAt(4.0f, 5.0f, 6.0f, 0.0f, 0.0f, 0.0f, 0.0f, 1.0f, 0.0f, temp0);
		//lookAt(4.0f, 5.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 1.0f, 0.0f, temp0);
		lookAt(0.0f, 0.0f, 11.0f, 0.0f, 0.0f, 0.0f, 0.0f, 1.0f, 0.0f, temp0);
		cameraMatrix(30.0f, 1.0f, 7.0f, 11.0f, temp1);
		multiplyMatrix(temp0, temp1, projectionMatrix);
	}

	//�V�F�[�_�[��uniform �ϐ� projectionMatrix �ɍs���ݒ肷��
	int matrixLocation = glGetUniformLocation(programId, "projectionMatrix");
	glUniformMatrix4fv(matrixLocation, 1, GL_FALSE, projectionMatrix);

	//�V�F�[�_�[��attribute�ϐ��ɒ��_�f�[�^��n��
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

//** 20210110
void draw20210110(int initFlg) {

	GLfloat vertex[] = {
		-0.9,-0.9,0,
		-0.9,0.9,0,
		0.9,0.9,0,
		0.9,-0.9,0
	};

	if (initFlg == 0) {
		//** �`��f�[�^�쐬
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** �V�F�[�_�[�ǂݍ���
		std::string vShaderFileName = R"#(GLSL/20210110.vert)#";
		std::string fShaderFileName = R"#(GLSL/20210110.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);

	}

	//** �V�F�[�_�[��attribute�ϐ��ɒ��_�f�[�^��n��
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//�t���[���J�E���g���V�F�[�_�[�ɓn��
	int fcLocation = glGetUniformLocation(programId, "frameCount");
	glUniform1i(fcLocation, frameCount);

	glDrawArrays(GL_QUADS, 0, 4);

	glBindBuffer(GL_ARRAY_BUFFER, 0);

}

//** 20210110_2
void draw20210110_2(int initFlg) {

	GLfloat vertex[] = {
		-0.9,-0.9,0,
		-0.9,0.9,0,
		0.9,0.9,0,
		0.9,-0.9,0
	};

	if (initFlg == 0) {
		//** �`��f�[�^�쐬
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** �V�F�[�_�[�ǂݍ���
		std::string vShaderFileName = R"#(GLSL/20210110_2.vert)#";
		std::string fShaderFileName = R"#(GLSL/20210110_2.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);

	}

	//** �V�F�[�_�[��attribute�ϐ��ɒ��_�f�[�^��n��
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//�t���[���J�E���g���V�F�[�_�[�ɓn��
	int fcLocation = glGetUniformLocation(programId, "frameCount");
	glUniform1i(fcLocation, frameCount);

	glDrawArrays(GL_QUADS, 0, 4);

	glBindBuffer(GL_ARRAY_BUFFER, 0);

}

//** 20210110_3
void draw20210110_3(int initFlg) {

	GLfloat vertex[] = {
		-0.9,-0.9,0,
		-0.9,0.9,0,
		0.9,0.9,0,
		0.9,-0.9,0
	};

	if (initFlg == 0) {
		//** �`��f�[�^�쐬
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** �V�F�[�_�[�ǂݍ���
		std::string vShaderFileName = R"#(GLSL/20210110_3.vert)#";
		std::string fShaderFileName = R"#(GLSL/20210110_3.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);

	}

	//** �V�F�[�_�[��attribute�ϐ��ɒ��_�f�[�^��n��
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//�t���[���J�E���g���V�F�[�_�[�ɓn��
	int fcLocation = glGetUniformLocation(programId, "frameCount");
	glUniform1i(fcLocation, frameCount);

	glDrawArrays(GL_QUADS, 0, 4);

	glBindBuffer(GL_ARRAY_BUFFER, 0);

}

//** 20210110_4
void draw20210110_4(int initFlg) {

	GLfloat vertex[] = {
		-0.9,-0.9,0,
		-0.9,0.9,0,
		0.9,0.9,0,
		0.9,-0.9,0
	};

	if (initFlg == 0) {
		//** �`��f�[�^�쐬
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** �V�F�[�_�[�ǂݍ���
		std::string vShaderFileName = R"#(GLSL/20210110_4.vert)#";
		std::string fShaderFileName = R"#(GLSL/20210110_4.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);

	}

	//** �V�F�[�_�[��attribute�ϐ��ɒ��_�f�[�^��n��
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//�t���[���J�E���g���V�F�[�_�[�ɓn��
	int fcLocation = glGetUniformLocation(programId, "frameCount");
	glUniform1i(fcLocation, frameCount);

	glDrawArrays(GL_QUADS, 0, 4);

	glBindBuffer(GL_ARRAY_BUFFER, 0);

}