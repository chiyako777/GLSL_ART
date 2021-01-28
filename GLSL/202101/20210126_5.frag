#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//マウス座標(0～1)を-1～1の範囲に直す（左上最小）

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

	//float color = 1 - abs(0.5 - length(m-p)) * 13;		//(1)マウス⇔ピクセル距離が0.5に近づくほど明るくなる。定数を乗算して、コントラストを強くさせている

	float color = 0.01 / abs(0.8 * sin(frameCount * 0.001) - length(m-p));			
							//(2) ある値から距離を減算した絶対値で、除算。その距離に近づくほど、除算結果が限りなく大きくなっていく。(1)よりもリングがくっきり出る
							//    lengthを減算する対象の数値にsin掛けして、リングの大きさが変化するように

	gl_FragColor = vec4(vec3(color),1.0);

}
