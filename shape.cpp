#pragma once
#include "shape.h"

GLuint solidSphere(int slices, int stacks, const GLuint* buffer) {


    Position* position;
    Face* face;

    GLuint vertices = (slices + 1) * (stacks + 1);  //頂点数
    GLuint faces = slices * stacks * 2;     //三角形の数(=球体の面の数)

    //VBOをバインド
    glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);               //「GL_ARRAY_BUFFER(頂点データ)」のVBOインデックス→buffer[0]
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer[1]);       //「GL_ELEMENT_ARRAY_BUFFER(頂点インデックスデータ)」のVBOインデックス→buffer[1]

    //VBOのデータ領域を確保(データの中身はまだNULLなので確保しているだけ)
    glBufferData(GL_ARRAY_BUFFER, sizeof(Position) * vertices, NULL, GL_STATIC_DRAW);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(Face) * faces, NULL, GL_STATIC_DRAW);

    //VBOのメモリをプログラムのメモリにマップする(VBOメモリにあるデータに操作を加えることが可能になった)
    position = (Position*)glMapBuffer(GL_ARRAY_BUFFER, GL_WRITE_ONLY);
    face = (Face*)glMapBuffer(GL_ELEMENT_ARRAY_BUFFER, GL_WRITE_ONLY);

    //** データ作成 **
    /* 頂点の位置 */
    for (int j = 0; j <= stacks; ++j) {

        float ph = 3.141593f * (float)j / (float)stacks;
        float y = cosf(ph);
        float r = sinf(ph);

        for (int i = 0; i <= slices; ++i) {
            float th = 2.0f * 3.141593f * (float)i / (float)slices;
            float x = r * cosf(th);
            float z = r * sinf(th);

            (*position)[0] = x;
            (*position)[1] = y;
            (*position)[2] = z;
            ++position;
        }
    }

    /* 面の指標 */
    for (int j = 0; j < stacks; ++j) {
        for (int i = 0; i < slices; ++i) {
            int count = (slices + 1) * j + i;

            /* 上半分 */
            (*face)[0] = count;
            (*face)[1] = count + 1;
            (*face)[2] = count + slices + 2;
            ++face;

            /* 下半分 */
            (*face)[0] = count;
            (*face)[1] = count + slices + 2;
            (*face)[2] = count + slices + 1;
            ++face;
        }
    }

    //プログラムのメモリ内容をVBOのメモリに書き込み、マッピングを切り離し
    glUnmapBuffer(GL_ELEMENT_ARRAY_BUFFER);
    glUnmapBuffer(GL_ARRAY_BUFFER);

    //VBOを解放する
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
    glBindBuffer(GL_ARRAY_BUFFER, 0);

    return faces * 3;
}
