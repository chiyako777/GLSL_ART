#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//マウス座標(0～1)を-1～1の範囲に直す（左上最小）

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

	float a = 10.0;		//輪の周期を制御。値が大きいほどsinの値の循環が激しくなる⇒輪の周期が短くなる
	float b = 7.0;		//アニメーションの速さを制御  値が大きいほど加算する数値の傾きが大きくなる⇒sinの値の循環が激しくなる⇒アニメーションが早くなる

						//※「frameCountはどんどん増えるのになぜアニメーションの速さが一定なの？」というのが感覚的にピンと来にくいので補足
						//  「 frameCount * b * 0.003 」の部分は、frameCountの増加に伴い定量ずつ増えていく（直線的な増え方）
						//　「定量的に増えていく値」を加算していくので、値がいくら増えて行ってもアニメーションの速度はずっと変わらない
						
	float t = sin(length(m - p) * a + frameCount * b *0.003);
	
	gl_FragColor = vec4(vec3(t),1.0);

}
