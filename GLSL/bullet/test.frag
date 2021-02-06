//�l�p�����邮�邷��(�e���ɂ��Ă̓A�������ǁA�܂������̃l�^�ɂȂ�΁E�E)
//http://glslsandbox.com/e#70871.6
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
uniform int rand;

const float PI = 3.14159265;


float map(vec2 p, float r) {
	float d = length(p*p) - r;
	return d;
}

//�I�u�W�F�N�g�̉�]
// p:���C�̐�[���W�Aangle:��]�p�x�A
//axis:�ǂ̎��ɑ΂��āA�ǂ̒��x��]�������邩 ( �Ⴆ��X����100%�Ƃ��āAY���͂��̔����AZ���͉�]���Ȃ��Ȃ� (1.0,0.5,0.0) �Ǝw��)  ��angle�ɑ΂���100%�Ƃ����Ӗ���ˁH
vec3 rotate(vec3 p, float angle, vec3 axis){
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    //��wiki����Łu�C�ӂ̎�����̉�]�s��v�𒲂ׂĂ�
    mat3 m = mat3(
        a.x * a.x * r + c,
        a.y * a.x * r + a.z * s,
        a.z * a.x * r - a.y * s,
        a.x * a.y * r - a.z * s,
        a.y * a.y * r + c,
        a.z * a.y * r + a.x * s,
        a.x * a.z * r + a.y * s,
        a.y * a.z * r - a.x * s,
        a.z * a.z * r + c    );
    return m * p;    
}


void main(void){

    vec2 point = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j
    vec2 m = (mouse.xy * 2.0 - resolution) / resolution;		// �}�E�X�s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K���i�����ŏ��j

    for(int i=0; i<2; i++){
        p *= 2.0;
        p.x = rotate( vec3(p.x,p.y,0.0), (float(i) * 1.218) + (frameCount * 0.0003),vec3(0.0,0.0,1.0) ).x;
        p.y = rotate( vec3(p.x,p.y,0.0), (float(i) * 1.218) + (frameCount * 0.0003),vec3(0.0,0.0,1.0) ).y;
        p = abs(p) * 2.0 - 1.0;
    }

    float d = map(p , 1.0);
    d = min(d,0.0);
    gl_FragColor = vec4( 0.0 , 0.0 , -d , 1.0);

    //�e�������蔻��
    if(d < -0.1){
        if( m.x - 0.006 <= point.x &&  point.x <= m.x + 0.006 ){
            if( m.y - 0.006 <= point.y &&  point.y <= m.y + 0.006 ){
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);        //���������玩�@�ʒu�̃���0�ɂ��Ă����āA�A�v�����Ŕ���
            }
        }
    }

}