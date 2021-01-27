#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//マウス座標(0～1)を-1～1の範囲に直す（左上最小）

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

	vec2 v = vec2(0.0,1.0);
	
	//float t = dot(p,v) / (length(p) * length(v));			//(1) dot(p,v) = |p||v|cosθ　なので dot(p,v) / (length(p) * length(v)) = cosθ
															//よって明るさは、vとのなす角が0に近いほど明るくなり、なす角が大きくなるほど暗くなる

	float t =abs(dot(p,v)) / (length(p) * length(v));		//(2) 内積の絶対値をとってマイナスに振れないようにすることで、下半分にもグラデーションが描画された

	gl_FragColor = vec4(vec3(t),1.0);

}
