#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//マウス座標(0～1)を-1～1の範囲に直す（左上最小）

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

	vec2 v = vec2(0.0,1.0);

	//float t = dot(p,v) / length(p-v);		//(1)内積をlengthで除算することによって、距離が長くなるほど暗い

	//float t = dot(p,v) / sin(length(p-v));	//(2)除算値をsinで循環させる。lengthが多分最大でも√3だからsin0°～約100° 少し暗い面積が増える

	//float t = dot(p,v) / sin(2 * length(p-v));	//(3)sinの中身をlength*2に。sin値がマイナスにも振れるようになる。dot(p,v)もマイナスだった場合、打ち消して正の数になるから、画面下半分にも白い部分ができる

	//float t = dot(p,v) / sin(3 * length(p-v));		//(4)sinの循環を増やす

	//float t = dot(p,v) / sin(7 * length(p-v));		//(5)sinの循環を増やす

	float t = dot(p,v) / sin(7 * length(p-v) + frameCount * 0.001);		//(6)アニメーションを付ける

	gl_FragColor = vec4(vec3(t),1.0);

}
