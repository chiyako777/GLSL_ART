#version 140

flat in int t;		//�t���[���J�E���g

void main(void){

	vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K�����ꂽ�l
	for(int i=5; i>0; i--){
		if(length(p) < i/5.0){
			//gl_FragColor = vec4(i/5.0, 0.0, 1.0, 1.0);
			gl_FragColor = vec4(i*tan(t*0.001)/5.0, 0.0, 1.0, 1.0);
		}
	}

}
