#version 140

varying float x;
flat in int t;		//フレームカウント

void main(void){
	float n = sin(t * 0.001);

	gl_FragColor = vec4(n,0.5,0.5,1.0);
}
