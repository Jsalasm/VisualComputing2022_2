precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;
uniform int blendTool;

void main() {
  if(blendTool == 0){
    gl_FragColor = brightness * (uMaterial1 * uMaterial2);
  }
  else if(blendTool == 1){
    gl_FragColor = brightness * (uMaterial1 + uMaterial2);
  }
  else if(blendTool == 2){
    gl_FragColor = brightness * (max(uMaterial1, uMaterial2) - min(uMaterial1, uMaterial2));
  }
  /*else if(blendTool == 3){
    gl_FragColor = brightness * (uMaterial1 / uMaterial2);
  }*/
  else if(blendTool == 3){
    gl_FragColor = brightness * min(uMaterial1, uMaterial2);
  }
  else{
    gl_FragColor = brightness * max(uMaterial1, uMaterial2);
  }

}