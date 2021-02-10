//フラクタルな木で弾幕を
//https://gam0022.net/blog/2017/03/02/raymarching-fold/
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
//uniform int count;

const float PI = 3.14159265;
const vec3 lightDir = vec3(-0.577, -0.577, 0.577);   //光源の角度
const float angle = 60.0;                           //視野角(上下左右)
const float fov = angle * 0.5 * PI / 180.0;         //視野角の半分をラジアン単位に換算
vec3 cPos = vec3(0.0, 1.5, 4.0);                    //カメラの位置

float count = floor( mod( frameCount / 60 , 14) );

//折り畳み関数(x)
vec3 foldX(vec3 p){
    p.x = abs(p.x);     //絶対値をとって、強制的に正にする
    return p;
}

//z軸周りの回転行列を返却
mat2 rotate(float a){
    float s = sin(a);
    float c = cos(a);
    return mat2(c,s,-s,c);
}

//ボックスの距離関数 p:レイの先端位置、b:ボックスの大きさ
float sdBox(vec3 p, vec3 b){
    vec3 d = abs(p) - b;
    return min( max(d.x, max(d.y,d.z)) , 0.0 ) + length(max(d , 0.0));      //min( max(d.x, max(d,y,d.z)) , 0.0 ) は、外してももしかしたら大丈夫かも。
}

//距離関数
float dTree(vec3 p){
    vec3 size = vec3( 0.1 , 1.0 , 0.1);     //ボックスのサイズ
    float d = sdBox(p,size);        //レイ先端とボックスの距離
    p = foldX(p);   //xを折りたたむ
    p.y -= 0.1;         
    p.xy *= rotate(-1.2);       //回転とy座標下げをかませて、幹に対する枝となるように
    d = min( d , sdBox(p,size));    //折りたたむ前(幹)と折りたたんだ後(枝)の和集合
    return d;
}

//距離関数(再帰)
float dTree_recurs(vec3 p){
    float scale = 0.8;      //描画をだんだん細かくしていくためのスケール
    vec3 size = vec3( 0.1 , 1.0 , 0.1);     //ボックスのサイズ
    float d = sdBox(p,size);        //レイ先端とボックスの距離

    for(float i=0.0; i<count; i++){
        
        d = min( d , sdBox(p,size));

        vec3 q = foldX(p);
        q.y -= size.y;
        q.xy *= rotate(-0.5);
        p = q;              // pを上書きしていく
        size *= scale;      //スケール更新

    }

    return d;

}

//法線算出関数 p:レイとオブジェクトの交点の座標位置  
vec3 getNormal(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        dTree_recurs(p + vec3(  d, 0.0, 0.0)) - dTree_recurs(p + vec3( -d, 0.0, 0.0)),
        dTree_recurs(p + vec3(0.0,   d, 0.0)) - dTree_recurs(p + vec3(0.0,  -d, 0.0)),
        dTree_recurs(p + vec3(0.0, 0.0,   d)) - dTree_recurs(p + vec3(0.0, 0.0,  -d))
        ));
}

void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）
    vec2 m = (mouse.xy * 2.0 - resolution) / resolution;		    // マウスピクセル座標を -1 ～ 1 の間に正規化（左下最小）

    //レイを定義
    vec3 ray = normalize(vec3( -sin(fov) * p.x , -sin(fov) * p.y , -cos(fov)));     // x, y にマイナス掛けて上下左右反転

    //マーチングループ
    float distance = 0.0;   //レイとオブジェクトの最短距離
    float rLen = 0.0;       //レイに継ぎ足す長さ
    vec3 rPos = cPos;       //レイの先端位置（デフォルトはカメラの位置）

    for(int i=0; i<256; i++){
        distance = dTree_recurs(rPos);
        rLen += distance;
        rPos = cPos + rLen * ray;
    }

    //衝突判定
    float diff = 0.0;
    if( distance < 0.001 ){
        vec3 normal = getNormal(rPos);
        diff = clamp( dot(lightDir,normal) , 0.1 , 1.0);
        gl_FragColor = vec4(diff*0.9, diff*0.7, diff*0.8 , 1.0);
    }else{
        gl_FragColor = vec4(0.8);
    }

    //弾幕当たり判定
    if(diff > 0.0){
        if( m.x - 0.006 <= p.x &&  p.x <= m.x + 0.006 ){
            if( m.y - 0.006 <= p.y &&  p.y <= m.y + 0.006 ){
                gl_FragColor = vec4(0.0, 0.0, 1.0, 0.0);        //当たったら自機位置のαを0にしておいて、アプリ側で判定
            }
        }
    }

}