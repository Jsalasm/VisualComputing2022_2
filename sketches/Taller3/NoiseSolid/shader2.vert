
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


  float tile = 2.0; //limite del ruido
  float speed = 0.002;//velocidad de ruido en el tiempo, segun los frames que lleve el cuerpo
  vec4 noise = texture2D(uNoiseTexture, fract(aTexCoord * tile + uFrameCount * speed));

  //manda el ruido al fragment 
  vNoise = noise.rgb;
  
  float frequency = 20.0; //frecuencia del sinosoide
  float amplitude = 0.1; //amplitud del sinosoide


  vec4 positionVec4 = vec4(aPosition, 1.0);
  // aqui ya es la distorcion con ayuda de la funcion seno
  float distortion = sin(positionVec4.x * frequency + uFrameCount * 0.1);



  // se varia respecto a la amplitud que definimos anteriormente y la distorsion
  //que constituye el movimiento sinosoidal
  positionVec4.x += distortion * aNormal.x * amplitude;

  // para este caso en el cambio de las posiciones de los vertices debe tener un orden
  // para este caso proyeccion, vista, modelo, posicion.
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  vTexCoord = aTexCoord;
}