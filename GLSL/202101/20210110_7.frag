//光のオーブ(複数描画)アレンジ ※ 元⇒@doxasさん流
#version 140

flat in int t;		//フレームカウント

void main(void){
	vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// ピクセル座標を -1 ～ 1 の間に正規化された値

	float destColor = 0.0;

	//花の数
	for(float a=-1; a<1; a+=0.5){
		//オーブの数 = 常時６個
		for(float i=1.0; i<7.0 ;i++){
		
			//オーブの位置を動かすベクトル
			vec2 q = p + vec2(cos(i) / 2 * abs(cos(t*0.001)) , sin(i) / 2 * abs(cos(t*0.001)));

			//明るさが徐々に上乗せされていって、最終的に全部合算した明るさが塗られる
			//destColor += 0.07 * cos(t * 0.001) / length(q);
			destColor += 0.03 * cos(t * 0.001) / distance(q,vec2(a,a));

		}
	}

	gl_FragColor = vec4(destColor,0.0,1.0,1.0);
}
