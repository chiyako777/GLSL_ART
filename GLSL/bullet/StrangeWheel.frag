//変な風に動く車輪
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
uniform int rand;

const int   oct  = 8;       //オクターブ
const float per  = 0.5;     //パーシステンス
const float PI   = 3.1415926;


// 補間関数(乱数の間を補間する)
float interpolate(float a, float b, float x){
    float f = (1.0 - cos(x * PI)) * 0.5;
    return a * (1.0 - f) + b * f;
}

// 乱数生成
float rnd(vec2 p){
    return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);       //乱数と言いつつ、ランダムではなく規則性がある。入力が同じならば、常に同じ値が返る
                                                                        //この辺が格子の各点の勾配ベクトルと距離ベクトルの内積をとってうんぬん・・・の部分

}

// 補間乱数
float irnd(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec4 v = vec4(rnd(vec2(i.x,       i.y      )),
                  rnd(vec2(i.x + 1.0, i.y      )),
                  rnd(vec2(i.x,       i.y + 1.0)),
                  rnd(vec2(i.x + 1.0, i.y + 1.0)));

    return interpolate(interpolate(v.x, v.y, f.x), interpolate(v.z, v.w, f.x), f.y);        //格子の各4点の間の「勾配ベクトル云々で得た値」の加重平均をとる
}

//ノイズ生成(0～1の範囲の値を返却)
float noise(vec2 p){
    float t = 0.0;
    for(int i=0; i<oct; i++){
        float freq = pow(2.0,float(i));         //frequency:それぞれのオクターブの影響力を決める　2^oct
        float amp = pow(per,float(oct-i));      //amplitude:それぞれのオクターブの影響力を決める  persistence^oct
        t += irnd(vec2( p.x/freq , p.y/freq )) * amp;
    }
    return t;
}


void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

    vec3 color;

    for(int i=0 ; i < 6 ; i++){
        float a = sin( i + frameCount * 0.003) + noise(vec2(i*25) + p.y) + fract(rand/7);
        float b = cos( i + frameCount * 0.003) + noise(vec2(i*25) + p.x) + fract(rand/5);

        //放射   
	    float t = atan(p.x - a,p.y - b) + frameCount * 0.0001;		//アークタンジェントで-π～πの値を取得
	    t = sin(t * 10.0);      							//アークタンジェントを定数倍して、sinで循環させる　定数の分だけ放射線の本数が増える
        if( length(p.xy - vec2(a,b)) < 0.2){
            color += vec3(t);
        }

        //枠
        if( length(p.xy - vec2(a,b)) > 0.2 && length(p.xy - vec2(a,b)) < 0.25){
            color += vec3(1.0);
        }
    }
    
    gl_FragColor = vec4(vec3(color) , 1.0);

}