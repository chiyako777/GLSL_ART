//���S����L���郊���O
#version 140

flat in int t;		//�t���[���J�E���g

void main(void){

	vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// �s�N�Z�����W�� -1 �` 1 �̊Ԃɐ��K�����ꂽ�l

	//int a = frameCount%120;

	//for(int i=5; i>0; i--){
		//if(length(p) < i/5.0 * abs(sin(t * 0.001))){
			//gl_FragColor = vec4(i/5.0, 0.0, 1.0, 1.0);
		//}
	//}

	//if(length(p) < i/5.0){
		//gl_FragColor = vec4(i/5.0, 0.0, 1.0, 1.0);
		//gl_FragColor = vec4( i * abs( sin(t*0.001) ) /5.0, 0.0, 1.0, 1.0);	//abs( sin(t*0.001) ) ���@0~1 
		//gl_FragColor = vec4(i * abs( tan(t*0.0005) )/5.0, 0.0, 1.0, 1.0);		//abs( tan(t*0.0005) ) ���@0~57.2�d�d
		//gl_FragColor = vec4(i * tan(t*0.0005)/5.0, 0.0, 1.0, 1.0);		//tan(t*0.0005) ���@-57.2�c ~ 57.2�d�d
	//}

	for(int i=1; i<5; i++){
		float ring = tan(t * 0.0006)/i;
		if(length(p) > ring && length(p) < ring+0.1){
			gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
		}
	}

}
