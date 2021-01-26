#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//マウス座標(0～1)を-1～1の範囲に直す（左上最小）

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

	float color = 1.1 - length(m-p);	//マウス位置に近いほど明るくなる。1.1から減算しているので距離が0.1以下の場合は明るさ最大。
	 
	color = pow(color,11);	//コントラストを強くするために累乗する。
							//指数の値によって、「距離が遠くなればなるほど暗く」なったり、「一定以上の距離になるとまた明るく」なったりする
							//⇒指数関数の形を調べてみよう

	gl_FragColor = vec4(vec3(color),1.0);

}
