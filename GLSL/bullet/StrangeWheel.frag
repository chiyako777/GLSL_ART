//�ςȕ��ɓ����ԗ�
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
uniform int rand;

const int   oct  = 8;       //�I�N�^�[�u
const float per  = 0.5;     //�p�[�V�X�e���X
const float PI   = 3.1415926;


// ��Ԋ֐�(�����̊Ԃ��Ԃ���)
float interpolate(float a, float b, float x){
    float f = (1.0 - cos(x * PI)) * 0.5;
    return a * (1.0 - f) + b * f;
}

// ��������
float rnd(vec2 p){
    return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);       //�����ƌ����A�����_���ł͂Ȃ��K����������B���͂������Ȃ�΁A��ɓ����l���Ԃ�
                                                                        //���̕ӂ��i�q�̊e�_�̌��z�x�N�g���Ƌ����x�N�g���̓��ς��Ƃ��Ă���ʂ�E�E�E�̕���

}

// ��ԗ���
float irnd(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec4 v = vec4(rnd(vec2(i.x,       i.y      )),
                  rnd(vec2(i.x + 1.0, i.y      )),
                  rnd(vec2(i.x,       i.y + 1.0)),
                  rnd(vec2(i.x + 1.0, i.y + 1.0)));

    return interpolate(interpolate(v.x, v.y, f.x), interpolate(v.z, v.w, f.x), f.y);        //�i�q�̊e4�_�̊Ԃ́u���z�x�N�g���]�X�œ����l�v�̉��d���ς��Ƃ�
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

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    vec3 color;

    for(int i=0 ; i < 6 ; i++){
        float a = sin( i + frameCount * 0.003) + noise(vec2(i*25) + p.y) + fract(rand/7);
        float b = cos( i + frameCount * 0.003) + noise(vec2(i*25) + p.x) + fract(rand/5);

        //����   
	    float t = atan(p.x - a,p.y - b) + frameCount * 0.0001;		//�A�[�N�^���W�F���g��-�΁`�΂̒l���擾
	    t = sin(t * 10.0);      							//�A�[�N�^���W�F���g��萔�{���āAsin�ŏz������@�萔�̕��������ː��̖{����������
        if( length(p.xy - vec2(a,b)) < 0.2){
            color += vec3(t);
        }

        //�g
        if( length(p.xy - vec2(a,b)) > 0.2 && length(p.xy - vec2(a,b)) < 0.25){
            color += vec3(1.0);
        }
    }
    
    gl_FragColor = vec4(vec3(color) , 1.0);

}