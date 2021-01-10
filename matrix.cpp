#pragma once
#include "matrix.h"

/*
** 行列 m0 と m1 の積を求める
*/
void multiplyMatrix(const GLfloat* m0, const GLfloat* m1, GLfloat* matrix)
{
    for (int i = 0; i < 16; ++i) {
        int j = i & ~3, k = i & 3;

        matrix[i] = m0[j + 0] * m1[0 + k]
            + m0[j + 1] * m1[4 + k]
            + m0[j + 2] * m1[8 + k]
            + m0[j + 3] * m1[12 + k];
    }
}

/*
** 視野変換行列を求める(gluLookAtと同じ)
*  ex,ey,ez：カメラの位置座標(視点)
*  tx,ty,tz：カメラが見る先(注視点)
*  ux,uy,uz：カメラの上方向ベクトルとx,y,z軸ベクトルとの内積(0→垂直、1→平行)
*/
void lookAt(float ex, float ey, float ez,
    float tx, float ty, float tz,
    float ux, float uy, float uz,
    GLfloat* matrix)
{
    float l;

    /* z 軸 = e - t */
    tx = ex - tx;
    ty = ey - ty;
    tz = ez - tz;
    l = sqrtf(tx * tx + ty * ty + tz * tz);
    matrix[2] = tx / l;
    matrix[6] = ty / l;
    matrix[10] = tz / l;

    /* x 軸 = u x z 軸 */
    tx = uy * matrix[10] - uz * matrix[6];
    ty = uz * matrix[2] - ux * matrix[10];
    tz = ux * matrix[6] - uy * matrix[2];
    l = sqrtf(tx * tx + ty * ty + tz * tz);
    matrix[0] = tx / l;
    matrix[4] = ty / l;
    matrix[8] = tz / l;

    /* y 軸 = z 軸 x x 軸 */
    matrix[1] = matrix[6] * matrix[8] - matrix[10] * matrix[4];
    matrix[5] = matrix[10] * matrix[0] - matrix[2] * matrix[8];
    matrix[9] = matrix[2] * matrix[4] - matrix[6] * matrix[0];

    /* 平行移動 */
    matrix[12] = -(ex * matrix[0] + ey * matrix[4] + ez * matrix[8]);
    matrix[13] = -(ex * matrix[1] + ey * matrix[5] + ez * matrix[9]);
    matrix[14] = -(ex * matrix[2] + ey * matrix[6] + ez * matrix[10]);

    /* 残り */
    matrix[3] = matrix[7] = matrix[11] = 0.0f;
    matrix[15] = 1.0f;
}

/*
** 画角から透視投影変換行列を求める(gluPerspectiveと同じ)
*/
void cameraMatrix(float fovy, float aspect, float nnear, float ffar,
    GLfloat* matrix)
{
    float f = 1.0f / tanf(fovy * 0.5f * 3.141593f / 180.0f);
    float dz = ffar - nnear;

    matrix[0] = f / aspect;
    matrix[5] = f;
    matrix[10] = -(ffar + nnear) / dz;
    matrix[11] = -1.0f;
    matrix[14] = -2.0f * ffar * nnear / dz;
    matrix[1] = matrix[2] = matrix[3] = matrix[4] =
        matrix[6] = matrix[7] = matrix[8] = matrix[9] =
        matrix[12] = matrix[13] = matrix[15] = 0.0f;
}
