import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float starGrid(vec2 uv, float cells, float density, float size, float timeScale) {
    vec2 grid = uv * cells;
    vec2 id = floor(grid);
    vec2 cell = fract(grid) - 0.5;
    float seed = hash21(id);
    vec2 offset = vec2(hash21(id + 7.17), hash21(id + 19.93)) - 0.5;
    float distanceToStar = length(cell - offset * 0.72);
    float core = smoothstep(size, 0.0, distanceToStar);
    float twinkle = 0.72 + 0.28 * sin(uTime * timeScale + seed * 37.0);
    return core * step(1.0 - density, seed) * twinkle;
  }

  void main() {
    vec2 uv = vUv;
    float tiny = starGrid(uv, 320.0, 0.23, 0.13, 0.8);
    float medium = starGrid(uv + vec2(0.117, 0.263), 180.0, 0.12, 0.12, 1.15);
    float bright = starGrid(uv + vec2(0.431, 0.071), 90.0, 0.045, 0.11, 0.55);
    float seed = hash21(floor(uv * 320.0));
    vec3 tint = mix(vec3(0.72, 0.81, 1.0), vec3(1.0, 0.91, 1.0), seed * 0.55);
    vec3 stars = tint * (tiny * 2.8 + medium * 4.4 + bright * 7.0);
    vec3 space = vec3(0.005, 0.003, 0.012);
    gl_FragColor = vec4(space + stars, 1.0);
  }
`;

export class StarMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: { uTime: { value: 0 } },
      side: THREE.DoubleSide,
      depthTest: true,
      depthWrite: true,
      toneMapped: false,
    });
  }
}
