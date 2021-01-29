//�p�[�����m�C�Y
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;

const int   oct  = 8;       //�I�N�^�[�u
const float per  = 0.5;     //�p�[�V�X�e���X
const float PI   = 3.1415926;
const float cCorners = 1.0 / 16.0;
const float cSides   = 1.0 / 8.0;
const float cCenter  = 1.0 / 4.0;

// ��Ԋ֐�(�����̊Ԃ��Ԃ���)
float interpolate(float a, float b, float x){
    float f = (1.0 - cos(x * PI)) * 0.5;
    return a * (1.0 - f) + b * f;
}

// ��������
float rnd(vec2 p){
    return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);       //�����ƌ����A�����_���ł͂Ȃ��K����������B���͂������Ȃ�΁A��ɓ����l���Ԃ�
}

// ��ԗ���
float irnd(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec4 v = vec4(rnd(vec2(i.x,       i.y      )),
                  rnd(vec2(i.x + 1.0, i.y      )),
                  rnd(vec2(i.x,       i.y + 1.0)),
                  rnd(vec2(i.x + 1.0, i.y + 1.0)));
    return interpolate(interpolate(v.x, v.y, f.x), interpolate(v.z, v.w, f.x), f.y);
}

//�m�C�Y����(0�`1�͈̔͂̒l��ԋp)
float noise(vec2 p){
    float t = 0.0;
    for(int i=0; i<oct; i++){
        float freq = pow(2.0,float(i));         //frequency:���ꂼ��̃I�N�^�[�u�̉e���͂����߂�@2^oct
        float amp = pow(per,float(oct-i));      //amplitude:���ꂼ��̃I�N�^�[�u�̉e���͂����߂�  persistence^oct
        t += irnd(vec2( p.x/freq , p.y/freq )) * amp;
    }
    return t;
}

void main(void){

    //�m�C�Y
    vec2 t = gl_FragCoord.xy + vec2(frameCount * 0.001);

    float n = noise(t);
    gl_FragColor = vec4(vec3(n),1.0);

}
