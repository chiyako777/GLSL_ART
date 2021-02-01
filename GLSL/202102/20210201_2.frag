//レイマーチングで球体を描く
//(原理の参考)https://wgld.org/d/glsl/g009.html

#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;

const float sphereSize = 1.0; // 描画する球の半径

//距離関数
float distanceFunc(vec3 p){
    return length(p) - sphereSize;
}

void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

    vec3 cPos = vec3(0.0, 0.0, 3.0);      //カメラの位置
    vec3 cDir = vec3(0.0, 0.0, -1.0);     //カメラの視線
    vec3 cUp = vec3(0.0, 1.0, 0.0);       //カメラの上方向
    vec3 cSide = cross(cDir,cUp);       //外積を使ってカメラの横方向を算出  (今だと1,0,0だね)
    float targetDepth = 1.0;            //フォーカスする深度

    //レイを定義
    vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);     //カメラ横方向 * x + カメラ上方向 * y + カメラ視線方向 * z で、「各ピクセル位置へ向かうレイ」が定義できる

    //マーチングループ
    float distance = 0.0;   //レイとオブジェクトの最短距離
    float rLen = 0.0;       //レイに継ぎ足す長さ
    vec3 rPos = cPos;       //レイの先端位置（デフォルトはカメラの位置）

    for(int i=0; i<16; i++){
        distance = distanceFunc(rPos);
        rLen += distance;
        rPos = cPos + ray * rLen;
    }

    //衝突判定(衝突したら、その時点で距離は伸びなくなるという考え)
    if(abs(distance) < 0.001){
        gl_FragColor = vec4(vec3(1.0), 1.0);
    }
    else{
        gl_FragColor = vec4(vec3(0.0), 1.0);
    }

}

