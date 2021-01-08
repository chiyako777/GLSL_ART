#pragma once
#include "draw.h"
#include "shape.h"
#include "shader.h"

extern GLuint* buffer;

void drawSimpleSolidShere(int initFlg) {
	int slices = 32;
	int stacks = 16;
	
	if (initFlg == 0) {
		//** 描画データ作成
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		solidSphere(slices, stacks, buffer);

		//** シェーダー読み込み
		std::string vShaderFileName = R"#(simple.vert)#";
		std::string fShaderFileName = R"#(simple.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);
	}

	//** シェーダーのattribute変数に頂点データを渡す
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//頂点インデックスデータを有効化させておく
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer[1]);

	//球を描画
	glDrawElements(GL_TRIANGLES, slices * stacks * 2 * 3, GL_UNSIGNED_INT, 0);

	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
	glBindBuffer(GL_ARRAY_BUFFER, 0);

}