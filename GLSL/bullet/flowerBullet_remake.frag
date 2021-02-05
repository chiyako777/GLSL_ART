//弾幕：花型っぽく放射  読み解き
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

    const float NL = 8.0;      //らせん係数(1にすると、単純な放射弾幕)
    const float NB = 7.0;      //弾幕放射回数

    const float FPS = 60.0;    //秒間60フレーム想定(FPS管理してないから、ぶれるかもだけど)
    const float RE = 5.0;      //弾幕リセット係数
    const float RA = 1.7;      //らせん角度調整
    const float RB = 3.0;      //何かの調整
    const float BSIZE = 0.01;   //弾サイズ
    const float FV = 0.7;       //初期弾速(1度目に放射される弾幕の速度係数)
    const float AV = 0.7;    //加速係数(2度目以降に放射される弾幕の初期からの加速度合いに影響 1以上にすると、取り残されるやつが出てくる)



    for(float l = 0.0; l < NL; l++){

        float t = mod( (frameCount / FPS * 0.1 ) + l / 6.0 ,RE) / 2.0;           //弾幕がリセットされる間隔に影響。　l / 6 の部分で、発射タイミングが微妙にずらされてらせん状になる
        float rad = atan(p.x - 0.05,p.y - 0.05) - l / NL * RA;                   //らせんを作っていく角度（NLの値によって少しずつ角度がずれていく）
        float br = floor(rad * RB / PI) * PI / RB + l / NL * RA;                 //らせんを作る係数

        for(float i = 0.0; i < NB; i++){
            
            float r = (i / NB * 0.2 + 0.0012) * PI + br;
            float ll = (FV + i / NB * AV) * (t - i * 0.02);                    // ll は弾速に影響する係数（llの値が大きいほど、弾速は早くなる）
            
            //弾幕リセット
            if( ll < 0.0){ continue; }

            //弾幕色に塗りつぶすかが決定される
            float y = cos(r) * ll;
            float x = sin(r) * ll;

            float d = distance(vec2(x,y) ,p - vec2(0.05,0.05) );
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