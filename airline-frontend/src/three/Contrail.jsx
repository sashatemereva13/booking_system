import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function Contrail({ targetRef, length = 80 }) {
  const lineRef = useRef();
  const points = useRef([]);

  useFrame(() => {
    if (!targetRef.current) return;

    // get plane world position
    const pos = new THREE.Vector3();
    targetRef.current.getWorldPosition(pos);

    // push new point
    points.current.unshift(pos.clone());

    // limit trail length
    if (points.current.length > length) {
      points.current.pop();
    }

    // update geometry
    if (lineRef.current) {
      lineRef.current.geometry.setFromPoints(points.current);
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.35}
        linewidth={1}
      />
    </line>
  );
}
