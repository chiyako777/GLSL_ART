#pragma once
#include "start.h"

using Position = GLfloat[3];    //頂点データ（要素の説明：x,y,z）
using Face = GLuint[3];         //頂点インデックスデータ、すなわち面を定義するデータ（要素の説明：　三角形の 1つ目 の頂点 , 三角形の 2つ目 の頂点 , 三角形の 3つ目 の頂点 ）

GLuint solidSphere(int slices, int stacks, const GLuint* buffer);
