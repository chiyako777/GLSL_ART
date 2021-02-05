//弾幕：花型っぽく放射
//http://glslsandbox.com/e#58264.1
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
uniform int rand;

const float PI = 3.14159265;


void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）
    vec2 m = (mouse.xy * 2.0 - resolution) / resolution;		// マウスピクセル座標を -1 ～ 1 の間に正規化（左下最小）

    float col = 0.0;

    const float NL = 15.0;
    const float NB = 7.0;

    for(float l = 0.0; l < NL; l++){
        float t = mod( (frameCount * 0.003) + l / 6.0 * 0.8 , 7.0) / 2.0;
        float rad = atan(p.x,p.y) + l / NL * 1.7;
        float br = floor(rad * 7.0 / PI) * PI / 7.0 - l / NL * 1.7;

        for(float i = 0.0; i < NB; i++){
            float r = (i / NB * 0.2 + 0.012) * PI + br;
            float l = (0.4 + i / NB * 0.7) * (t - i * 0.02);
            if( l < 0.0){ continue; }
            float y = cos(r) * l;
            float x = sin(r) * l;
            float d = distance(vec2(x,y) ,p);
            if(d < 0.01){
                col += 120.0 * d;
            }
        }

    }

    gl_FragColor = vec4(vec3(col) , 1.0);

    //弾幕当たり判定
    if(col > 0.0){
        if( m.x - 0.006 <= p.x &&  p.x <= m.x + 0.006 ){
            if( m.y - 0.006 <= p.y &&  p.y <= m.y + 0.006 ){
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);        //当たったら自機位置のαを0にしておいて、アプリ側で判定
            }
        }
    }

}