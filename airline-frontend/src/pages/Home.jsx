import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Airplane from "../three/Airplane.jsx";
import Clouds from "../three/Clouds.jsx";
import ParallaxCamera from "../three/ParallaxCamera.jsx";
import PageTransition from "../components/PageTransition.jsx";
import Earth from "../three/Earth.jsx";
import { NightSky } from "../three/aurora/NightSkyMaterial.jsx";

export default function Home() {
  return (
    <PageTransition>
      <div
        className="
       h-full
      bg-dark text-plum 
      flex flex-col 
         items-center
    justify-between
p-16
      relative overflow-hidden font-primary
      px-6 text-center
    "
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <Canvas camera={{ position: [0, 2, 6], fov: 55 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 5, 3]} intensity={1.2} />
            <fog attach="fog" args={["#0A1A2F", 10, 40]} />

            <ParallaxCamera />

            <Earth />

            <NightSky />

            {/* <Clouds /> */}
            <Airplane />

            <Environment preset="sunset" />
          </Canvas>
        </div>
        {/* Background gradient wash */}
        <div
          className="
        absolute inset-0 pointer-events-none
        bg-gradient-to-b from-transparent via-brand/20 to-deep/40
      "
        ></div>

        {/* Soft ambient glows */}
        <div className="absolute w-[480px] h-[480px] bg-deep/30 rounded-full blur-[180px] -top-32 -left-24"></div>
        <div className="absolute w-[420px] h-[420px] bg-brand/25 rounded-full blur-[170px] bottom-10 right-10"></div>

        {/* Title */}
        <h1
          className="
drop-shadow-[0_0_10px_rgba(213,201,158,0.8)_0_0_25px_rgba(28,59,92,0.4)]
z-0 
        font-display text-5xl md:text-6xl lg:text-7xl 
        text-plum tracking-wide leading-tight 
      "
        >
          Fly <span className="text-plum font-[600]">Smarter</span>.<br />
          Fly <span className="text-gold">Timeout Airline</span>.
        </h1>

        {/* Subtitle */}
        <p
          className="
        mt-6 max-w-2xl text-[19px] 
        text-plum/70 leading-relaxed z-0
      "
        >
          A premium booking experience designed with precision, elegance, and
          comfort of the first-class journeys. Discover
          destinations—beautifully.
        </p>
      </div>
    </PageTransition>
  );
}
