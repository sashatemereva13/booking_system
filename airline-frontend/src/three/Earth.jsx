import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Earth() {
  const earthRef = useRef();
  const [colorMap, bumpMap, cloudMap] = useLoader(THREE.TextureLoader, [
    "/maps/2k_earth_nightmap.jpg",
    "/maps/2k_earth_normal_map.png",
    "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
  ]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    earthRef.current.rotation.x = t * 0.01;
    earthRef.current.rotation.y = t * 0.01;
    earthRef.current.rotation.z = -t * 0.01;
  });

  return (
    <group ref={earthRef} position={[0, -13, -15]}>
      <mesh scale={[1.01, 1.01, 1.01]}>
        <sphereGeometry args={[15, 64, 64]} />
        <meshStandardMaterial
          map={cloudMap}
          opacity={0.4}
          transparent={true}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[15, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={bumpMap}
          bumpScale={0.3}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}
