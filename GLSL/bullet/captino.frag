//改造⇒渦巻く感じ
//http://glslsandbox.com/e#71136.0
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;
uniform int rand;

const float COUNT = 30.0;

void main(void){

    vec2 uPos = ( gl_FragCoord.xy / resolution.y);      //ピクセル座標をy軸で正規化
    uPos -= vec2( (resolution.x / resolution.y) / 2.0 , 0.5);   //原点を中心に移動

    float vertColor = 0.0;

    for(float i=0.0; i<COUNT; i++){
        float t = (frameCount * 0.0001) + ( i + 0.3 );

        uPos.y += sin( t + uPos.x) * 0.1;   //yを少しずらし

        uPos.x += abs(tan( -t + uPos.y + cos(t/1.0))) * 0.15;   //x 0～π / 0.15  yに依存

        float value = sin(uPos.x * 10.0) + uPos.y * 5.1;

        float stripColor = 1.0 / length(uPos) + sqrt(abs(value));

        vertColor += stripColor / 50.0;
    }

    float temp = vertColor;
    vec3 color = vec3( temp * 0.2, temp * 0.4, temp * 0.8);
    gl_FragColor = vec4(vec3(color),1.0);


    //弾幕当たり判定
    //if(col > 0.0){
    //    if( m.x - 0.006 <= p.x &&  p.x <= m.x + 0.006 ){
    //        if( m.y - 0.006 <= p.y &&  p.y <= m.y + 0.006 ){
    //            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);        //当たったら自機位置のαを0にしておいて、アプリ側で判定
    //        }
    //    }
    //}

}