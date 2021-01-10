#pragma once
#include "start.h"

/*
** ����ϊ��s������߂�
*/
void lookAt(float ex, float ey, float ez,
    float tx, float ty, float tz,
    float ux, float uy, float uz,
    GLfloat* matrix);

/*
** ��p���瓧�����e�ϊ��s������߂�
*/
void cameraMatrix(float fovy, float aspect, float nnear, float ffar,
    GLfloat* matrix);

/*
** �s�� m0 �� m1 �̐ς����߂�
*/
void multiplyMatrix(const GLfloat* m0, const GLfloat* m1, GLfloat* matrix);