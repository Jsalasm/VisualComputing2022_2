precision mediump float;

uniform bool cmy;

varying vec4 color4;

void main() {
  gl_FragColor = cmy ? vec4((vec3(1.0) - color4.rgb), color4.a) : color4;
}