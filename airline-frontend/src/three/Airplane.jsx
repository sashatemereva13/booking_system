import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ExhaustMaterial } from "./shaders/ExhaustShader";
import { extend } from "@react-three/fiber";

extend({ ExhaustMaterial });

export default function Airplane(props) {
  const planeRef = useRef();

  const { scene } = useGLTF("/models/airplane.glb");

  // ── PLANE PATH ───────────────────────────────
  const startPos = new THREE.Vector3(5, -2.8, 5.5);
  const cruisePos = new THREE.Vector3(0, 0, -3);

  // ── CONTRAIL TUBE SETTINGS (STATIC FOR NOW) ──
  const tubeLength = 10;
  const tubeRadius = 0.05;
  const leftTubeRef = useRef();
  const rightTubeRef = useRef();

  // 🔴 THESE ARE THE ONLY VALUES YOU TUNE NOW
  const leftTubePos = new THREE.Vector3(3, 0, 0.15);
  const rightTubePos = new THREE.Vector3(3, 0, -0.05);

  useFrame((state) => {
    if (!planeRef.current) return;

    /* ── PLANE ANIMATION ───────────────────── */
    planeRef.current.position.lerp(cruisePos, 0.05);
    planeRef.current.scale.lerp(new THREE.Vector3(0.5, 0.5, 0.5), 0.03);

    planeRef.current.rotation.x = THREE.MathUtils.lerp(
      planeRef.current.rotation.x,
      Math.PI / 10,
      0.05
    );
    planeRef.current.rotation.y = THREE.MathUtils.lerp(
      planeRef.current.rotation.y,
      -Math.PI / 3,
      0.05
    );
    planeRef.current.rotation.z = THREE.MathUtils.lerp(
      planeRef.current.rotation.z,
      -0.06,
      0.05
    );

    // ── CONTRAIL TUBE GROWTH ─────────────────
    const growthSpeed = 0.02;
    const maxLength = 6;

    if (leftTubeRef.current && rightTubeRef.current) {
      // grow in local Z
      leftTubeRef.current.scale.z = Math.min(
        leftTubeRef.current.scale.z + growthSpeed,
        maxLength
      );
      rightTubeRef.current.scale.z = Math.min(
        rightTubeRef.current.scale.z + growthSpeed,
        maxLength
      );

      // shift backward so growth happens OUTWARD
      leftTubeRef.current.position.z =
        leftTubePos.z - (leftTubeRef.current.scale.z - 1) * tubeLength * 0.5;

      rightTubeRef.current.position.z =
        rightTubePos.z - (rightTubeRef.current.scale.z - 1) * tubeLength * 0.5;
    }

    const t = state.clock.elapsedTime;

    if (leftTubeRef.current) {
      leftTubeRef.current.material.uTime = t;
    }
    if (rightTubeRef.current) {
      rightTubeRef.current.material.uTime = t;
    }
  });

  return (
    <group ref={planeRef} position={startPos} {...props}>
      {/* PLANE */}
      <primitive object={scene} />

      {/* LEFT CONTRAIL TUBE (STATIC, ATTACHED) */}
      <mesh position={leftTubePos} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[tubeRadius, tubeRadius, tubeLength, 8]} />
        <exhaustMaterial
          transparent
          depthWrite={false}
          uOpacity={0.9}
          uNoiseScale={4.0}
          uFadePower={2.2}
        />
      </mesh>

      {/* RIGHT CONTRAIL TUBE (STATIC, ATTACHED) */}
      <mesh position={rightTubePos} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[tubeRadius, tubeRadius, tubeLength, 8]} />
        <exhaustMaterial
          transparent
          depthWrite={false}
          uOpacity={0.9}
          uNoiseScale={4.0}
          uFadePower={2.2}
        />
      </mesh>
    </group>
  );
}
