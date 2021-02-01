//レイマーチング
//(原理の参考)https://wgld.org/d/glsl/g008.html

#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;

void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

    vec3 cPos = vec3(0.0, 0.0, 3.0);      //カメラの位置
    vec3 cDir = vec3(0.0, 0.0, -1.0);     //カメラの視線
    vec3 cUp = vec3(0.0, 1.0, 0.0);       //カメラの上方向
    vec3 cSide = cross(cDir,cUp);       //外積を使ってカメラの横方向を算出  (今だと1,0,0だね)
    float targetDepth = 0.1;            //フォーカスする深度

    //レイを定義
    vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);     //カメラ横方向 * x + カメラ上方向 * y + カメラ視線方向 * z で、「各ピクセル位置へ向かうレイ」が定義できる

    gl_FragColor = vec4(ray.xy, -ray.z,1.0);
}

