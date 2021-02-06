#pragma once
#include "draw.h"
#include "shape.h"
#include "shader.h"
#include "matrix.h"

extern int width;
extern int height;

extern GLuint* buffer;
extern int frameCount;
extern GLfloat mouse[2];
extern GLfloat mousePixel[2];

//シンプルな球の描画
void drawSimpleSolidShere(int initFlg) {
	int slices = 32;
	int stacks = 16;
	
	if (initFlg == 0) {
		//** 描画データ作成
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		solidSphere(slices, stacks, buffer);

		//** シェーダー読み込み
		std::string vShaderFileName = R"#(GLSL/simple.vert)#";
		std::string fShaderFileName = R"#(GLSL/simple.frag)#";
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

//陰影の付いた球の描画
void drawShadeSolidShere(int initFlg) {
	int slices = 32;
	int stacks = 16;

	if (initFlg == 0) {
		//** 描画データ作成
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		solidSphere(slices, stacks, buffer);

		//** シェーダー読み込み
		std::string vShaderFileName = R"#(GLSL/simpleShade.vert)#";
		std::string fShaderFileName = R"#(GLSL/simpleShade.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);

		//** 投影行列作成 **
		GLfloat temp0[16], temp1[16];
		//ookAt(4.0f, 5.0f, 6.0f, 0.0f, 0.0f, 0.0f, 0.0f, 1.0f, 0.0f, temp0);
		//lookAt(4.0f, 5.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 1.0f, 0.0f, temp0);
		lookAt(0.0f, 0.0f, 11.0f, 0.0f, 0.0f, 0.0f, 0.0f, 1.0f, 0.0f, temp0);
		cameraMatrix(30.0f, 1.0f, 7.0f, 11.0f, temp1);
		multiplyMatrix(temp0, temp1, projectionMatrix);
	}

	//シェーダーのuniform 変数 projectionMatrix に行列を設定する
	int matrixLocation = glGetUniformLocation(programId, "projectionMatrix");
	glUniformMatrix4fv(matrixLocation, 1, GL_FALSE, projectionMatrix);

	//シェーダーのattribute変数に頂点データを渡す
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

//** 20210110
void draw20210110(int initFlg) {

	GLfloat vertex[] = {
		-0.9,-0.9,0,
		-0.9,0.9,0,
		0.9,0.9,0,
		0.9,-0.9,0
	};

	if (initFlg == 0) {
		//** 描画データ作成
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** シェーダー読み込み
		std::string vShaderFileName = R"#(GLSL/202101/20210110.vert)#";
		std::string fShaderFileName = R"#(GLSL/202101/20210110.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);

	}

	//** シェーダーのattribute変数に頂点データを渡す
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//フレームカウントをシェーダーに渡す
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
		//** 描画データ作成
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** シェーダー読み込み
		std::string vShaderFileName = R"#(GLSL/202101/20210110_2.vert)#";
		std::string fShaderFileName = R"#(GLSL/202101/20210110_2.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);

	}

	//** シェーダーのattribute変数に頂点データを渡す
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//フレームカウントをシェーダーに渡す
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
		//** 描画データ作成
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** シェーダー読み込み
		std::string vShaderFileName = R"#(GLSL/202101/20210110_3.vert)#";
		std::string fShaderFileName = R"#(GLSL/202101/20210110_3.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);

	}

	//** シェーダーのattribute変数に頂点データを渡す
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//フレームカウントをシェーダーに渡す
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
		//** 描画データ作成
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** シェーダー読み込み
		std::string vShaderFileName = R"#(GLSL/202101/20210110_4.vert)#";
		std::string fShaderFileName = R"#(GLSL/202101/20210110_4.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);

	}

	//** シェーダーのattribute変数に頂点データを渡す
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//フレームカウントをシェーダーに渡す
	int fcLocation = glGetUniformLocation(programId, "frameCount");
	glUniform1i(fcLocation, frameCount);

	glDrawArrays(GL_QUADS, 0, 4);

	glBindBuffer(GL_ARRAY_BUFFER, 0);

}

//** 20210110_5
void draw20210110_5(int initFlg) {

	GLfloat vertex[] = {
		-0.9,-0.9,0,
		-0.9,0.9,0,
		0.9,0.9,0,
		0.9,-0.9,0
	};

	if (initFlg == 0) {
		//** 描画データ作成
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** シェーダー読み込み
		std::string vShaderFileName = R"#(GLSL/202101/20210110_5.vert)#";
		std::string fShaderFileName = R"#(GLSL/202101/20210110_5.frag)#";
		programId = createShader(vShaderFileName, fShaderFileName);

	}

	//** シェーダーのattribute変数に頂点データを渡す
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//フレームカウントをシェーダーに渡す
	int fcLocation = glGetUniformLocation(programId, "frameCount");
	glUniform1i(fcLocation, frameCount);

	glDrawArrays(GL_QUADS, 0, 4);

	glBindBuffer(GL_ARRAY_BUFFER, 0);

}

//** 20210110_6,7,20210113
void draw20210110_6(int initFlg) {

	GLfloat vertex[] = {
		-0.9,-0.9,0,
		-0.9,0.9,0,
		0.9,0.9,0,
		0.9,-0.9,0
	};

	if (initFlg == 0) {
		//** 描画データ作成
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** シェーダー読み込み
		//std::string vShaderFileName = R"#(GLSL/202101/20210110_6.vert)#";
		//std::string fShaderFileName = R"#(GLSL/202101/20210110_6.frag)#";

		//std::string vShaderFileName = R"#(GLSL/202101/20210110_7.vert)#";
		//std::string fShaderFileName = R"#(GLSL/202101/20210110_7.frag)#";

		std::string vShaderFileName = R"#(GLSL/202101/20210113.vert)#";
		std::string fShaderFileName = R"#(GLSL/202101/20210113.frag)#";

		programId = createShader(vShaderFileName, fShaderFileName);

	}

	//** シェーダーのattribute変数に頂点データを渡す
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//フレームカウントをシェーダーに渡す
	int fcLocation = glGetUniformLocation(programId, "frameCount");
	glUniform1i(fcLocation, frameCount);

	glDrawArrays(GL_QUADS, 0, 4);

	glBindBuffer(GL_ARRAY_BUFFER, 0);

}

//このサイトで学び始め
//https://wgld.org/d/glsl/g001.html
void draw20210126(int initFlg) {
	GLfloat vertex[] = {
		-1.0,-1.0,0,
		-1.0,1.0,0,
		1.0,1.0,0,
		1.0,-1.0,0
	};

	if (initFlg == 0) {

		//** 描画データ作成
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** シェーダー読み込み
		std::string vShaderFileName = R"#(GLSL/202102/20210205_1.vert)#";
		std::string fShaderFileName = R"#(GLSL/bullet/Wheel.frag)#";
		
		programId = createShader(vShaderFileName, fShaderFileName);

	}

	//** シェーダーのattribute変数に頂点データを渡す
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//画面サイズをシェーダーに渡す
	int resolLocation = glGetUniformLocation(programId, "resolution");
	GLfloat resolution[] = { width,height };
	glUniform2fv(resolLocation, 1, resolution);

	//フレームカウントをシェーダーに渡す
	int fcLocation = glGetUniformLocation(programId, "frameCount");
	glUniform1i(fcLocation, frameCount);

	//マウス座標をシェーダーに渡す
	int msLocation = glGetUniformLocation(programId, "mouse");
	//mouse[0] = 1; mouse[1] = 1;		//マウス座標をいったん決め打つ
	glUniform2fv(msLocation, 1, mouse);


	glDrawArrays(GL_QUADS, 0, 4);

	glBindBuffer(GL_ARRAY_BUFFER, 0);

	//std::cout << "frameCount = " << frameCount * 7.0 * 0.003 << "\n";

}

//弾幕ネタ色々作る
//このサイトで学び始め
void drawBullet(int initFlg) {
	GLfloat vertex[] = {
		-1.0,-1.0,0,
		-1.0,1.0,0,
		1.0,1.0,0,
		1.0,-1.0,0
	};

	if (initFlg == 0) {

		//** 描画データ作成
		buffer = new GLuint[2];
		glGenBuffers(2, buffer);
		glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
		glBufferData(GL_ARRAY_BUFFER, 12 * sizeof(float), vertex, GL_STATIC_DRAW);
		glBindBuffer(GL_ARRAY_BUFFER, 0);

		//** シェーダー読み込み
		std::string vShaderFileName = R"#(GLSL/202102/20210205_1.vert)#";
		std::string fShaderFileName = R"#(GLSL/bullet/test2.frag)#";

		programId = createShader(vShaderFileName, fShaderFileName);

	}	

	//** シェーダーのattribute変数に頂点データを渡す
	glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);
	int posLocation = glGetAttribLocation(programId, "position");
	glEnableVertexAttribArray(posLocation);
	glVertexAttribPointer(posLocation, 3, GL_FLOAT, false, 0, NULL);

	//画面サイズをシェーダーに渡す
	int resolLocation = glGetUniformLocation(programId, "resolution");
	GLfloat resolution[] = { width,height };
	glUniform2fv(resolLocation, 1, resolution);

	//フレームカウントをシェーダーに渡す
	int fcLocation = glGetUniformLocation(programId, "frameCount");
	glUniform1i(fcLocation, frameCount);

	//乱数をシェーダーに渡す
	int randLocation = glGetUniformLocation(programId, "rand");
	int r = std::rand();
	glUniform1i(randLocation, r);
	//std::cout << r << "\n";

	//マウス座標(pixel)をシェーダーに渡す
	int msLocation = glGetUniformLocation(programId, "mouse");
	glUniform2fv(msLocation, 1, mousePixel);


	glDrawArrays(GL_QUADS, 0, 4);

	glBindBuffer(GL_ARRAY_BUFFER, 0);


	//当たり処理
	GLfloat hitcol[4];
	glReadPixels(mousePixel[0], mousePixel[1], 1,1, GL_RGBA, GL_FLOAT, hitcol);
	if(hitcol[3] == 0.0 ){ std::cout << "hit!" << "\n"; }	

	//std::cout << "frameCount = " << frameCount * 7.0 * 0.003 << "\n";

}