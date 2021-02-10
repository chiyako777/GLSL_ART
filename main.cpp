//*******************
//****MAIN****
//*******************
#pragma once
#include "start.h"
#include "draw.h"

int width = 400;
int height = 400;
GLuint* buffer;
int frameCount = 0;
GLfloat mouse[2];
GLfloat mousePixel[2];

//�}�E�X�J�[�\�������������̃R�[���o�b�N
void cursor_event(GLFWwindow* window, double xpos, double ypos) {
    
    //pixel���W��0�`1�ɐ��K��
    mouse[0] = (float)xpos/ (float)width;
    mouse[1] = (float)ypos/ (float)height;

    //�}�E�X�s�N�Z�����W�i���̂ɂ���Ă͂��������V�F�[�_�[�ɓn���j
    mousePixel[0] = xpos;
    mousePixel[1] = abs(ypos - (float)height);       //�V�F�[�_�[����gl_FragCoord���������_�Ȃ̂ŁA���킹��

    //std::cout << "xpos = " << xpos << "ypos = " << ypos;
    //std::cout << "xpos = " << mouse[0] << " ypos = " << mouse[1] << "\n";
}

int main() {

    // GLFW�̏�����
    if (!glfwInit()) {
        return -1;
    }

    // �v������OpenGL �o�[�W�����w�� (�Ⴂ�o�[�W�������w�肷��̂����S)  �����̃v���O�����͌���3.2�ȏ�ɂ���Ɛ}�`���`�悳��Ȃ�
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
    // ��ʌ݊������������邩 (��FALSE�ɂ��Ă���)
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_FALSE);
    //// �v���t�@�C���ݒ�
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_ANY_PROFILE);
    //glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    // ���T�C�Y�s��
    //glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);

    // �E�B���h�E�̍쐬
    GLFWwindow* window =
        glfwCreateWindow(width, height, "Seiran", nullptr, nullptr);
    if (window == nullptr) {
        std::cerr << "Can't create GLFW window." << std::endl;
        glfwTerminate();
        return false;
    }
    glfwMakeContextCurrent(window);

    // VSync��҂�
    glfwSwapInterval(1);

    //GLEW�̏�����
    GLenum err = glewInit();
    if (err != GLEW_OK) {
        return -1;
    }

    int initFlg = 0;

    mouse[0] = 0.0;
    mouse[1] = 0.0;
    glfwSetCursorPosCallback(window, cursor_event);

    // ���C�����[�v
    while (glfwWindowShouldClose(window) == GL_FALSE) {

        //�o�b�N�o�b�t�@���N���A
        glClearColor(0.2f, 0.2f, 0.2f, 0.0f);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        glClearDepth(1.0);

        //�A�ʏ�����L���ɂ���
        glEnable(GL_DEPTH_TEST);

        //�`��
        drawBullet(initFlg);

        //�A�ʏ����𖳌��ɂ���
        glDisable(GL_DEPTH_TEST);

        //�o�b�N�o�b�t�@�ƃt�����g�o�b�t�@�̓���ւ�
        glfwSwapBuffers(window);
        glfwPollEvents();

        if (initFlg == 0) {
            initFlg = 1;
        }

        frameCount += 1;

    }

    glfwTerminate();
}