import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

interface MagnetViewer3DProps {
  shape?: 'round' | 'rectangle' | 'heart';
  customText?: string;
  imageUrl?: string;
  autoRotate?: boolean;
  zoom?: number;
  rotation?: { x: number; y: number; z: number };
}

function MagnetMesh({ shape = 'round', imageUrl, autoRotate, zoom = 1, rotation = { x: 0, y: 0, z: 0 } }: MagnetViewer3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load texture if image is provided
  const texture = useMemo(() => {
    if (imageUrl) {
      const loader = new THREE.TextureLoader();
      const tex = loader.load(imageUrl);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }
    return null;
  }, [imageUrl]);

  // Auto-rotate animation
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const getMeshGeometry = () => {
    switch (shape) {
      case 'rectangle':
        return <boxGeometry args={[2 * zoom, 1.5 * zoom, 0.2]} />;
      case 'heart':
        return <sphereGeometry args={[1 * zoom, 32, 32]} />;
      case 'round':
      default:
        return <cylinderGeometry args={[1 * zoom, 1 * zoom, 0.2, 32]} />;
    }
  };

  return (
    <mesh 
      ref={meshRef}
      castShadow 
      receiveShadow 
      rotation={[Math.PI / 2 + rotation.x, rotation.y, rotation.z]}
    >
      {getMeshGeometry()}
      <meshStandardMaterial
        map={texture}
        color={texture ? "#ffffff" : "#e91e63"}
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

export function MagnetViewer3D({ shape = 'round', customText, imageUrl, autoRotate = false, zoom = 1, rotation }: MagnetViewer3DProps) {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden glass-card">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#ff6b9d" />
        <spotLight position={[0, 5, 0]} intensity={0.5} angle={0.3} penumbra={1} />
        
        {/* 3D Magnet */}
        <Suspense fallback={<LoadingFallback />}>
          <MagnetMesh 
            shape={shape} 
            customText={customText} 
            imageUrl={imageUrl}
            autoRotate={autoRotate}
            zoom={zoom}
            rotation={rotation}
          />
        </Suspense>
        
        {/* Environment for reflections */}
        <Environment preset="sunset" />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          enableDamping
          dampingFactor={0.05}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}
