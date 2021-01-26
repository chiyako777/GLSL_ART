#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	//vec2 p = (gl_FragCoord.xy * 2.0 - 800) / 800;		// ピクセル座標を -1 ～ 1 の間に正規化された値

	gl_FragColor = vec4(1.0,0.0,1.0,1.0);
	//gl_FragColor = vec4(1.0*sin(frameCount*0.001),0,1.0,1.0);
	//gl_FragColor = vec4(1.0*sin(mouse.x * resolution.x * 0.001 * frameCount),0,1.0,1.0);
}
