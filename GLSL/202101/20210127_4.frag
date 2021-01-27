#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//マウス座標(0～1)を-1～1の範囲に直す（左上最小）

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

	float t = atan(p.x,p.y) + frameCount * 0.0001;		//アークタンジェントで-π～πの値を取得
	t = sin(t * 10.0);									//アークタンジェントを定数倍して、sinで循環させる　定数の分だけ放射線の本数が増える
	
	gl_FragColor = vec4(vec3(t),1.0);

}
