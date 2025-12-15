export const auroraVertex = `
varying vec2 vUv;
varying float vY;

void main() {
vUv = uv;
vY = position.y;
vec3 pos = position;

// slight vertical wave
pos.x += sin(position.y * 0.05 + uv.y * 4.0) * 0.5;

gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const auroraFragment = `
uniform float uTime;
uniform float uOpacity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

varying vec2 vUv;
varying float vY;


// simple noise
float rand(vec2 co) {
return fract(sin(dot(co.xy , vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
float y = vUv.y;

// flowing noise
float n = rand(vec2(vUv.x * 5.0, vUv.y * 5.0 + uTime * 0.1));
float wave = sin(y * 12.0 + uTime * 0.8) * 0.1;

float mask = smoothstep(0.0, 0.2, y) * smoothstep(1.0, 0.7, y);
float intensity = mask + wave + n * 0.15;

vec3 color = mix(uColorA, uColorB, y);
color = mix(color, uColorC,n);

gl_FragColor= vec4(color, intensity * uOpacity);

}
`;
