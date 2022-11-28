precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;

// holds the 3x3 kernel
uniform float mask[9];

// we need our interpolated tex coord
varying vec2 texcoords2;

// Mouse Coordenates
uniform vec2 mouseCoords;

// Resolution
uniform vec2 resolution;

// Brightness Tools
uniform int brightnessTool;

// Magnifier Tool
uniform bool magnifierTool;
uniform float magnifierRadius;
uniform float magnifierScale;

// Region Tool
uniform bool regionTool;

vec4 kernel() {
  vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
  vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);

  // origin (current fragment texcoords)
  vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
  vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
  vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
  vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

  // 2. Sample texel neighbours within the rgba array
  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);

  // 3. Apply convolution kernel
  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i]*mask[i];
  }

  // 4. Set color from convolution
  return vec4(convolution.rgb, 1.0);
}

/* ------------------------------------ */
/*         Brightness functions         */
/* ------------------------------------ */

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float mean(vec3 color) {
  return (color.r + color.g + color.b) / 3.0;
}

float hsv(vec3 color){
  return max(color.r, max(color.g, color.b));
}

float luminance(vec3 color) {
  return (max(color.r, max(color.g, color.b)) + min(color.r, min(color.g, color.b))) / 2.0;
}

vec4 changeBrightness(vec4 color) {

  if(brightnessTool == 0){
    return color;
  }
  else if(brightnessTool == 1){
    return vec4(vec3(luma(color.rgb)), 1.0);
  }
  else if(brightnessTool == 2){
    return vec4(vec3(mean(color.rgb)), 1.0);
  }
  else if(brightnessTool == 3){
    return vec4(vec3(hsv(color.rgb)), 1.0);
  }

  return vec4(vec3(luminance(color.rgb)), 1.0);
}


/* ------------------------------------ */
/*                 MAIN                 */
/* ------------------------------------ */

void main(){
  vec4 texel = texture2D(texture, texcoords2);

  if(!regionTool){
    texel = kernel();
    texel = changeBrightness(texel);
  }

  float dist = distance(gl_FragCoord.xy, mouseCoords);

  if (dist < magnifierRadius) {
    if(magnifierTool){

      vec2 magnifierCoords = mouseCoords + (gl_FragCoord.xy - mouseCoords) * magnifierScale;
      magnifierCoords = magnifierCoords / resolution;
      magnifierCoords = vec2(magnifierCoords.x, 1.0 - magnifierCoords.y);

      vec4 magnifierTexel = texture2D(texture, magnifierCoords);
      magnifierTexel = changeBrightness(magnifierTexel);

      gl_FragColor = magnifierTexel;

    }
    else if(regionTool){

      vec2 regionCoords = gl_FragCoord.xy;
      regionCoords = regionCoords / resolution;
      
      vec4 regionTexel = texture2D(texture, regionCoords);
      
      regionTexel = kernel();
      regionTexel = changeBrightness(regionTexel);
      gl_FragColor = regionTexel;

    }
    else{
      gl_FragColor = texel;
    }
  }
  else{
    gl_FragColor = texel;
  }

}