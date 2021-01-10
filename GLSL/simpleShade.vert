//簡単な陰影付け

#version 120

invariant gl_Position;
attribute vec3 position;
uniform mat4 projectionMatrix;
varying vec3 diffuseColor;

void main(void){
	//シェーディング対象が、半径1の単位球なので、頂点座標をそのままその点における法線ベクトルとして使う
	//光源ベクトルがデフォルトの(0,0,1)とすると、法線ベクトルと光源ベクトルの内積は頂点のz座標と一致する
	//頂点のz座標値を拡散反射色(diffuseColor)として設定することとする

	diffuseColor = vec3(position.z);		// [ position.z , position.z , position.z ]  
	gl_Position = projectionMatrix * vec4(position,1.0);
	

}
