//光のオーブ
#version 140

flat in int t;		//フレームカウント

void main(void){
	vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// ピクセル座標を -1 ～ 1 の間に正規化された値

	//光の強さを調整
	//float l = 0.1 / length(p);		// 原点⇔p の距離が0.1以下の時は光の量が最大。 pがそれより大きくなると、だんだん暗くなる
	//float l = 0.1 * abs(sin(t*0.001)) / length(p);	//係数の 0.1 に abs(sin(t)) ※0～1 を乗算して、オーブの大きさを変化させる

	//float l = 0.3 * abs(sin(t*0.001)) / distance(vec2(sin(t*0.001),cos(t*0.001)),p);	//オーブの位置を動かす

	//オーブの位置を動かす(2)
	p += vec2(cos(t*0.005),sin(t*0.001));
	float l = 0.1 / length(p);

	//gl_FragColor = vec4(vec3(l),1.0);
	gl_FragColor = vec4(l,0.0,1.0,1.0);		//カラフルにしてみた
}
