#pragma once
#include "start.h"

/*
** ‹–ì•ÏŠ·s—ñ‚ğ‹‚ß‚é
*/
void lookAt(float ex, float ey, float ez,
    float tx, float ty, float tz,
    float ux, float uy, float uz,
    GLfloat* matrix);

/*
** ‰æŠp‚©‚ç“§‹“Š‰e•ÏŠ·s—ñ‚ğ‹‚ß‚é
*/
void cameraMatrix(float fovy, float aspect, float nnear, float ffar,
    GLfloat* matrix);

/*
** s—ñ m0 ‚Æ m1 ‚ÌÏ‚ğ‹‚ß‚é
*/
void multiplyMatrix(const GLfloat* m0, const GLfloat* m1, GLfloat* matrix);