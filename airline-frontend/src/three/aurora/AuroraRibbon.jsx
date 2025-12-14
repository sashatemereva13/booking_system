import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { auroraVertex, auroraFragment } from "../shaders/auroraShader";

export default function AuroraRibbon({
  position = [0, 40, -120],
  scale = [1, 1, 1],
  speed = 1,
  opacity = 0.6,
}) {
  const mat = useRef();

  useFrame((_, delta) => {
    mat.current.uniforms.uTime.value += delta * speed;
  });

  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[20, 120, 32, 128]} />
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uOpacity: { value: opacity },
          uColorA: { value: new THREE.Color("#6fffc1") },
          uColorB: { value: new THREE.Color("#ff9ad5") },
          uColorC: { value: new THREE.Color("#a78bfa") },
        }}
        vertexShader={auroraVertex}
        fragmentShader={auroraFragment}
      />
    </mesh>
  );
}
