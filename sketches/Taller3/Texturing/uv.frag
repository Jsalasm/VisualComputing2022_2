precision highp float;
varying vec2 texcoords2;
uniform float x;

void main() {
  vec2 newtex = (texcoords2 + 1.) / 2.;
  gl_FragColor = vec4(vec3(newtex,x),1.0);
}
