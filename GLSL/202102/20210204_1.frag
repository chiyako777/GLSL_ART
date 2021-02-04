//�e�N�X�`���𓊉e����
//(�����̎Q�l)https://wgld.org/d/glsl/g013.html

#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;

const vec3 cPos = vec3(0.0, 5.0, 5.0);
const vec3 cDir = vec3(0.0, -0.707, -0.707);
const vec3 cUp  = vec3(0.0,  0.707, -0.707);

const vec3 lightDir = vec3(-0.57, 0.57, 0.57);

// torus distance function
float distFuncTorus(vec3 p){
    p.xz -= mouse * 2.0 - 1.0;
    vec2 t = vec2(3.0, 1.0);
    vec2 r = vec2(length(p.xz) - t.x, p.y);
    return length(r) - t.y;
}

// floor distance function
float distFuncFloor(vec3 p){
    return dot(p, vec3(0.0, 1.0, 0.0)) + 1.0;
}

// distance function
float distFunc(vec3 p){
    float d1 = distFuncTorus(p);
    float d2 = distFuncFloor(p);
    return min(d1, d2);
}

//�@���Z�o�֐� p:���C�ƃI�u�W�F�N�g�̌�_�̍��W�ʒu  
vec3 getNormal(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        distFunc(p + vec3(  d, 0.0, 0.0)) - distFunc(p + vec3( -d, 0.0, 0.0)),
        distFunc(p + vec3(0.0,   d, 0.0)) - distFunc(p + vec3(0.0,  -d, 0.0)),
        distFunc(p + vec3(0.0, 0.0,   d)) - distFunc(p + vec3(0.0, 0.0,  -d))
        ));
}

void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    //���C���`
    vec3 cSide = cross(cDir,cUp);
    float targetDepth = 1.0;
    //vec3 ray = normalize(vec3( sin(fov) * p.x , sin(fov) * p.y , -cos(fov)));
    vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);

    //�}�[�`���O���[�v
    float distance = 0.0;   //���C�ƃI�u�W�F�N�g�̍ŒZ����
    float rLen = 0.0;       //���C�Ɍp����������
    vec3 rPos = cPos;       //���C�̐�[�ʒu�i�f�t�H���g�̓J�����̈ʒu�j

    for(int i=0; i<256; i++){
        distance = distFunc(rPos);
        if(distance < 0.001){break;}
        rLen += distance;
        rPos = cPos + ray * rLen;
    }

    //�Փ˔���(�Փ˂�����A���̎��_�ŋ����͐L�тȂ��Ȃ�Ƃ����l��)
    vec3 color;
    if(abs(distance) < 0.001){
        vec3 normal = getNormal(rPos);
        float diff = clamp(dot(lightDir,normal) , 0.1 , 1.0);

        //�^�C���͗l�𐶐�
        float u = 1.0 - floor(mod(rPos.x , 2.0));
        float v = 1.0 - floor(mod(rPos.z , 2.0));

        if((u == 1.0 && v < 1.0) || (u < 1/0 && v == 1.0)){
            diff *= 0.7;
        }
        
        color = vec3(1.0) * diff;
    }
    else{
        color = vec3(0.0);
    }

    gl_FragColor = vec4(vec3(color), 1.0);

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
