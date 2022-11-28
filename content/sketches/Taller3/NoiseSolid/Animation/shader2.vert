

attribute vec3 aPosition;

attribute vec2 aTexCoord;

attribute vec3 aNormal;

uniform mat4 uProjectionMatrix;

uniform mat4 uModelViewMatrix;

uniform float uFrameCount;
uniform float uFrequency;
uniform float uAmplitud;

uniform sampler2D uNoiseTexture;

varying vec2 vTexCoord;
varying vec3 vNoise;


void main() {

  float tile = 2.0;
  float speed = 0.002;
  vec4 noise = texture2D(uNoiseTexture, fract(aTexCoord * tile + uFrameCount * speed));

  vNoise = noise.rgb;
  
  float frequency = uFrequency;
  float amplitude = uAmplitud;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  float distortion = sin(positionVec4.x * frequency + uFrameCount * 0.1);
 
  positionVec4.z += distortion * aNormal.z * amplitude;

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  vTexCoord = aTexCoord;
}