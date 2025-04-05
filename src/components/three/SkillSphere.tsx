import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  name: string;
  position: [number, number, number];
  color?: string;
}

interface SkillSphereProps {
  skills: Skill[];
  radius?: number;
  rotationSpeed?: number;
}

export const SkillSphere: React.FC<SkillSphereProps> = ({
  skills,
  radius = 5,
  rotationSpeed = 0.001
}) => {
  const group = useRef<THREE.Group>(null!);
  
  // Create positions on a sphere
  const getPositionOnSphere = (index: number, total: number): [number, number, number] => {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    
    return [
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi)
    ];
  };

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += rotationSpeed;
      group.current.rotation.x += rotationSpeed * 0.5;
    }
  });

  return (
    <group ref={group}>
      {/* Sphere wireframe */}
      <mesh>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial color="#444" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Skills as text */}
      {skills.map((skill, i) => (
        <Text
          key={skill.name}
          position={skill.position || getPositionOnSphere(i, skills.length)}
          fontSize={0.5}
          color={skill.color || '#ffffff'}
          anchorX="center"
          anchorY="middle"
          renderOrder={1}
        >
          {skill.name}
        </Text>
      ))}
    </group>
  );
};

export default SkillSphere; 