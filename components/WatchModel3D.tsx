"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { Group } from "three";

function WatchMesh() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/3DWatchModel.glb");
  const isDragging = useRef(false);

  useFrame((state) => {
    if (!group.current || isDragging.current) return;
    group.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.04;
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1} />
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.01]} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
}

export default function WatchModel3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 2.5], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 2, -3]} intensity={0.4} />
      <Suspense fallback={<Loader />}>
        <WatchMesh />
        <Environment preset="studio" />
        <ContactShadows position={[0, -0.7, 0]} opacity={0.2} scale={4} blur={2} />
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
