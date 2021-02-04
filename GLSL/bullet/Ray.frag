//���C�}�[�`���O���g��������
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
uniform int rand;

const float PI = 3.14159265;

const vec3 lightDir = vec3(-0.577, 0.577, 0.577);   //�����̊p�x
const float angle = 60.0;               //�^�e�̎���p
const float aspect = 1.5;               //�^�e�ɑ΂��郈�R�̎���p
const float yfov = angle * 0.5 * PI / 180.0;              //�^�e�̎���p�̔��������W�A���P�ʂɊ��Z
const float xfov = angle * aspect * 0.5 * PI / 180.0;     //���R�̎���p�̔��������W�A���P�ʂɊ��Z
vec3 cPos = vec3(0.0, 0.0, 10.0);      //�J�����̈ʒu


//���̋����֐� p:���C�̐�[���W
float distanceFunc(vec3 p , float sphereSize){
    return length(p) - sphereSize;
}


void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    //���C���`
    vec3 ray = normalize( vec3(
                            sin(xfov) * p.x , sin(yfov) * p.y , -cos(yfov)
                         ));

    //�}�[�`���O���[�v
    float distance = 0.0;   //���C�ƃI�u�W�F�N�g�̍ŒZ����
    float rLen = 0.0;       //���C�Ɍp����������
    vec3 rPos = cPos;      //���C�̐�[�ʒu

    for(int i=0; i<256; i++){
        distance = distanceFunc(rPos,2.0);
        rLen += distance;
        rPos = cPos + ray * rLen;
    }

    //�Փ˔���
    if(distance < 0.001){
        gl_FragColor = vec4(vec3(1.0), 1.0);
    }else{
        gl_FragColor = vec4(vec3(0.0), 1.0);
    }


}