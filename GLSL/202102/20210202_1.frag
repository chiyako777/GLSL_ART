//�I�u�W�F�N�g�̕���
//(�����̎Q�l)https://wgld.org/d/glsl/g012.html

#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;

const float sphereSize = 1.0; // �`�悷�鋅�̔��a
const vec3 lightDir = vec3(-0.577, 0.577, 0.577);   //�����̊p�x

const float PI = 3.14159265;
const float angle = 60.0;       //����p(�㉺���E�Ƃ��ɁA�Ƃ����b���Ǝv��)
const float fov = angle * 0.5 * PI / 180.0;     //����p�̔��������W�A���P�ʂɊ��Z
vec3 cPos = vec3(0.0, 0.0, 3.0);      //�J�����̈ʒu

//p:���C�̐�[���W
vec3 trans(vec3 p){
    //return mod(p,4.0) - 2.0;      //mod���g�����Ƃɂ���āAp�̒��g�����ł����Ă�0~3.999�c�ɃN�����v�����B2���������ƂŁA-2�`1.9999�c�͈̔͂ɂȂ�
    return mod(p,6.0) - 3.0;
}

//�����֐� p:���C�̐�[���W
float distanceFunc(vec3 p){
    return length(trans(p)) - sphereSize;
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

    //���C���`
    vec3 ray = normalize(vec3( sin(fov) * p.x , sin(fov) * p.y , -cos(fov)));

    //�}�[�`���O���[�v
    float distance = 0.0;   //���C�ƃI�u�W�F�N�g�̍ŒZ����
    float rLen = 0.0;       //���C�Ɍp����������
    vec3 rPos = cPos;       //���C�̐�[�ʒu�i�f�t�H���g�̓J�����̈ʒu�j

    for(int i=0; i<64; i++){
        distance = distanceFunc(rPos);
        rLen += distance;
        rPos = cPos + ray * rLen;
    }

    //�Փ˔���(�Փ˂�����A���̎��_�ŋ����͐L�тȂ��Ȃ�Ƃ����l��)
    if(abs(distance) < 0.001){
        vec3 normal = getNormal(rPos);
        float diff = clamp(dot(lightDir,normal) , 0.1 , 1.0);
        gl_FragColor = vec4(vec3(diff), 1.0);
        //gl_FragColor = vec4(normal, 1.0);
    }
    else{
        gl_FragColor = vec4(vec3(0.0), 1.0);
    }

}
