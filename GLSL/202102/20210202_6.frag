//�I�u�W�F�N�g�Ԃ��Ԃ��ăX���[�Y��
//(�����̎Q�l)https://wgld.org/d/glsl/g013.html

#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;

const float sphereSize = 1.0; // �`�悷�鋅�̔��a
const vec3 lightDir = vec3(-0.577, 0.577, 0.577);   //�����̊p�x(���ォ��Ƃ炷)
//const vec3 lightDir = vec3(0.0, 0.0, 1.0);   //�����̊p�x(���ʂ���Ƃ炷)

const float PI = 3.14159265;
const float angle = 60.0;       //����p(�㉺���E�Ƃ��ɁA�Ƃ����b���Ǝv��)
const float fov = angle * 0.5 * PI / 180.0;     //����p�̔��������W�A���P�ʂɊ��Z
vec3 cPos = vec3(0.0, 0.0, 3.0);      //�J�����̈ʒu

//�I�u�W�F�N�g�̕��� p:���C�̐�[���W
vec3 trans(vec3 p){
    //return mod(p,4.0) - 2.0;      //mod���g�����Ƃɂ���āAp�̒��g�����ł����Ă�0~3.999�c�ɃN�����v�����B2���������ƂŁA-2�`1.9999�c�͈̔͂ɂȂ�
    return mod(p,6.0) - 3.0;
}

//��Ԋ֐�
float smoothMin(float d1, float d2, float k){
    float h = exp(-k * d1) + exp(-k * d2);
    return -log(h) / k;
}


//���̋����֐� p:���C�̐�[���W
float shere_distanceFunc(vec3 p){
    return length(trans(p)) - sphereSize;
}

//�{�b�N�X�̋����֐�  p:���C�̐�[���W
float box_distanceFunc(vec3 p){
    vec3 q = abs(trans(p));
    return length( max(q - vec3(1.0,0.2,1.0) , 0.0 ));
}

//�p�ۃ{�b�N�X�̋����֐�  p:���C�̐�[���W
float roundbox_distanceFunc(vec3 p){
    vec3 q = abs(p);
    return length( max(q - vec3(1.0,0.2,1.0) , 0.0 )) - 0.1;    //0.1���Z�ɂ���āA�z���g�̓{�b�N�X�̊p�ɓ������ĂȂ����C���A�������Ă锻�肳���B���ʂƂ��Ċp�����ă{�b�N�X���c���
}

//�g�[���X�i�h�[�i�c�^�j�̋����֐� p:���C�̐�[���W
// (xy���ʂɓW�J)
float torus_distanceFunc(vec3 p){
    vec2 t = vec2(0.75 , 0.25);         //( x:�g�[���X�̒��S����ǂꂭ�炢�̋�����u���ăp�C�v����邩�˃h�[�i�c�̌��̔��a , y:�g�[���X�̃p�C�v�̔��a�˃h�[�i�c�{�̂̒f�ʐ}�̔��a)
    vec2 r = vec2(length(p.xy) - t.x , p.z);    // r = ���C�̐�[����A�g�[���X�̃p�C�v�̒��S�ւ̋���
    return length(r) - t.y;
}

//���̋����֐� p:���C�̐�[���W
float floor_distanceFunc(vec3 p){
    return dot( p , vec3(0.0 , 1.0, 0.0) ) + 1.0;       //vec3(0,1,0)�͖ʖ@���B�Ⴆ�΂��ꂾ�ƁA���όv�Z�̌���p.y�̃f�[�^�������c��B+1.0�́A���̈ʒu�������I�t�Z�b�g�ip.y = -1�̂Ƃ��Փ˂Ɣ��肳���j
}

//�����̃I�u�W�F�N�g�𕁒ʂ̌������H�ŕ`�悷�邽�߂̋����֐�(�a�W���̌���)
float distFunc_Union(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    return min(d1,d2);
}

//�����̃I�u�W�F�N�g�𕁒ʂ̌������H�ŕ`�悷�邽�߂̋����֐�(�a�W���̌���) + �X���[�Y��
float distFunc_Union_Smooth(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    return smoothMin(d1, d2, 8.0);
}

//�����̃I�u�W�F�N�g�̏d�Ȃ荇������������`�悷�邽�߂̋����֐�(�ϏW���̌���)
float distFunc_Intersection(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    return max(d1,d2);
}

//�����̃I�u�W�F�N�g�̂����Ad1�݂̂�`��i�d�Ȃ��Ă镔���͕`�悵�Ȃ��j
float distFunc_Either1(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    //return min(d1,d2) - max(d1,d2);
    //return max(d1,d2) - min(d1,d2);
    if(d1 <= d2){
        return d1;
    }else{
        return 0.5;
    }
}

//�����̃I�u�W�F�N�g�̂����Ad2�݂̂�`��i�d�Ȃ��Ă镔���͕`�悵�Ȃ��j
float distFunc_Either2(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    //return min(d1,d2) - max(d1,d2);
    //return max(d1,d2) - min(d1,d2);
    if(d2 <= d1){
        return d2;
    }else{
        return 0.5;
    }
}

//�����̃I�u�W�F�N�g�̂����A�ǂ������݂̂�`��i�d�Ȃ��Ă镔���͕`�悵�Ȃ��j
float distFunc_Either(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    //return max(-d1, d2); // d1���d�Ȃ��Ă��Ȃ�d2������`��(���d2�����Ԃ�Ȃ�)
    return max(d1, -d2); // d2���d�Ȃ��Ă��Ȃ�d1������`��(���d1�����Ԃ�Ȃ�)
}

//�悭�킩��񂯂ǁA�|�p�I�Ȋ����ɂȂ��
float distFunc_Omake(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    //return min(d1,d2) - max(d1,d2);
    return max(d1,d2) - min(d1,d2);
}

//�@���Z�o�֐� p:���C�ƃI�u�W�F�N�g�̌�_�̍��W�ʒu  
vec3 getNormal(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        distFunc_Union_Smooth(p + vec3(  d, 0.0, 0.0)) - distFunc_Union_Smooth(p + vec3( -d, 0.0, 0.0)),
        distFunc_Union_Smooth(p + vec3(0.0,   d, 0.0)) - distFunc_Union_Smooth(p + vec3(0.0,  -d, 0.0)),
        distFunc_Union_Smooth(p + vec3(0.0, 0.0,   d)) - distFunc_Union_Smooth(p + vec3(0.0, 0.0,  -d))
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

    for(int i=0; i<256; i++){
        distance = distFunc_Union_Smooth(rPos);
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

//�u�h�[�i�c�̌��ڂ��͑��݂��󔒂��H�v�ƁA
//���ꂩ�������Ă��B���������t�B
//�ڂ��̕����錊���A�Ӗ��̂��鑶�݂�������A
//�ǂ�Ȃɂ������낤�B�~�����B


//���̊Ԃɂ��n�ʂɉf����
//�e���L�тĉ���Ȃ��Ȃ���
//�ԉ��F�̋��؍҂�
//���肪���Ă��܂�Ȃ��Ȃ���
//���̂����ʂ� ���������ł��܂��A�蓹
