import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const target = new Vector3();

export default function ParallaxCamera() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    target.set(mouse.x * 0.6, 1.5 + mouse.y * 0.4, 6);

    camera.position.lerp(target, 0.05);
    camera.lookAt(0, 1, 0);
  });

  return null;
}
