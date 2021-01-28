//カップケーキのカップ
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	//vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//マウス座標(0～1)を-1～1の範囲に直す（左上最小）

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

	vec2 m = vec2(0,0);

	float color = 0.01 / abs(0.8  +  (sin(atan(p.x,p.y)*10)*0.02)  -  sin(length(m-p)));


	gl_FragColor = vec4(vec3(color),1.0);

}
