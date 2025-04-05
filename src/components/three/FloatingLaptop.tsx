import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingLaptop: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const screenRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Make the laptop float up and down slowly
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
      meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }
    
    // Glow effect for the screen
    if (screenRef.current && screenRef.current.material instanceof THREE.MeshStandardMaterial) {
      screenRef.current.material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Laptop base */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 0.08, 1]} />
        <meshStandardMaterial 
          color="#333" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
        
      {/* Laptop screen */}
      <group position={[0, 0.6, -0.45]} rotation={[Math.PI / 6, 0, 0]}>
        <mesh ref={screenRef}>
          <boxGeometry args={[1.4, 0.8, 0.05]} />
          <meshStandardMaterial 
            color="#222" 
            emissive="#0066ff" 
            emissiveIntensity={0.5} 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};

export default FloatingLaptop; 