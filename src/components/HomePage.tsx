import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Keyframe animation for text glow pulse
const textGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}, 0 0 20px ${({ theme }) => theme.colors.primary}, 0 0 30px ${({ theme }) => theme.colors.accent}; }
  50% { text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}, 0 0 30px ${({ theme }) => theme.colors.primary}, 0 0 40px ${({ theme }) => theme.colors.accent}; }
`;

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
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 3px;
  animation: ${textGlow} 3s ease-in-out infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 3rem;
    letter-spacing: 2px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
    letter-spacing: 1.5px;
  }
`;

const Tagline = styled(motion.p)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  max-width: 600px;
  font-style: italic;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const InteractButton = styled(motion.button)`
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.accent};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 30px;
  padding: 12px 30px;
  margin-top: 2rem;
  font-size: 1.1rem;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.accent};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: ${({ theme }) => theme.colors.accent + '40'};
    transition: width 0.4s ease;
    z-index: -1;
  }
  
  &:hover::before {
    width: 100%;
  }

  &:hover {
     box-shadow: 0 0 15px ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
    padding: 10px 25px;
    margin-top: 1.5rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    padding: 8px 20px;
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

// Define props for HomePage, including the navigation callback
interface HomePageProps {
  onNavigate: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
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
        onClick={() => onNavigate('experience')}
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