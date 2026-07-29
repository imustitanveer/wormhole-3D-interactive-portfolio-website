import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec3 vWorldStarDirection;

  void main() {
    vWorldStarDirection = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec3 vWorldStarDirection;

  float hash13(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  void main() {
    vec3 p = normalize(vWorldStarDirection) * 260.0;
    vec3 cell = floor(p);
    vec3 localPosition = fract(p) - 0.5;
    float seed = hash13(cell);
    vec3 starOffset = vec3(
      hash13(cell + vec3(17.1, 3.7, 11.9)),
      hash13(cell + vec3(5.3, 19.7, 7.1)),
      hash13(cell + vec3(13.7, 2.9, 23.3))
    ) - 0.5;
    float distanceToStar = length(localPosition - starOffset * 0.55);
    float brightStar = step(0.994, seed);
    float radius = mix(0.095, 0.16, brightStar);
    float antialiasWidth = clamp(fwidth(distanceToStar), 0.008, 0.045);
    float star = 1.0 - smoothstep(
      radius - antialiasWidth,
      radius + antialiasWidth,
      distanceToStar
    );
    star *= step(0.94, seed);

    float colorSeed = hash13(cell + vec3(29.1, 31.7, 37.3));
    vec3 coolWhite = mix(
      vec3(0.68, 0.78, 1.0),
      vec3(0.92, 0.82, 1.0),
      colorSeed
    );
    float brightness = mix(0.46, 0.9, hash13(cell + vec3(41.3))) + brightStar * 0.35;
    vec3 background = vec3(0.0015, 0.001, 0.004);

    gl_FragColor = vec4(background + coolWhite * star * brightness, 1.0);
  }
`;

export function WorldStars() {
  return (
    <mesh renderOrder={-10} frustumCulled={false}>
      <sphereGeometry args={[60, 64, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.BackSide}
        depthTest
        depthWrite={false}
        transparent={false}
        toneMapped={false}
      />
    </mesh>
  );
}
