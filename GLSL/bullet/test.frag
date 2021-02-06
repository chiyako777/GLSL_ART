//四角がぐるぐるする(弾幕にしてはアレだけど、まあ何かのネタになれば・・)
//http://glslsandbox.com/e#70871.6
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
uniform int rand;

const float PI = 3.14159265;


float map(vec2 p, float r) {
	float d = length(p*p) - r;
	return d;
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


void main(void){

    vec2 point = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）
    vec2 m = (mouse.xy * 2.0 - resolution) / resolution;		// マウスピクセル座標を -1 ～ 1 の間に正規化（左下最小）

    for(int i=0; i<2; i++){
        p *= 2.0;
        p.x = rotate( vec3(p.x,p.y,0.0), (float(i) * 1.218) + (frameCount * 0.0003),vec3(0.0,0.0,1.0) ).x;
        p.y = rotate( vec3(p.x,p.y,0.0), (float(i) * 1.218) + (frameCount * 0.0003),vec3(0.0,0.0,1.0) ).y;
        p = abs(p) * 2.0 - 1.0;
    }

    float d = map(p , 1.0);
    d = min(d,0.0);
    gl_FragColor = vec4( 0.0 , 0.0 , -d , 1.0);

    //弾幕当たり判定
    if(d < -0.1){
        if( m.x - 0.006 <= point.x &&  point.x <= m.x + 0.006 ){
            if( m.y - 0.006 <= point.y &&  point.y <= m.y + 0.006 ){
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);        //当たったら自機位置のαを0にしておいて、アプリ側で判定
            }
        }
    }

}