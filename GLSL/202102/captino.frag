//baramaki
//http://glslsandbox.com/e#71136.0
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
uniform int rand;

const float COUNT = 30.0;

void main(void){

    vec2 uPos = ( gl_FragCoord.xy / resolution.y);      //�s�N�Z�����W��y���Ő��K��
    uPos -= vec2( (resolution.x / resolution.y) / 2.0 , 0.5);   //���_�𒆐S�Ɉړ�

    float vertColor = 0.0;

    for(float i=0.0; i<COUNT; i++){
        float t = (frameCount * 0.0001) + ( i + 0.3 );

        uPos.y += sin( -t + uPos.x * 9.0) * 0.1;
        uPos.x += cos( -t + uPos.y * 6.0 + cos(t/1.0)) * 0.15;
        float value = sin(uPos.y * 10.0) + uPos.x * 5.1;
        float stripColor = 1.0 / sqrt(abs(value)) * 3.0;

        vertColor += stripColor / 50.0;
    }

    float temp = vertColor;
    vec3 color = vec3( temp * 0.8, temp * 0.4, temp * 0.2);
    color *= color.r + color.g + color.b;
    gl_FragColor = vec4(vec3(color),1.0);


    //vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j
    //vec2 m = (mouse.xy * 2.0 - resolution) / resolution;		// �}�E�X�s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    //float col = 0.0;

    //float timeManage = mod(frameCount * 0.001 , 5);



    //gl_FragColor = vec4(vec3(col) , 1.0);




    //�e�������蔻��
    //if(col > 0.0){
    //    if( m.x - 0.006 <= p.x &&  p.x <= m.x + 0.006 ){
    //        if( m.y - 0.006 <= p.y &&  p.y <= m.y + 0.006 ){
    //            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);        //���������玩�@�ʒu�̃���0�ɂ��Ă����āA�A�v�����Ŕ���
    //        }
    //    }
    //}

}