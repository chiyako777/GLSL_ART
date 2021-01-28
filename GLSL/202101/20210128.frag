//花を描く
#version 120

uniform vec2 resolution;
uniform vec2 mouse;
uniform int frameCount;


void main(void){
	//vec2 m = vec2(mouse.x * 2.0 - 1.0,-(mouse.y * 2.0 - 1.0));		//マウス座標(0～1)を-1～1の範囲に直す（左上最小）

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;		// ピクセル座標を -1 ～ 1 の間に正規化（左下最小）

	vec2 m = vec2(0,0);

	//float color = 0.01 / abs(0.8 * sin(atan(p.x,p.y) * 10) - length(m-p));			
							//(1) ある値から距離を減算した絶対値で、除算。その距離に近づくほど、除算結果が限りなく大きくなっていく。（=白くなる）
							//    lengthを減算する対象の数値に、アークタンジェントの定数倍のsinを掛ける
							//    そうすることで、「距離」の長さが短い周期で増減し、花の形の模様になる

	//float color = 0.01 / abs(0.8 * sin(atan(p.x,p.y) * 10) * sin(frameCount * 0.0005) - length(m-p));			
							//(2) (1)から、lengthを減算する対象の数値にフレームカウントのsinを掛けて、花の大きさが変化するようにする

	float color = 0.01 / abs(0.8 * sin(atan(p.x,p.y) * 10) - length(m-p) * sin(atan(p.x,p.y) * 10));
							//(3) (2)・(4)の合わせ掛け
							//    まずは(4)のレンダリング結果が真ん中にギュッと詰まる感じになって、細い放射線状になる
							//    また、距離と減算値に掛け合わせる係数が同じだからリングも生き残る
	
	//float color = 0.01 / abs(0.8  - length(m-p) * sin(atan(p.x,p.y) * 10));
							//(4) 減算するlength側に、アークタンジェント定数倍のsinを掛ける。距離が0.8近いのに明るくならないところや、距離が0.8より遠いのにアークタンジェント定数倍sinの値がうまくハマって結果的に明るくなるところとかが現れる


	gl_FragColor = vec4(vec3(color),1.0);

}
