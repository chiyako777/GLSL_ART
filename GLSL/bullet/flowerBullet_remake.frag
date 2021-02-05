//�e���F�Ԍ^���ۂ�����  �ǂ݉���
//http://glslsandbox.com/e#58264.1
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
uniform int rand;

const float PI = 3.14159265;


void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j
    vec2 m = (mouse.xy * 2.0 - resolution) / resolution;		// �}�E�X�s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    float col = 0.0;

    const float NL = 8.0;      //�点��W��(1�ɂ���ƁA�P���ȕ��˒e��)
    const float NB = 7.0;      //�e�����ˉ�

    const float FPS = 60.0;    //�b��60�t���[���z��(FPS�Ǘ����ĂȂ�����A�Ԃ�邩��������)
    const float RE = 5.0;      //�e�����Z�b�g�W��
    const float RA = 1.7;      //�点��p�x����
    const float RB = 3.0;      //�����̒���
    const float BSIZE = 0.01;   //�e�T�C�Y
    const float FV = 0.7;       //�����e��(1�x�ڂɕ��˂����e���̑��x�W��)
    const float AV = 0.7;    //�����W��(2�x�ڈȍ~�ɕ��˂����e���̏�������̉����x�����ɉe�� 1�ȏ�ɂ���ƁA���c��������o�Ă���)



    for(float l = 0.0; l < NL; l++){

        float t = mod( (frameCount / FPS * 0.1 ) + l / 6.0 ,RE) / 2.0;           //�e�������Z�b�g�����Ԋu�ɉe���B�@l / 6 �̕����ŁA���˃^�C�~���O�������ɂ��炳��Ă点���ɂȂ�
        float rad = atan(p.x - 0.05,p.y - 0.05) - l / NL * RA;                   //�点�������Ă����p�x�iNL�̒l�ɂ���ď������p�x������Ă����j
        float br = floor(rad * RB / PI) * PI / RB + l / NL * RA;                 //�点������W��

        for(float i = 0.0; i < NB; i++){
            
            float r = (i / NB * 0.2 + 0.0012) * PI + br;
            float ll = (FV + i / NB * AV) * (t - i * 0.02);                    // ll �͒e���ɉe������W���ill�̒l���傫���قǁA�e���͑����Ȃ�j
            
            //�e�����Z�b�g
            if( ll < 0.0){ continue; }

            //�e���F�ɓh��Ԃ��������肳���
            float y = cos(r) * ll;
            float x = sin(r) * ll;

            float d = distance(vec2(x,y) ,p - vec2(0.05,0.05) );
            if(d < BSIZE){
                col += 120.0 * d;
            }

        }

    }

    gl_FragColor = vec4(vec3(col) , 1.0);

    //�e�������蔻��
    if(col > 0.0){
        if( m.x - 0.006 <= p.x &&  p.x <= m.x + 0.006 ){
            if( m.y - 0.006 <= p.y &&  p.y <= m.y + 0.006 ){
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);        //���������玩�@�ʒu�̃���0�ɂ��Ă����āA�A�v�����Ŕ���
            }
        }
    }

}