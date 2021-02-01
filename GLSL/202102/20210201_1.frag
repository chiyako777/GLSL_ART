//���C�}�[�`���O
//(�����̎Q�l)https://wgld.org/d/glsl/g008.html

#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;

void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    vec3 cPos = vec3(0.0, 0.0, 3.0);      //�J�����̈ʒu
    vec3 cDir = vec3(0.0, 0.0, -1.0);     //�J�����̎���
    vec3 cUp = vec3(0.0, 1.0, 0.0);       //�J�����̏����
    vec3 cSide = cross(cDir,cUp);       //�O�ς��g���ăJ�����̉��������Z�o  (������1,0,0����)
    float targetDepth = 0.1;            //�t�H�[�J�X����[�x

    //���C���`
    vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);     //�J���������� * x + �J��������� * y + �J������������ * z �ŁA�u�e�s�N�Z���ʒu�֌��������C�v����`�ł���

    gl_FragColor = vec4(ray.xy, -ray.z,1.0);
}

