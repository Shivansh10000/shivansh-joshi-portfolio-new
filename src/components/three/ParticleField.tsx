import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
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

  useFrame(() => {
    // Update particle positions for animation
    particles.forEach((particle, i) => {
      const { factor, speed } = particle;
      let { t } = particle;
      
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(1.5, Math.cos(t) * 5);
      
      if (mesh.current) {
        dummy.position.set(
          (particle.xFactor + a) * factor,
          (particle.yFactor + b) * factor,
          (particle.zFactor + a) * factor
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