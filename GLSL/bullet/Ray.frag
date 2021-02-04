//レイマーチングを使った何か
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
uniform int rand;

const float PI = 3.14159265;

const vec3 lightDir = vec3(-0.577, 0.577, 0.577);   //光源の角度
const float angle = 60.0;               //タテの視野角
const float aspect = 1.5;               //タテに対するヨコの視野角
const float yfov = angle * 0.5 * PI / 180.0;              //タテの視野角の半分をラジアン単位に換算
const float xfov = angle * aspect * 0.5 * PI / 180.0;     //ヨコの視野角の半分をラジアン単位に換算
vec3 cPos = vec3(0.0, 0.0, 10.0);      //カメラの位置


//球の距離関数 p:レイの先端座標
float distanceFunc(vec3 p , float sphereSize){
    return length(p) - sphereSize;
}


void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

    //レイを定義
    vec3 ray = normalize( vec3(
                            sin(xfov) * p.x , sin(yfov) * p.y , -cos(yfov)
                         ));

    //マーチングループ
    float distance = 0.0;   //レイとオブジェクトの最短距離
    float rLen = 0.0;       //レイに継ぎ足す長さ
    vec3 rPos = cPos;      //レイの先端位置

    for(int i=0; i<256; i++){
        distance = distanceFunc(rPos,2.0);
        rLen += distance;
        rPos = cPos + ray * rLen;
    }

    //衝突判定
    if(distance < 0.001){
        gl_FragColor = vec4(vec3(1.0), 1.0);
    }else{
        gl_FragColor = vec4(vec3(0.0), 1.0);
    }


}