#pragma once
#include "matrix.h"

/*
** �s�� m0 �� m1 �̐ς����߂�
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
** ����ϊ��s������߂�(gluLookAt�Ɠ���)
*  ex,ey,ez�F�J�����̈ʒu���W(���_)
*  tx,ty,tz�F�J�����������(�����_)
*  ux,uy,uz�F�J�����̏�����x�N�g����x,y,z���x�N�g���Ƃ̓���(0�������A1�����s)
*/
void lookAt(float ex, float ey, float ez,
    float tx, float ty, float tz,
    float ux, float uy, float uz,
    GLfloat* matrix)
{
    float l;

    /* z �� = e - t */
    tx = ex - tx;
    ty = ey - ty;
    tz = ez - tz;
    l = sqrtf(tx * tx + ty * ty + tz * tz);
    matrix[2] = tx / l;
    matrix[6] = ty / l;
    matrix[10] = tz / l;

    /* x �� = u x z �� */
    tx = uy * matrix[10] - uz * matrix[6];
    ty = uz * matrix[2] - ux * matrix[10];
    tz = ux * matrix[6] - uy * matrix[2];
    l = sqrtf(tx * tx + ty * ty + tz * tz);
    matrix[0] = tx / l;
    matrix[4] = ty / l;
    matrix[8] = tz / l;

    /* y �� = z �� x x �� */
    matrix[1] = matrix[6] * matrix[8] - matrix[10] * matrix[4];
    matrix[5] = matrix[10] * matrix[0] - matrix[2] * matrix[8];
    matrix[9] = matrix[2] * matrix[4] - matrix[6] * matrix[0];

    /* ���s�ړ� */
    matrix[12] = -(ex * matrix[0] + ey * matrix[4] + ez * matrix[8]);
    matrix[13] = -(ex * matrix[1] + ey * matrix[5] + ez * matrix[9]);
    matrix[14] = -(ex * matrix[2] + ey * matrix[6] + ez * matrix[10]);

    /* �c�� */
    matrix[3] = matrix[7] = matrix[11] = 0.0f;
    matrix[15] = 1.0f;
}

/*
** ��p���瓧�����e�ϊ��s������߂�(gluPerspective�Ɠ���)
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
