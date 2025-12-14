import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import * as THREE from "three";

export default function Airplane(props) {
  const group = useRef();

  const { scene } = useGLTF("/models/airplane.glb");

  const startPos = new Vector3(5, -2.8, 5.5);
  const cruisePos = new Vector3(0, 0, -3);

  useFrame((state, delta) => {
    if (!group.current) return;

    const t = state.clock.getElapsedTime();

    // intro animation fly in
    group.current.position.lerp(cruisePos, 0.005);
    group.current.scale.lerp(new Vector3(0.5, 0.5, 0.5), 0.03);

    // cinematic approach tilt
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.PI / 10,
      0.05
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      -Math.PI / 3,
      0.05
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -0.06,
      0.05
    );
  });

  return (
    <group ref={group} scale={0.5} position={startPos} {...props}>
      <primitive object={scene} />
    </group>
  );
}
