//内積を使ったグラデーション
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//マウス座標(0～1)を-1～1の範囲に直す（左上最小）

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

	vec2 v = vec2(0.0,1.0);

	//pを決め打ちしてみて、色の変化を見る
	//vec2 p = vec2(0.1,1.0);		//真っ白(y=1.0 ならxが何であっても真っ白)　⇒|p||v|cosθ⇒p.y = 1のとき、p.xの値によらず結果は1超えする
									//											 (軽く証明)
									//											 cosθ = |p|/abs(p.x)
									//                                           |v| = 1 なので、 dot(p,v) = |p| * |p| / abs(p.x)
									//											 p.y = 1 なので、|p|は確実に1以上
									//											 座標が -1～1 の範囲なので、 0 < abs(p.x) < 1
									//											 1以上の数値を0～1の数値で除算するのだから、結果は確実に1以上
									//											 よって、 p.y = 1のとき、p.xの値によらず出力色は真っ白になる
									//											 同じことは 0 < y < 1の範囲でも言える⇒よって、レンダリング結果が横方向に均一なグラデーションとなっている


	float t = dot(p,v);			//p,vのなす角が鋭角：色あり　鈍角：tが負の値になるので真っ黒

	gl_FragColor = vec4(vec2(t),1.0,1.0);

}

