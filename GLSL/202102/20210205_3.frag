//�ԗ�2��
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    vec3 color;
    bool clear;

    float a = sin(frameCount * 0.001);
    float b = cos(frameCount * 0.001);

    //����   
	float t = atan(p.x - a,p.y - b) + frameCount * 0.0001;		//�A�[�N�^���W�F���g��-�΁`�΂̒l���擾
	t = sin(t * 10.0);      							//�A�[�N�^���W�F���g��萔�{���āAsin�ŏz������@�萔�̕��������ː��̖{����������
    if( length(p.xy - vec2(a,b)) < 0.5){
        color += vec3(t);
    }

    //�g
    if( length(p.xy - vec2(a,b)) > 0.5 && length(p.xy - vec2(a,b)) < 0.6){
        color += vec3(1.0);
    }

    a = cos(frameCount * 0.001);
    b = sin(frameCount * 0.001);

    //����   
	t = atan(p.x - a,p.y - b) + frameCount * 0.0001;		//�A�[�N�^���W�F���g��-�΁`�΂̒l���擾
	t = sin(t * 10.0);      							//�A�[�N�^���W�F���g��萔�{���āAsin�ŏz������@�萔�̕��������ː��̖{����������
    if( length(p.xy - vec2(a,b)) < 0.5){
        color += vec3(t);
    }

    //�g
    if( length(p.xy - vec2(a,b)) > 0.5 && length(p.xy - vec2(a,b)) < 0.6){
        color += vec3(1.0);
    }
    
    gl_FragColor = vec4(vec3(color) , 1.0);

}