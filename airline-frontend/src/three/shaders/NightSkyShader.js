import * as THREE from "three";

export const NightSkyShader = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
  },

  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    precision highp float;

    uniform float uTime;
    varying vec2 vUv;

    // simple hash for stars
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    void main() {
      vec2 uv = vUv;

      // ── SKY GRADIENT ─────────────────────────────
      vec3 topColor = vec3(0.02, 0.04, 0.10);   // deep night blue
      vec3 horizonColor = vec3(0.06, 0.08, 0.15);

      float gradient = smoothstep(0.0, 0.7, uv.y);
      vec3 sky = mix(horizonColor, topColor, gradient);

      // ── ATMOSPHERIC GLOW (horizon band) ─────────
      float glow = smoothstep(0.0, 0.25, uv.y);
      sky += vec3(0.02, 0.03, 0.06) * (1.0 - glow);

     // ── STARS (randomly scattered) ─────────────────
vec2 starUV = uv * 300.0;

vec2 id = floor(starUV);
vec2 cell = fract(starUV);

// random offset per cell
vec2 jitter = vec2(
  hash(id + 1.3),
  hash(id + 7.1)
) - 0.5;

// shift star position randomly
vec2 starPos = cell - 0.5 + jitter * 0.6;

// random star properties
float starRand = hash(id + 4.7);
float starSize = mix(0.01, 0.025, starRand);

// draw star
float star = smoothstep(
  starSize,
  starSize * 0.4,
  length(starPos)
);

// subtle twinkle
star *= 0.7 + 0.3 * sin(uTime + starRand * 12.0);
star *= mix(0.5, 1.2, starRand);
if (starRand > 0.995) {
  star *= 2.5;
}


// fade near horizon (realistic atmosphere)
float horizonFade = smoothstep(0.1, 0.35, uv.y);
star *= horizonFade;

sky += star * vec3(1.0);


      gl_FragColor = vec4(sky, 1.0);
    }
  `,
};
