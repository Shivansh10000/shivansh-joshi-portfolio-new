import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomePageWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Name = styled(motion.h1)`
  font-size: 4rem;
  color: #00aaff;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(0, 170, 255, 0.5);
  cursor: pointer;
`;

const Tagline = styled(motion.p)`
  font-size: 1.5rem;
  color: white;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  max-width: 600px;
`;

const InteractButton = styled(motion.button)`
  background: rgba(0, 0, 0, 0.5);
  color: #00ffaa;
  border: 2px solid #00ffaa;
  border-radius: 30px;
  padding: 12px 30px;
  margin-top: 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: rgba(0, 255, 170, 0.2);
    transition: width 0.4s ease;
    z-index: -1;
  }
  
  &:hover::before {
    width: 100%;
  }
`;

const FloatingIcons = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.3);
`;

const HomePage: React.FC = () => {
  const [nameHovered, setNameHovered] = useState(false);
  const [iconTriggered, setIconTriggered] = useState(false);
  
  // Generate random positions for floating icons
  const generateRandomPosition = () => ({
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
  });
  
  const icons = Array.from({ length: 5 }).map(() => generateRandomPosition());
  
  return (
    <HomePageWrapper id="home">
      <Name 
        initial={{ opacity: 0, y: -50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          rotate: nameHovered ? [0, -2, 2, -2, 0] : 0,
          scale: nameHovered ? 1.05 : 1,
        }}
        transition={{ 
          duration: 0.8, 
          rotate: { repeat: 0, duration: 0.5 },
          scale: { duration: 0.2 }
        }}
        onHoverStart={() => setNameHovered(true)}
        onHoverEnd={() => setNameHovered(false)}
        onTap={() => setIconTriggered(prev => !prev)}
      >
        Shivansh Joshi
      </Name>
      
      <Tagline
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Creative Developer | Building Interactive Experiences
      </Tagline>
      
      <InteractButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        onClick={() => setIconTriggered(prev => !prev)}
      >
        EXPLORE PORTFOLIO
      </InteractButton>
      
      {/* Floating tech icons that react to interaction */}
      <FloatingIcons>
        {icons.map((pos, index) => (
          <FloatingIcon
            key={index}
            initial={{ 
              x: pos.x + 'vw', 
              y: pos.y + 'vh',
              opacity: 0.3,
              scale: 0.8
            }}
            animate={{ 
              x: iconTriggered ? pos.x * 1.5 + 'vw' : pos.x + 'vw',
              y: iconTriggered ? pos.y * 1.5 + 'vh' : pos.y + 'vh',
              rotate: iconTriggered ? [0, 360] : 0,
              opacity: iconTriggered ? 0.8 : 0.3,
              scale: iconTriggered ? 1.2 : 0.8
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {['⚛️', '🔷', '🌐', '💻', '🚀'][index]}
          </FloatingIcon>
        ))}
      </FloatingIcons>
    </HomePageWrapper>
  );
};

export default HomePage; 