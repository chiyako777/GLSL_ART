#pragma once

#include "start.h"

int readShader(GLuint shaderId, std::string fileName);

GLuint createShader(std::string vShaderFileName, std::string fShaderFileName);