//*******************
//****MAIN****
//*******************
#pragma once
#include "start.h"
#include "draw.h"

const int width = 800;
const int height = 800;
GLuint* buffer;
int frameCount = 0;

int main() {

    // GLFWの初期化
    if (!glfwInit()) {
        return -1;
    }

    // 要求するOpenGL バージョン指定 (低いバージョンを指定するのが安全)  ※このプログラムは現状3.2以上にすると図形が描画されない
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
    // 上位互換性を持たせるか (※FALSEにしておく)
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_FALSE);
    //// プロファイル設定
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_ANY_PROFILE);
    //glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    // リサイズ不可
    //glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);

    // ウィンドウの作成
    GLFWwindow* window =
        glfwCreateWindow(width, height, "Seiran", nullptr, nullptr);
    if (window == nullptr) {
        std::cerr << "Can't create GLFW window." << std::endl;
        glfwTerminate();
        return false;
    }
    glfwMakeContextCurrent(window);

    // VSyncを待つ
    glfwSwapInterval(1);

    //GLEWの初期化
    GLenum err = glewInit();
    if (err != GLEW_OK) {
        return -1;
    }

    int initFlg = 0;

    // メインループ
    while (glfwWindowShouldClose(window) == GL_FALSE) {

        //バックバッファをクリア
        glClearColor(0.2f, 0.2f, 0.2f, 0.0f);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        glClearDepth(1.0);

        //陰面消去を有効にする
        glEnable(GL_DEPTH_TEST);

        //描画
        draw20210110_5(initFlg);

        //陰面消去を無効にする
        glDisable(GL_DEPTH_TEST);

        //バックバッファとフロントバッファの入れ替え
        glfwSwapBuffers(window);
        glfwPollEvents();

        if (initFlg == 0) {
            initFlg = 1;
        }

        frameCount += 1;

    }

    glfwTerminate();
}