import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { NightSkyShader } from "../shaders/nightSkyShader";
import { useRef } from "react";
import * as THREE from "three";

const NightSkyMaterial = shaderMaterial(
  NightSkyShader.uniforms,
  NightSkyShader.vertexShader,
  NightSkyShader.fragmentShader
);

extend({ NightSkyMaterial });

export function NightSky() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh scale={50}>
      <sphereGeometry args={[1, 64, 64]} />
      <nightSkyMaterial ref={ref} side={THREE.BackSide} />
    </mesh>
  );
}
