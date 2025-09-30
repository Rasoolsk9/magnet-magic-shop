import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

interface MagnetViewer3DProps {
  shape?: 'round' | 'rectangle' | 'heart';
  customText?: string;
}

function MagnetMesh({ shape = 'round', customText }: MagnetViewer3DProps) {
  const getMeshGeometry = () => {
    switch (shape) {
      case 'rectangle':
        return <boxGeometry args={[2, 1.5, 0.2]} />;
      case 'heart':
        // Simple heart approximation using sphere
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'round':
      default:
        return <cylinderGeometry args={[1, 1, 0.2, 32]} />;
    }
  };

  return (
    <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
      {getMeshGeometry()}
      <meshStandardMaterial
        color="#e91e63"
        metalness={0.3}
        roughness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 0.2]} />
      <meshBasicMaterial color="#ddd" />
    </mesh>
  );
}

export function MagnetViewer3D({ shape = 'round', customText }: MagnetViewer3DProps) {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden glass-card">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#ff6b9d" />
        
        {/* 3D Magnet */}
        <Suspense fallback={<LoadingFallback />}>
          <MagnetMesh shape={shape} customText={customText} />
        </Suspense>
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
