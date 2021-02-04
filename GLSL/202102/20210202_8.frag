//オブジェクトをねじる
//(原理の参考)https://wgld.org/d/glsl/g013.html

#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;

const float sphereSize = 1.0; // 描画する球の半径
const vec3 lightDir = vec3(-0.577, 0.577, 0.577);   //光源の角度(左上から照らす)
//const vec3 lightDir = vec3(0.0, 0.0, 1.0);   //光源の角度(正面から照らす)

const float PI = 3.14159265;
const float angle = 60.0;       //視野角(上下左右ともに、という話だと思う)
const float fov = angle * 0.5 * PI / 180.0;     //視野角の半分をラジアン単位に換算
vec3 cPos = vec3(0.0, 0.0, 3.0);      //カメラの位置

//オブジェクトの複製 p:レイの先端座標
vec3 trans(vec3 p){
    //return mod(p,4.0) - 2.0;      //modを使うことによって、pの中身が何であっても0~3.999…にクランプされる。2を引くことで、-2～1.9999…の範囲になる
    return mod(p,6.0) - 3.0;
}

//補間関数
float smoothMin(float d1, float d2, float k){
    float h = exp(-k * d1) + exp(-k * d2);
    return -log(h) / k;
}

//オブジェクトの回転
// p:レイの先端座標、angle:回転角度、
//axis:どの軸に対して、どの程度回転を加えるか ( 例えばX軸を100%として、Y軸はその半分、Z軸は回転しないなら (1.0,0.5,0.0) と指定)  ※angleに対して100%という意味よね？
vec3 rotate(vec3 p, float angle, vec3 axis){
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    //↓wikiさんで「任意の軸周りの回転行列」を調べてね
    mat3 m = mat3(
        a.x * a.x * r + c,
        a.y * a.x * r + a.z * s,
        a.z * a.x * r - a.y * s,
        a.x * a.y * r - a.z * s,
        a.y * a.y * r + c,
        a.z * a.y * r + a.x * s,
        a.x * a.z * r + a.y * s,
        a.y * a.z * r - a.x * s,
        a.z * a.z * r + c    );
    return m * p;    
}

//オブジェクトのねじり
// p:レイの先端座標、 power:ねじりの強さ
vec3 twist(vec3 p, float power){
   float s = sin(power * p.y);  
   float c = cos(power * p.y);
   
   //これはy軸周りの回転行列。つまり、y軸周り回転の度合いが場所により変化することによって、ねじれているように見える
   mat3 m = mat3(
       c, 0.0,  -s,
       0.0, 1.0, 0.0,
       s, 0.0,   c        
   );

   return m * p;

}


//球の距離関数 p:レイの先端座標
float shere_distanceFunc(vec3 p){
    return length(trans(p)) - sphereSize;
}

//ボックスの距離関数  p:レイの先端座標
float box_distanceFunc(vec3 p){
    vec3 q = abs(trans(p));
    return length( max(q - vec3(1.0,0.2,1.0) , 0.0 ));
}

//角丸ボックスの距離関数  p:レイの先端座標
float roundbox_distanceFunc(vec3 p){
    vec3 q = abs(p);
    return length( max(q - vec3(2.0,0.1,0.5) , 0.0 )) - 0.1;    //0.1減算によって、ホントはボックスの角に当たってないレイが、当たってる判定される。結果として角が取れてボックスが膨らむ
}

//トーラス（ドーナツ型）の距離関数 p:レイの先端座標
// (xy平面に展開)
float torus_distanceFunc(vec3 p){
    vec2 t = vec2(1.5 , 0.25);         //( x:トーラスの中心からどれくらいの距離を置いてパイプを作るか⇒ドーナツの穴の半径 , y:トーラスのパイプの半径⇒ドーナツ本体の断面図の半径)
    vec2 r = vec2(length(p.xy) - t.x , p.z);    // r = レイの先端から、トーラスのパイプの中心への距離
    return length(r) - t.y;
}

//床の距離関数 p:レイの先端座標
float floor_distanceFunc(vec3 p){
    return dot( p , vec3(0.0 , 1.0, 0.0) ) + 1.0;       //vec3(0,1,0)は面法線。例えばこれだと、内積計算の結果p.yのデータだけが残る。+1.0は、床の位置を示すオフセット（p.y = -1のとき衝突と判定される）
}

//シリンダー（円柱）の距離関数 p:レイの先端座標、r.x:円柱の円の半径  r.y:円柱の長さ
//xy平面上に描画
float cylinder_distanceFunc(vec3 p,vec2 r){
    vec2 d = abs( vec2( length(p.xy) , p.z) ) - r;
    //vec2 d = abs( vec2( length(p.xy) , p.z) ) - vec2(r.x,r.y/2);
    return min(max(d.x,d.y),0.0) + length(max(d,0.0)) - 0.1;
    //return length(max(d,0.0)) - 0.1;
}


//複数のオブジェクトを普通の見え方？で描画するための距離関数(和集合の効果)
float distFunc_Union(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    return min(d1,d2);
}

//複数のオブジェクトを普通の見え方？で描画するための距離関数(和集合の効果) + スムーズ化 + 回転
float distFunc_Union_Smooth(vec3 p){
    //vec3 q = rotate(p, radians(frameCount * 0.07), vec3(1.0, 0.5, 0.0) );
    vec3 q = twist(p,3.0);

    float d1 = torus_distanceFunc(q);
    float d2 = roundbox_distanceFunc(q);
    float d3 = cylinder_distanceFunc(q,vec2(0.5 , 0.5));    
    return smoothMin(smoothMin(d1,d2,16.0), d3, 16.0);
}

//複数のオブジェクトの重なり合う部分だけを描画するための距離関数(積集合の効果)
float distFunc_Intersection(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    return max(d1,d2);
}

//複数のオブジェクトのうち、d1のみを描画（重なってる部分は描画しない）
float distFunc_Either1(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    //return min(d1,d2) - max(d1,d2);
    //return max(d1,d2) - min(d1,d2);
    if(d1 <= d2){
        return d1;
    }else{
        return 0.5;
    }
}

//複数のオブジェクトのうち、d2のみを描画（重なってる部分は描画しない）
float distFunc_Either2(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    //return min(d1,d2) - max(d1,d2);
    //return max(d1,d2) - min(d1,d2);
    if(d2 <= d1){
        return d2;
    }else{
        return 0.5;
    }
}

//複数のオブジェクトのうち、どっちかのみを描画（重なってる部分は描画しない）
float distFunc_Either(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    //return max(-d1, d2); // d1が重なっていないd2部分を描く(絶対d2しか返らない)
    return max(d1, -d2); // d2が重なっていないd1部分を描く(絶対d1しか返らない)
}

//よくわからんけど、芸術的な感じになるよ
float distFunc_Omake(vec3 p){
    float d1 = torus_distanceFunc(p);
    float d2 = roundbox_distanceFunc(p);
    //return min(d1,d2) - max(d1,d2);
    return max(d1,d2) - min(d1,d2);
}

//法線算出関数 p:レイとオブジェクトの交点の座標位置  
vec3 getNormal(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        distFunc_Union_Smooth(p + vec3(  d, 0.0, 0.0)) - distFunc_Union_Smooth(p + vec3( -d, 0.0, 0.0)),
        distFunc_Union_Smooth(p + vec3(0.0,   d, 0.0)) - distFunc_Union_Smooth(p + vec3(0.0,  -d, 0.0)),
        distFunc_Union_Smooth(p + vec3(0.0, 0.0,   d)) - distFunc_Union_Smooth(p + vec3(0.0, 0.0,  -d))
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

    for(int i=0; i<256; i++){
        distance = distFunc_Union_Smooth(rPos);
        rLen += distance;
        rPos = cPos + ray * rLen * 0.75;        //レイがオブジェクトを突き抜けて、さらに別のオブジェクトを認識しちゃって、突き抜けたオブジェクトを無視する問題のため、継ぎ足すレイの長さに0.75掛け
        
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

//「ドーナツの穴ぼこは存在か空白か？」と、
//だれかが言ってた。美しい言葉。
//ぼくの抱える穴が、意味のある存在だったら、
//どんなにいいだろう。救われるよ。


//いつの間にか地面に映った
//影が伸びて解らなくなった
//赤黄色の金木犀の
//香りがしてたまらなくなって
//何故か無駄に 胸が騒いでしまう帰り道
