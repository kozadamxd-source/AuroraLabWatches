"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, OrbitControls, Center } from "@react-three/drei";
import { Group } from "three";

function WatchMesh() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/3DWatchModel.glb");

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.04;
  });

  return (
    <group ref={group}>
      {/* Center wycentruje model na podstawie jego bounding boxa */}
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export default function WatchModel3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 38 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, -3]} intensity={0.4} />
      <Suspense fallback={null}>
        <WatchMesh />
        <Environment preset="studio" />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.2} scale={5} blur={2.5} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.6}
        dampingFactor={0.08}
        enableDamping
      />
    </Canvas>
  );
}

useGLTF.preload("/3DWatchModel.glb");
