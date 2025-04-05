import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  name: string;
  color?: string;
}

interface TechnologyHelixProps {
  skills: Skill[];
  radius?: number;
  heightStep?: number;
  rotationSpeed?: number;
}

export const TechnologyHelix: React.FC<TechnologyHelixProps> = ({
  skills,
  radius = 4,
  heightStep = 0.5,
  rotationSpeed = 0.005
}) => {
  const group = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += rotationSpeed;
    }
  });

  // Position items in a helix
  const getPositionOnHelix = (index: number, total: number): [number, number, number] => {
    const angle = (index / total) * Math.PI * 2 * 2; // Spread over two full rotations
    const y = (index - total / 2) * heightStep; // Center the helix vertically
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    return [x, y, z];
  };

  return (
    <group ref={group}>
      {skills.map((skill, i) => {
        const position = getPositionOnHelix(i, skills.length);
        return (
          <group key={skill.name} position={position}>
            {/* Optionally add Icons later instead of Text */}
            <Text
              fontSize={0.6}
              color={skill.color || '#ffffff'}
              anchorX="center"
              anchorY="middle"
              rotation={[0, -Math.atan2(position[2], position[0]) - Math.PI/2, 0]} // Rotate text to face outwards
            >
              {skill.name}
            </Text>
            {/* Add a small glowing point light near each text */}
            <pointLight 
              position={[0, 0, 0.2]} 
              intensity={0.5} 
              distance={2} 
              color={skill.color || '#00aaff'} 
            />
          </group>
        );
      })}
    </group>
  );
};

export default TechnologyHelix; 