import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

interface SceneManagerProps {
  children: React.ReactNode;
}

export const SceneManager: React.FC<SceneManagerProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    container: scrollRef 
  });

  // Camera control based on scroll
  useFrame(({ camera }) => {
    // Smoothly rotate camera based on scroll position
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      scrollYProgress.get() * Math.PI * 0.1, 
      0.05
    );
  });

  return (
    <group>
      {children}
    </group>
  );
};

export default SceneManager; 