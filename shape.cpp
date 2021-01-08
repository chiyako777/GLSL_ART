#pragma once
#include "shape.h"

GLuint solidSphere(int slices, int stacks, const GLuint* buffer) {


    Position* position;
    Face* face;

    GLuint vertices = (slices + 1) * (stacks + 1);  //���_��
    GLuint faces = slices * stacks * 2;     //�O�p�`�̐�(=���̖̂ʂ̐�)

    //VBO���o�C���h
    glBindBuffer(GL_ARRAY_BUFFER, buffer[0]);               //�uGL_ARRAY_BUFFER(���_�f�[�^)�v��VBO�C���f�b�N�X��buffer[0]
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer[1]);       //�uGL_ELEMENT_ARRAY_BUFFER(���_�C���f�b�N�X�f�[�^)�v��VBO�C���f�b�N�X��buffer[1]

    //VBO�̃f�[�^�̈���m��(�f�[�^�̒��g�͂܂�NULL�Ȃ̂Ŋm�ۂ��Ă��邾��)
    glBufferData(GL_ARRAY_BUFFER, sizeof(Position) * vertices, NULL, GL_STATIC_DRAW);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(Face) * faces, NULL, GL_STATIC_DRAW);

    //VBO�̃��������v���O�����̃������Ƀ}�b�v����(VBO�������ɂ���f�[�^�ɑ���������邱�Ƃ��\�ɂȂ���)
    position = (Position*)glMapBuffer(GL_ARRAY_BUFFER, GL_WRITE_ONLY);
    face = (Face*)glMapBuffer(GL_ELEMENT_ARRAY_BUFFER, GL_WRITE_ONLY);

    //** �f�[�^�쐬 **
    /* ���_�̈ʒu */
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

    /* �ʂ̎w�W */
    for (int j = 0; j < stacks; ++j) {
        for (int i = 0; i < slices; ++i) {
            int count = (slices + 1) * j + i;

            /* �㔼�� */
            (*face)[0] = count;
            (*face)[1] = count + 1;
            (*face)[2] = count + slices + 2;
            ++face;

            /* ������ */
            (*face)[0] = count;
            (*face)[1] = count + slices + 2;
            (*face)[2] = count + slices + 1;
            ++face;
        }
    }

    //�v���O�����̃��������e��VBO�̃������ɏ������݁A�}�b�s���O��؂藣��
    glUnmapBuffer(GL_ELEMENT_ARRAY_BUFFER);
    glUnmapBuffer(GL_ARRAY_BUFFER);

    //VBO���������
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
    glBindBuffer(GL_ARRAY_BUFFER, 0);

    return faces * 3;
}
