import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Keyframe animation for text glow pulse (keep as is)
const textGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}, 0 0 20px ${({ theme }) => theme.colors.primary}, 0 0 30px ${({ theme }) => theme.colors.accent}; }
  50% { text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}, 0 0 30px ${({ theme }) => theme.colors.primary}, 0 0 40px ${({ theme }) => theme.colors.accent}; }
`;

// --- Styled Components ---

const HomePageWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column; // Default: stack text and image vertically
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden; // Prevent content overflow
  gap: 2rem; // Gap between text block and image block on mobile

  // Change layout for larger screens
  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}) { // Adjust breakpoint if needed
    flex-direction: row; // Side-by-side layout
    justify-content: space-around; // Space out text and image
    align-items: center; // Vertically center items
    gap: 4rem; // Increase gap for wider screens
    padding: 2rem 4rem; // Add more horizontal padding
  }
`;

// NEW: Wrapper for the main text content
const TextContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center; // Center text elements within the block initially
  text-align: center;
  max-width: 700px; // Max width for the text block
  order: 2; // Default order: text below image on mobile

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
    align-items: flex-start; // Left-align text on larger screens
    text-align: left;
    order: 1; // Text on the left on larger screens
    flex: 1.2; // Allow text to take slightly more space if needed
    max-width: 60%; // Limit width relative to parent
  }
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
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const IntroParagraph = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 1.5rem 0;
  line-height: 1.7; // Slightly adjust line height maybe
  font-family: sans-serif;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
  }
   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.95rem;
  }
`;

const Tagline = styled(motion.p)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  font-style: italic;
  margin-bottom: 1.5rem; // Add margin below tagline

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.2rem;
  }
   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const InteractButton = styled(motion.button)`
  /* Styles remain the same */
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.accent};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 30px;
  padding: 12px 30px;
  /* margin-top: 2rem; // Removed fixed top margin, rely on flex gap */
  font-size: 1.1rem;
  font-family: 'Orbitron', sans-serif; // Ensure this font is loaded
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.accent};

  &::before { /* Hover effect */ }
  &:hover::before { /* Hover effect */ }
  &:hover { /* Hover effect */ }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
    padding: 10px 25px;
  }
   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    padding: 8px 20px;
  }
`;

// NEW: Wrapper for the image
const ImageWrapper = styled(motion.div)`
  order: 1; // Default order: image above text on mobile
  width: 250px; // Size on mobile
  height: 250px; // Size on mobile
  flex-shrink: 0; // Prevent shrinking

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
    order: 2; // Image on the right on larger screens
    width: 300px; // Slightly larger on desktop
    height: 300px; // Slightly larger on desktop
    flex: 0.8; // Let it take some defined space but less than text
    max-width: 40%; // Limit width relative to parent
    display: flex; // Use flex to center image easily if needed
    justify-content: center;
    align-items: center;
  }
   @media (min-width: 1200px) { // Even larger screens
      width: 350px;
      height: 350px;
   }
`;

// NEW: Styled Image component
const ProfileImage = styled.img`
  display: block;
  width: 300px;
  height: 300px;
  object-fit: cover; // Crop image nicely
  border-radius: 50%; // Make it circular
  border: 3px solid ${({ theme }) => theme.colors.primary}99; // Add border with accent color
  box-shadow: 0 0 25px ${({ theme }) => theme.colors.primary}50, 0 5px 15px rgba(0,0,0,0.3); // Glow + drop shadow
`;


// Floating Icons components (keep as is)
const FloatingIcons = styled.div`...`;
const FloatingIcon = styled(motion.div)`...`;

// --- Component Logic ---

interface HomePageProps {
  onNavigate: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [nameHovered, setNameHovered] = useState(false);
  // Icon triggering logic can remain if desired
  const [iconTriggered, setIconTriggered] = useState(false);
  const icons = Array.from({ length: 5 }).map(() => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
  }));

  // --- Animation Variants ---
  const contentVariants = {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } }
  };

  const imageVariants = {
      hidden: { opacity: 0, x: 50, scale: 0.7 },
      visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, delay: 0.4, type: 'spring' } }
  };


  return (
    <HomePageWrapper id="home">
      {/* Text Content Block */}
      <TextContentWrapper
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <Name
          // Keep existing name animations
          initial={{ opacity: 0, y: -30 }} // Adjust initial slightly if needed
          animate={{
            opacity: 1,
            y: 0,
            rotate: nameHovered ? [0, -1, 1, -1, 0] : 0, // Less aggressive rotate
            scale: nameHovered ? 1.03 : 1,
          }}
          transition={{
            duration: 0.6, // Faster name entrance
            rotate: { repeat: 0, duration: 0.4 },
            scale: { duration: 0.2 }
          }}
          onHoverStart={() => setNameHovered(true)}
          onHoverEnd={() => setNameHovered(false)}
          onTap={() => setIconTriggered(prev => !prev)} // Keep icon trigger if used
        >
          Shivansh Joshi
        </Name>

        {/* Animate these individually, delaying after the main wrapper */}
        <IntroParagraph
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }} // Delay after TextContentWrapper
        >
          Hi there! I'm Shivansh, a passionate Full Stack Developer with a keen interest in creating dynamic, interactive, and user-friendly web experiences. I enjoy tackling challenging problems and bringing ideas to life with code, especially using modern technologies like React, Node.js, and Three.js.
        </IntroParagraph>

        <Tagline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }} // Delay further
        >
          Creative Developer | Building Interactive Experiences
        </Tagline>

        <InteractButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }} // Adjust initial position
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }} // Delay button last
          onClick={() => onNavigate('experience')} // Ensure 'experience' or desired section ID is correct
        >
          EXPLORE PORTFOLIO
        </InteractButton>
      </TextContentWrapper>

      {/* Image Block */}
      <ImageWrapper
          variants={imageVariants}
          initial="hidden"
          animate="visible"
      >
        <ProfileImage
          src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg" // <-- REPLACE THIS PLACEHOLDER!
          alt="Shivansh Joshi - Profile Picture"
        />
      </ImageWrapper>
    </HomePageWrapper>
  );
};

export default HomePage;