//�ԗւ�������
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    vec3 color;
    bool clear;

    for(int i=0 ; i < 6 ; i++){
        float a = sin( i + frameCount * 0.001);
        float b = cos( i + frameCount * 0.001);

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