//角が丸いボックスを描く
//(原理の参考)https://wgld.org/d/glsl/g013.html

#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;

const float sphereSize = 1.0; // 描画する球の半径
//const vec3 lightDir = vec3(-0.577, 0.577, 0.577);   //光源の角度(左上から照らす)
const vec3 lightDir = vec3(0.0, 0.0, 1.0);   //光源の角度(正面から照らす)

const float PI = 3.14159265;
const float angle = 60.0;       //視野角(上下左右ともに、という話だと思う)
const float fov = angle * 0.5 * PI / 180.0;     //視野角の半分をラジアン単位に換算
vec3 cPos = vec3(0.0, 0.0, 3.0);      //カメラの位置

//p:レイの先端座標
vec3 trans(vec3 p){
    //return mod(p,4.0) - 2.0;      //modを使うことによって、pの中身が何であっても0~3.999…にクランプされる。2を引くことで、-2～1.9999…の範囲になる
    return mod(p,6.0) - 3.0;
}

//球の距離関数 p:レイの先端座標
float shere_distanceFunc(vec3 p){
    return length(trans(p)) - sphereSize;
}

//ボックスの距離関数  p:レイの先端座標
float box_distanceFunc(vec3 p){
    vec3 q = abs(trans(p));
    return length( max(q - vec3(0.5,0.5,0.5) , 0.0 ));
}

//角丸ボックスの距離関数  p:レイの先端座標
float roundbox_distanceFunc(vec3 p){
    vec3 q = abs(trans(p));
    return length( max(q - vec3(0.5,0.5,0.5) , 0.0 )) - 0.1;    //0.1減算によって、ホントはボックスの角に当たってないレイが、当たってる判定される。結果として角が取れてボックスが膨らむ
}

//法線算出関数 p:レイとオブジェクトの交点の座標位置  
vec3 getNormal(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        roundbox_distanceFunc(p + vec3(  d, 0.0, 0.0)) - roundbox_distanceFunc(p + vec3( -d, 0.0, 0.0)),
        roundbox_distanceFunc(p + vec3(0.0,   d, 0.0)) - roundbox_distanceFunc(p + vec3(0.0,  -d, 0.0)),
        roundbox_distanceFunc(p + vec3(0.0, 0.0,   d)) - roundbox_distanceFunc(p + vec3(0.0, 0.0,  -d))
        ));
}

void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

    //レイを定義
    vec3 ray = normalize(vec3( sin(fov) * p.x , sin(fov) * p.y , -cos(fov)));

    //マーチングループ
    float distance = 0.0;   //レイとオブジェクトの最短距離
    float rLen = 0.0;       //レイに継ぎ足す長さ
    vec3 rPos = cPos;       //レイの先端位置（デフォルトはカメラの位置）

    for(int i=0; i<64; i++){
        distance = roundbox_distanceFunc(rPos);
        rLen += distance;
        rPos = cPos + ray * rLen;
    }

    //衝突判定(衝突したら、その時点で距離は伸びなくなるという考え)
    if(abs(distance) < 0.001){
        vec3 normal = getNormal(rPos);
        float diff = clamp(dot(lightDir,normal) , 0.1 , 1.0);
        gl_FragColor = vec4(vec3(diff), 1.0);
        //gl_FragColor = vec4(normal, 1.0);
    }
    else{
        gl_FragColor = vec4(vec3(0.0), 1.0);
    }

}

