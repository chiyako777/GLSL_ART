#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化

	vec2 color = (vec2(1.0)+p.xy) * 0.5;	//正規化した座標を、カラーの0～1の範囲に直す

	gl_FragColor = vec4(color,1.0,1.0);
	
}
