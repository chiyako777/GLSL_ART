#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//マウス座標(0～1)を-1～1の範囲に直す（左上最小）

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

	//float t = sin(0.001 * frameCount);
	//float harfpi = 3.141592 / 2;
	//float t = sin( distance(m,p) / sqrt(8) * harfpi);	//(1) m,p間の距離が短いほど暗い。tの値は0～1を循環する　（distanceの最大値が√8なので、除算して正規化）
	//float t = sin( distance(m,p) / sqrt(8) * harfpi *  frameCount * 0.01);	//(2) (1)の状態にframeCountを掛けてアニメーション化


	//float t = sin(length(m - p) * 30.0 + frameCount * 5.0 *0.001);
	float t = sin(length(m - p) * 30 + frameCount * 3.0 * 0.001);
	
	gl_FragColor = vec4(vec3(t),1.0);

}
