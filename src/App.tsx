import React, { useState, useRef, Suspense } from 'react';
import styled from 'styled-components';
import HomePage from './components/HomePage';
import Education from './components/Education';
import Experience from './components/Experience';
import Technologies from './components/Technologies';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, useProgress, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleField from './components/three/ParticleField';
import FloatingLaptop from './components/three/FloatingLaptop';
import SkillSphere from './components/three/SkillSphere';

// Loading screen component
function Loader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <LoadingContainer>
        <LoadingBar style={{ width: `${progress}%` }} />
        <LoadingText>{progress.toFixed(0)}% loaded</LoadingText>
      </LoadingContainer>
    </Html>
  );
}

// Skills data for the skill sphere
const skills = [
  { name: 'React', position: [0, 0, 0] as [number, number, number] },
  { name: 'TypeScript', position: [1, 1, 1] as [number, number, number] },
  { name: 'Three.js', position: [-1, 1, 0.5] as [number, number, number] },
  { name: 'JavaScript', position: [1, -1, 0.5] as [number, number, number] },
  { name: 'Node.js', position: [-1, -1, 1] as [number, number, number] },
  { name: 'CSS', position: [0.5, 1.5, -0.5] as [number, number, number] },
  { name: 'HTML', position: [-0.5, 1.5, 0.5] as [number, number, number] },
  { name: 'Git', position: [0.5, -1.5, -0.5] as [number, number, number] },
  { name: 'Redux', position: [-0.5, -1.5, -1] as [number, number, number] },
  { name: 'GraphQL', position: [1.5, 0, -1] as [number, number, number] },
];

const AppWrapper = styled.div`
  position: relative;
`;

const StyledCanvas = styled(Canvas)`
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: -1;
  background: linear-gradient(to bottom, #000428, #004e92);
`;

const ContentWrapper = styled(motion.main)`
  position: relative;
  z-index: 1;
  perspective: 1000px;
`;

const LoadingContainer = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 20px;
`;

const LoadingBar = styled.div`
  height: 10px;
  background: #00aaff;
  border-radius: 5px;
  width: 0%;
  transition: width 0.3s ease;
`;

const LoadingText = styled.div`
  margin-top: 10px;
  color: white;
  font-family: 'Courier New', monospace;
`;

const NavigationControls = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  z-index: 10;
`;

const NavButton = styled(motion.button)`
  background: rgba(0, 0, 0, 0.7);
  color: #00aaff;
  border: 2px solid #00aaff;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 170, 255, 0.2);
    transform: scale(1.05);
  }
`;

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const contentRef = useRef<HTMLDivElement>(null);
  
  const sections = ['home', 'education', 'experience', 'technologies'];
  
  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };
  
  return (
    <AppWrapper>
      {/* 3D Background with interactive elements */}
      <StyledCanvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 75 }}>
        <Suspense fallback={<Loader />}>
          <fog attach="fog" args={['#000428', 5, 30]} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          {/* Dynamic stars background */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* Floating particle field */}
          <ParticleField />
          
          {/* Section-specific 3D elements */}
          {activeSection === 'home' && (
            <group position={[3, 0, 0]}>
              <FloatingLaptop />
            </group>
          )}
          
          {activeSection === 'technologies' && (
            <group position={[0, 0, -5]}>
              <SkillSphere skills={skills} />
            </group>
          )}
          
          {/* Camera movement controls */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            rotateSpeed={0.05}
          />
          
          {/* Environment lighting */}
          <Environment preset="night" />
        </Suspense>
      </StyledCanvas>

      {/* Main content with sections */}
      <ContentWrapper
        ref={contentRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <HomePage />
            </motion.div>
          )}
          
          {activeSection === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Education />
            </motion.div>
          )}
          
          {activeSection === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Experience />
            </motion.div>
          )}
          
          {activeSection === 'technologies' && (
            <motion.div
              key="technologies"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Technologies />
            </motion.div>
          )}
        </AnimatePresence>
      </ContentWrapper>
      
      {/* Game-like navigation controls */}
      <NavigationControls>
        {sections.map((section) => (
          <NavButton
            key={section}
            onClick={() => handleNavigation(section)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              backgroundColor: activeSection === section ? 'rgba(0, 170, 255, 0.3)' : 'rgba(0, 0, 0, 0.7)',
              borderColor: activeSection === section ? '#00ffaa' : '#00aaff'
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </NavButton>
        ))}
      </NavigationControls>
    </AppWrapper>
  );
}

export default App;
