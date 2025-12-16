import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

export const ExhaustMaterial = shaderMaterial(
  {
    uTime: 0,
    uOpacity: 0.5,
    uNoiseScale: 3.0,
    uFadePower: 1.8,
  },

  // vertex shader
  `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,

  // fragment shader
  `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uNoiseScale;
  uniform float uFadePower;

  // simple noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
  }

  void main() {
    // center fade (soft edges)
    float dist = distance(vUv.x, 0.5);
    float radial = pow(1.0 - dist * 2.0, uFadePower);

    // longitudinal fade (strong near engine)
    float lengthFade = smoothstep(0.0, 1.0, vUv.y);

    // animated noise
    float n = noise(vUv * uNoiseScale + vec2(0.0, uTime * 0.4));

    float alpha = radial * lengthFade * n * uOpacity;

    // soft white with slight blue tint
    vec3 color = vec3(1.0, 1.0, 1.05);

    gl_FragColor = vec4(color, alpha);
  }
  `
);
