import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 2000,
  color = '#88ccff',
  size = 0.05
}) => {
  const mesh = useRef<THREE.Points>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  // Generate random particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      
      temp.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: 0,
        my: 0
      });
    }
    return temp;
  }, [count]);

  // Create positions for all particles
  const positions = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 50;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 50;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const mouseX = state.mouse.x * viewport.width / 2;
    const mouseY = state.mouse.y * viewport.height / 2;
    const interactionRadiusSq = 25;

    // Update particle positions for animation and mouse interaction
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      let { t } = particle;
      
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(1.5, Math.cos(t) * 5);
      
      if (mesh.current) {
        const currentPosition = new THREE.Vector3(
          mesh.current.geometry.attributes.position.array[i * 3],
          mesh.current.geometry.attributes.position.array[i * 3 + 1],
          mesh.current.geometry.attributes.position.array[i * 3 + 2]
        );

        const basePositionX = (xFactor + a) * factor;
        const basePositionY = (yFactor + b) * factor;
        const basePositionZ = (zFactor + a) * factor;

        let finalX = basePositionX;
        let finalY = basePositionY;

        // Calculate mouse repulsion
        const dx = currentPosition.x - mouseX;
        const dy = currentPosition.y - mouseY;
        const distSq = dx * dx + dy * dy;

        if (distSq < interactionRadiusSq) {
          const force = (interactionRadiusSq - distSq) / interactionRadiusSq;
          const len = Math.sqrt(distSq);
          if (len > 0.01) {
            const normX = dx / len;
            const normY = dy / len;
            const pushStrength = 1.5;
            finalX += normX * force * pushStrength;
            finalY += normY * force * pushStrength;
          }
        }

        dummy.position.set(
          finalX,
          finalY,
          basePositionZ
        );
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        
        mesh.current.geometry.attributes.position.array[i * 3] = dummy.position.x;
        mesh.current.geometry.attributes.position.array[i * 3 + 1] = dummy.position.y;
        mesh.current.geometry.attributes.position.array[i * 3 + 2] = dummy.position.z;
      }
    });
    
    if (mesh.current) {
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

export default ParticleField; 