//光のリング
#version 140

flat in int t;		//フレームカウント

void main(void){
	vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// ピクセル座標を -1 ～ 1 の間に正規化された値

	//光の強さを調整
	float l = 1 - abs(0.7 - length(p))*5;

	gl_FragColor = vec4(l,0.0,1.0,1.0);		//カラフルにしてみた
}
