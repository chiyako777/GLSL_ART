//�����ԗ�
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    float a = sin(frameCount * 0.001);
    float b = cos(frameCount * 0.001);

    //����   
	float t = atan(p.x - a,p.y - b) + frameCount * 0.0001;		//�A�[�N�^���W�F���g��-�΁`�΂̒l���擾
	t = sin(t * 10.0);      							//�A�[�N�^���W�F���g��萔�{���āAsin�ŏz������@�萔�̕��������ː��̖{����������
    gl_FragColor = vec4(vec3(t),1.0);

    //�g
    if( length(p.xy - vec2(a,b)) > 0.5 && length(p.xy - vec2(a,b)) < 0.6){
        gl_FragColor = vec4(vec3(1.0),1.0);
    }

    //�O��
    if( length(p.xy - vec2(a,b)) > 0.6){
        gl_FragColor = vec4(vec3(0.0), 1.0);
    }
    

}