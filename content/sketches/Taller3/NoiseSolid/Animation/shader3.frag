precision mediump float;
varying vec2 vTexCoord;

varying vec3 vNoise;
uniform sampler2D uNoiseTexture;

void main() {
 vec4 color = texture2D(uNoiseTexture, vTexCoord);

  gl_FragColor = color;
}