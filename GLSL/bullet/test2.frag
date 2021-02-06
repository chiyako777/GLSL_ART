//基本の放射弾幕
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

    const float NL = 16.0;      //線数
    const float NB = 5.0;       //弾幕数
    const float BSIZE = 0.01;   //弾サイズ

    for(float j = 0.0; j < NB; j++){
        
        for(float i = 0.0; i < NL; i++){
            float angle = 2 * PI / NL * i;
        
            float velocity = mod((frameCount * 0.001),1)  + (j/NB * 0.2);
        
            //弾幕リセットタイミングでは描画しない（コメントしても変わらないけど、無駄処理しなくなる）
            if( velocity == 0.0){ continue; }

            //弾幕色に塗りつぶすかが決定される
            float y = cos(angle) * velocity;
            float x = sin(angle) * velocity;
            float d = distance(vec2(x,y) ,p);
            if(d < BSIZE){
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