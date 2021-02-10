//�����ˉQ��������
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

        uPos.y += sin( t + uPos.x) * 0.1;   //y���������炵

        uPos.x += abs(tan( -t + uPos.y + cos(t/1.0))) * 0.15;   //x 0�`�� / 0.15  y�Ɉˑ�

        float value = sin(uPos.x * 10.0) + uPos.y * 5.1;

        float stripColor = 1.0 / length(uPos) + sqrt(abs(value));

        vertColor += stripColor / 50.0;
    }

    float temp = vertColor;
    vec3 color = vec3( temp * 0.2, temp * 0.4, temp * 0.8);
    gl_FragColor = vec4(vec3(color),1.0);


    //�e�������蔻��
    //if(col > 0.0){
    //    if( m.x - 0.006 <= p.x &&  p.x <= m.x + 0.006 ){
    //        if( m.y - 0.006 <= p.y &&  p.y <= m.y + 0.006 ){
    //            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);        //���������玩�@�ʒu�̃���0�ɂ��Ă����āA�A�v�����Ŕ���
    //        }
    //    }
    //}

}