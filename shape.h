#pragma once
#include "start.h"

using Position = GLfloat[3];    //���_�f�[�^�i�v�f�̐����Fx,y,z�j
using Face = GLuint[3];         //���_�C���f�b�N�X�f�[�^�A���Ȃ킿�ʂ��`����f�[�^�i�v�f�̐����F�@�O�p�`�� 1�� �̒��_ , �O�p�`�� 2�� �̒��_ , �O�p�`�� 3�� �̒��_ �j

GLuint solidSphere(int slices, int stacks, const GLuint* buffer);
