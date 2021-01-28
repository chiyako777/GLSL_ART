//fan
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	//vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//マウス座標(0～1)を-1～1の範囲に直す（左上最小）

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

	vec2 m = vec2(0,0);

	//float color = 0.01 / abs(0.8  +  (sin(atan(p.x,p.y)*10)*0.02)  -  length(m-p));

	float a = atan(p.x,p.y) - length(p) * 0.5;
	float u = abs( sin(a * 10) );		//length から減算する値に、アークタンジェントからlength(p)を引いた数値のsinを使う
										//length(p)を引くことによって起こる効果：本来なら明るい所が暗くなる
																				 本来なら暗い所が明るくなる
																				 さらに、そのズレ具合が距離によって変わることで、花びらが曲がる
																				 まだちょっとイメージ湧いてないけど・・・
	float color = 0.01 / abs(u-length(p));

	gl_FragColor = vec4(vec3(color),1.0);

}
