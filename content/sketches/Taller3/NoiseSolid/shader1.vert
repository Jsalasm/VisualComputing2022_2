attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;
 
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform float uFrameCount;
uniform sampler2D uNoiseTexture;

varying vec2 vTexCoord;
varying vec3 vNoise;


void main() {
  vec4 noise = texture2D(uNoiseTexture, aTexCoord);
  vNoise = noise.rgb; // aqui simplemente no hay ningun ruido

  vec4 positionVec4 = vec4(aPosition, 1.0);

    
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;


  // Send the texture coordinates to the fragment shader
  vTexCoord = aTexCoord;
}