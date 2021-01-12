//層状のリング + 三角関数でアニメーション
#version 140

flat in int t;		//フレームカウント

void main(void){

	vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// ピクセル座標を -1 ～ 1 の間に正規化された値
	for(int i=5; i>0; i--){
		if(length(p) < i/5.0){
			//gl_FragColor = vec4(i/5.0, 0.0, 1.0, 1.0);
			//gl_FragColor = vec4( i * abs( sin(t*0.001) ) /5.0, 0.0, 1.0, 1.0);	//abs( sin(t*0.001) ) →　0~1 
			//gl_FragColor = vec4(i * abs( tan(t*0.0005) )/5.0, 0.0, 1.0, 1.0);		//abs( tan(t*0.0005) ) →　0~57.2‥‥
			gl_FragColor = vec4(i * tan(t*0.0005)/5.0, 0.0, 1.0, 1.0);		//tan(t*0.0005) →　-57.2… ~ 57.2‥‥
		}
	}

}
