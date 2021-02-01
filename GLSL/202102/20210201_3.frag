//���C�}�[�`���O�ŉA�e�̂��鋅�̂�`��
//(�����̎Q�l)https://wgld.org/d/glsl/g009.html

#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;

const float sphereSize = 1.0; // �`�悷�鋅�̔��a
const vec3 lightDir = vec3(-0.577, 0.577, 0.577);   //�����̊p�x

//�����֐� p:���C�̐�[���W
float distanceFunc(vec3 p){
    return length(p) - sphereSize;
}

//�@���Z�o�֐� p:���C�ƃI�u�W�F�N�g�̌�_�̍��W�ʒu                //�Ȃ�����Ŗ@�������܂�̂��E�E�E�H
vec3 getNormal(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        distanceFunc(p + vec3(  d, 0.0, 0.0)) - distanceFunc(p + vec3( -d, 0.0, 0.0)),
        distanceFunc(p + vec3(0.0,   d, 0.0)) - distanceFunc(p + vec3(0.0,  -d, 0.0)),
        distanceFunc(p + vec3(0.0, 0.0,   d)) - distanceFunc(p + vec3(0.0, 0.0,  -d))
        ));
}

void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    vec3 cPos = vec3(0.0, 0.0, 3.0);      //�J�����̈ʒu
    vec3 cDir = vec3(0.0, 0.0, -1.0);     //�J�����̎���
    vec3 cUp = vec3(0.0, 1.0, 0.0);       //�J�����̏����
    vec3 cSide = cross(cDir,cUp);         //�O�ς��g���ăJ�����̉��������Z�o  (������1,0,0����)
    float targetDepth = 1.0;              //�t�H�[�J�X����[�x

    //���C���`
    vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);     //�J���������� * x + �J��������� * y + �J������������ * z �ŁA�u�e�s�N�Z���ʒu�֌��������C�v����`�ł���

    //�}�[�`���O���[�v
    float distance = 0.0;   //���C�ƃI�u�W�F�N�g�̍ŒZ����
    float rLen = 0.0;       //���C�Ɍp����������
    vec3 rPos = cPos;       //���C�̐�[�ʒu�i�f�t�H���g�̓J�����̈ʒu�j

    for(int i=0; i<16; i++){
        distance = distanceFunc(rPos);
        rLen += distance;
        rPos = cPos + ray * rLen;
    }

    //�Փ˔���(�Փ˂�����A���̎��_�ŋ����͐L�тȂ��Ȃ�Ƃ����l��)
    if(abs(distance) < 0.001){
        vec3 normal = getNormal(rPos);
        float diff = clamp(dot(lightDir,normal) , 0.1 , 1.0);
        gl_FragColor = vec4(vec3(diff), 1.0);
    }
    else{
        gl_FragColor = vec4(vec3(0.0), 1.0);
    }

}

