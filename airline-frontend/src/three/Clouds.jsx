import { Cloud } from "@react-three/drei";

export default function Clouds() {
  return (
    <>
      {/* Left cloud group */}
      <Cloud
        opacity={0.3}
        speed={0.2} // drift speed
        width={4} // cloud width
        depth={1.5} // cloud volume
        segments={10}
        position={[0, 2.5, -5]}
        color="#89A8C5"
      />

      {/* Right cloud group */}
      <Cloud
        opacity={0.25}
        speed={0.15}
        width={4}
        depth={1.2}
        segments={10}
        position={[-4, 2, -4]}
        color="#4C6E91"
      />

      {/* High altitude faint cloud */}
      <Cloud
        opacity={0.15}
        speed={0.1}
        width={5}
        depth={1.5}
        segments={8}
        position={[4, 2, 0]}
        color="#A7BED3"
      />
    </>
  );
}
