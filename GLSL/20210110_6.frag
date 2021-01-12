//光のオーブ(複数描画) ※ @doxasさん流
#version 140

flat in int t;		//フレームカウント

void main(void){
	vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// ピクセル座標を -1 ～ 1 の間に正規化された値

	float destColor = 0.0;

	//オーブの数 = 常時５個
	for(float i=1.0; i<6.0 ;i++){
		//sin,cosを係数に使って、オーブの位置を動かす。iの値が大きいオーブほど動く速度が速い
		vec2 q = p + vec2(cos(t*i*0.0005),sin(t*i*0.0005));
		destColor += 0.1 / length(q);
	}

	gl_FragColor = vec4(destColor,0.0,1.0,1.0);
}
