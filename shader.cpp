#include "shader.h"

//�V�F�[�_�[�̓ǂݍ���
int readShader(GLuint shaderId, std::string fileName) {

    //�t�@�C���̓ǂݍ���
    std::ifstream ifs(fileName);
    if (!ifs) {
        printf("file read failed");
        return -1;
    }

    std::string source;
    std::string line;
    while (std::getline(ifs, line)) {
        source += line + "\n";
    }

    //�V�F�[�_�[�\�[�X���V�F�[�_�[�I�u�W�F�N�g�ɓǂݍ���
    const GLchar* sourcePtr = (const GLchar*)source.c_str();
    GLint length = source.length();
    glShaderSource(shaderId, 1, &sourcePtr, &length);

    return 0;
}

//�V�F�[�_�[�I�u�W�F�N�g�쐬
GLuint createShader(std::string vShaderFileName, std::string fShaderFileName) {

    //** ���_�V�F�[�_�[�̃R���p�C��
    GLuint vShaderId = glCreateShader(GL_VERTEX_SHADER);

    //std::string vShaderFileName = R"#(simple3.vert)#";
    if (readShader(vShaderId, vShaderFileName) != 0) {
        printf("vertex shader read failed");
    }

    glCompileShader(vShaderId);
    GLint vCompiled, vLogLength;
    glGetShaderiv(vShaderId, GL_COMPILE_STATUS, &vCompiled);
    if (vCompiled == GL_FALSE) {
        printf("vertex shader compile failed.");
    }
    glGetShaderiv(vShaderId, GL_INFO_LOG_LENGTH, &vLogLength);
    if (vLogLength != 0) {
        printf("vertex shader compile log exist");
        GLchar* info;
        info = new GLchar[vLogLength];
        glGetShaderInfoLog(vShaderId, vLogLength, &vLogLength, info);
        printf(info);
    }

    //** �t���O�����g�V�F�[�_�[�̃R���p�C��
    GLuint fShaderId = glCreateShader(GL_FRAGMENT_SHADER);

    //std::string fShaderFileName = R"#(simple3.frag)#";
    if (readShader(fShaderId, fShaderFileName) != 0) {
        printf("fragment shader read failed");
    }

    glCompileShader(fShaderId);
    //�R���p�C�����ʂ̊m�F
    GLint fCompiled, fLogLength;
    glGetShaderiv(fShaderId, GL_COMPILE_STATUS, &fCompiled);
    if (fCompiled == GL_FALSE) {
        printf("fragment shader compile failed.");
    }
    glGetShaderiv(fShaderId, GL_INFO_LOG_LENGTH, &fLogLength);
    if (fLogLength != 0) {
        printf("fragment shader compile log exist");
        GLchar* info;
        info = new GLchar[fLogLength];
        glGetShaderInfoLog(fShaderId, fLogLength, &fLogLength, info);
        printf(info);
    }

    //** �v���O�����I�u�W�F�N�g�̍쐬
    GLuint programId = glCreateProgram();
    glAttachShader(programId, vShaderId);
    glAttachShader(programId, fShaderId);

    //** �����N
    glLinkProgram(programId);
    glUseProgram(programId);

    return programId;
}
