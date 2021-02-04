//車輪2つ
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

    vec3 color;
    bool clear;

    float a = sin(frameCount * 0.001);
    float b = cos(frameCount * 0.001);

    //放射   
	float t = atan(p.x - a,p.y - b) + frameCount * 0.0001;		//アークタンジェントで-π～πの値を取得
	t = sin(t * 10.0);      							//アークタンジェントを定数倍して、sinで循環させる　定数の分だけ放射線の本数が増える
    if( length(p.xy - vec2(a,b)) < 0.5){
        color += vec3(t);
    }

    //枠
    if( length(p.xy - vec2(a,b)) > 0.5 && length(p.xy - vec2(a,b)) < 0.6){
        color += vec3(1.0);
    }

    a = cos(frameCount * 0.001);
    b = sin(frameCount * 0.001);

    //放射   
	t = atan(p.x - a,p.y - b) + frameCount * 0.0001;		//アークタンジェントで-π～πの値を取得
	t = sin(t * 10.0);      							//アークタンジェントを定数倍して、sinで循環させる　定数の分だけ放射線の本数が増える
    if( length(p.xy - vec2(a,b)) < 0.5){
        color += vec3(t);
    }

    //枠
    if( length(p.xy - vec2(a,b)) > 0.5 && length(p.xy - vec2(a,b)) < 0.6){
        color += vec3(1.0);
    }
    
    gl_FragColor = vec4(vec3(color) , 1.0);

}