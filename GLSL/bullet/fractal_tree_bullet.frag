//�t���N�^���Ȗ؂Œe����
//https://gam0022.net/blog/2017/03/02/raymarching-fold/
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
//uniform int count;

const float PI = 3.14159265;
const vec3 lightDir = vec3(-0.577, -0.577, 0.577);   //�����̊p�x
const float angle = 60.0;                           //����p(�㉺���E)
const float fov = angle * 0.5 * PI / 180.0;         //����p�̔��������W�A���P�ʂɊ��Z
vec3 cPos = vec3(0.0, 1.5, 4.0);                    //�J�����̈ʒu

float count = floor( mod( frameCount / 60 , 14) );

//�܂��݊֐�(x)
vec3 foldX(vec3 p){
    p.x = abs(p.x);     //��Βl���Ƃ��āA�����I�ɐ��ɂ���
    return p;
}

//z������̉�]�s���ԋp
mat2 rotate(float a){
    float s = sin(a);
    float c = cos(a);
    return mat2(c,s,-s,c);
}

//�{�b�N�X�̋����֐� p:���C�̐�[�ʒu�Ab:�{�b�N�X�̑傫��
float sdBox(vec3 p, vec3 b){
    vec3 d = abs(p) - b;
    return min( max(d.x, max(d.y,d.z)) , 0.0 ) + length(max(d , 0.0));      //min( max(d.x, max(d,y,d.z)) , 0.0 ) �́A�O���Ă���������������v�����B
}

//�����֐�
float dTree(vec3 p){
    vec3 size = vec3( 0.1 , 1.0 , 0.1);     //�{�b�N�X�̃T�C�Y
    float d = sdBox(p,size);        //���C��[�ƃ{�b�N�X�̋���
    p = foldX(p);   //x��܂肽����
    p.y -= 0.1;         
    p.xy *= rotate(-1.2);       //��]��y���W���������܂��āA���ɑ΂���}�ƂȂ�悤��
    d = min( d , sdBox(p,size));    //�܂肽���ޑO(��)�Ɛ܂肽���񂾌�(�})�̘a�W��
    return d;
}

//�����֐�(�ċA)
float dTree_recurs(vec3 p){
    float scale = 0.8;      //�`������񂾂�ׂ������Ă������߂̃X�P�[��
    vec3 size = vec3( 0.1 , 1.0 , 0.1);     //�{�b�N�X�̃T�C�Y
    float d = sdBox(p,size);        //���C��[�ƃ{�b�N�X�̋���

    for(float i=0.0; i<count; i++){
        
        d = min( d , sdBox(p,size));

        vec3 q = foldX(p);
        q.y -= size.y;
        q.xy *= rotate(-0.5);
        p = q;              // p���㏑�����Ă���
        size *= scale;      //�X�P�[���X�V

    }

    return d;

}

//�@���Z�o�֐� p:���C�ƃI�u�W�F�N�g�̌�_�̍��W�ʒu  
vec3 getNormal(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        dTree_recurs(p + vec3(  d, 0.0, 0.0)) - dTree_recurs(p + vec3( -d, 0.0, 0.0)),
        dTree_recurs(p + vec3(0.0,   d, 0.0)) - dTree_recurs(p + vec3(0.0,  -d, 0.0)),
        dTree_recurs(p + vec3(0.0, 0.0,   d)) - dTree_recurs(p + vec3(0.0, 0.0,  -d))
        ));
}

void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j
    vec2 m = (mouse.xy * 2.0 - resolution) / resolution;		    // �}�E�X�s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    //���C���`
    vec3 ray = normalize(vec3( -sin(fov) * p.x , -sin(fov) * p.y , -cos(fov)));     // x, y �Ƀ}�C�i�X�|���ď㉺���E���]

    //�}�[�`���O���[�v
    float distance = 0.0;   //���C�ƃI�u�W�F�N�g�̍ŒZ����
    float rLen = 0.0;       //���C�Ɍp����������
    vec3 rPos = cPos;       //���C�̐�[�ʒu�i�f�t�H���g�̓J�����̈ʒu�j

    for(int i=0; i<256; i++){
        distance = dTree_recurs(rPos);
        rLen += distance;
        rPos = cPos + rLen * ray;
    }

    //�Փ˔���
    float diff = 0.0;
    if( distance < 0.001 ){
        vec3 normal = getNormal(rPos);
        diff = clamp( dot(lightDir,normal) , 0.1 , 1.0);
        gl_FragColor = vec4(diff*0.9, diff*0.7, diff*0.8 , 1.0);
    }else{
        gl_FragColor = vec4(0.8);
    }

    //�e�������蔻��
    if(diff > 0.0){
        if( m.x - 0.006 <= p.x &&  p.x <= m.x + 0.006 ){
            if( m.y - 0.006 <= p.y &&  p.y <= m.y + 0.006 ){
                gl_FragColor = vec4(0.0, 0.0, 1.0, 0.0);        //���������玩�@�ʒu�̃���0�ɂ��Ă����āA�A�v�����Ŕ���
            }
        }
    }

}