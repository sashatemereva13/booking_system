import AuroraRibbon from "./AuroraRibbon";

export default function AuroraSystem() {
  return (
    <>
      {[
        ...Array(4).map((_, i) => (
          <AuroraRibbon
            key={`back-${i}`}
            position={[i * 18 - 30, 40, -160]}
            speed={0.4}
            opacity={0.03}
          />
        )),
      ]}

      {[...Array(5)].map((_, i) => (
        <AuroraRibbon
          key={`mid-${i}`}
          position={[i * 16 - 32, 38, -120]}
          speed={0.7}
          opacity={0.1}
        />
      ))}

      {[...Array(3)].map((_, i) => (
        <AuroraRibbon
          key={`front-${i}`}
          position={[i * 20 - 20, 36, -90]}
          speed={1.0}
          opacity={0.2}
        />
      ))}
    </>
  );
}
