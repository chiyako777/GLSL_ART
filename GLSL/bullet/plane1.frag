//��{�̕��˒e��
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

    const float NL = 16.0;      //����
    const float NB = 5.0;       //�e����
    const float BSIZE = 0.01;   //�e�T�C�Y

    for(float j = 0.0; j < NB; j++){
        
        for(float i = 0.0; i < NL; i++){
            float angle = 2 * PI / NL * i;
        
            float velocity = mod((frameCount * 0.001),1)  + (j/NB * 0.2);
        
            //�e�����Z�b�g�^�C�~���O�ł͕`�悵�Ȃ��i�R�����g���Ă��ς��Ȃ����ǁA���ʏ������Ȃ��Ȃ�j
            if( velocity == 0.0){ continue; }

            //�e���F�ɓh��Ԃ��������肳���
            float y = cos(angle) * velocity;
            float x = sin(angle) * velocity;
            float d = distance(vec2(x,y) ,p);
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