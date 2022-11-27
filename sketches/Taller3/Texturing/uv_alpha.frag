precision highp float;
varying vec2 texcoords2;
varying vec4 color4;
uniform float x;
uniform float opacity;

void main() {
  vec2 newtex = (texcoords2 + 1.) / 2.;
  gl_FragColor = vec4(vec3(newtex,x),opacity);
}