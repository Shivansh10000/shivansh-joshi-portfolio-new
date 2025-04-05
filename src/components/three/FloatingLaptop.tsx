import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingLaptop: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const screenRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

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

    // Mouse follow for the entire group
    if (groupRef.current) {
      const mouseX = state.mouse.x * viewport.width / 8;
      const mouseY = state.mouse.y * viewport.height / 8;
      
      // Smoothly interpolate group position towards mouse position
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouseX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouseY, 0.05);
      
      // Make it look slightly towards the mouse (subtle rotation)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.05, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.05, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
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