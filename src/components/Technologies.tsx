import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Import motion
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiStyledcomponents,
  SiThreedotjs
} from 'react-icons/si';

// --- Styled Components ---

// Updated SectionWrapper with motion and enhanced styles
const SectionWrapper = styled(motion.section)` // Added motion
  padding: 4rem 2rem; // Increased padding
  position: relative;
  overflow: hidden; // Good practice for animations
  /* Example background matching the original prompt theme - adjust as needed */
  background: linear-gradient(180deg, rgba(17, 34, 64, 0.6) 0%, rgba(10, 25, 47, 0.8) 100%);
  backdrop-filter: blur(4px); // Optional blur effect
  border-radius: 15px;
  margin: 3rem auto; // Add vertical margin and center horizontally
  max-width: 1000px; // Limit max width for better layout on large screens
  border: 1px solid rgba(255, 255, 255, 0.1); // Subtle border
`;

// Updated SectionTitle with motion and enhanced styles
const SectionTitle = styled(motion.h2)` // Added motion
  text-align: center;
  margin-bottom: 3rem; // Increased margin
  font-size: 2.5rem; // Make title larger
  color: ${({ theme }) => theme.colors.primary}; // Use accent color
  text-shadow: 0 0 15px ${({ theme }) => theme.colors.primary}40; // Add a glow effect
`;

// Renamed to TechGrid and added motion
const TechGrid = styled(motion.div)` // Added motion
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); // Adjusted minmax for slightly larger cards
  gap: 1.5rem; // Adjusted gap
  justify-items: center;
  /* align-items: center; // Can be removed if cards control their height */
`;

// Replaced IconWrapper with the new TechCard component using motion
const TechCard = styled(motion.div)` // Added motion
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // Center content vertically
  padding: 1.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.07); // Slightly transparent background
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.textSecondary};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  min-height: 140px; // Give cards a minimum height
  width: 100%; // Make cards fill grid cell

  svg {
    font-size: 3.5rem; // Larger icons
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.text}; // Default icon color
    transition: color 0.3s ease;
  }

  span {
    font-size: 0.9rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary}; // Default text color
     transition: color 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.05); // Lift and scale up
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 0 15px ${({ theme }) => theme.colors.primary}40; // Enhance shadow + add accent glow
    color: ${({ theme }) => theme.colors.primary}; // Change default text color on hover

    svg {
       color: ${({ theme }) => theme.colors.primary}; // Change icon color on hover
    }
     span {
      color: ${({ theme }) => theme.colors.text}; // Make text slightly brighter on hover
    }
  }
`;

// --- Animation Variants ---

// Variant for the grid container to stagger children
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Controls delay between each card animation
    },
  },
};

// Variant for individual cards (and the title)
const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.8 }, // Start lower, faded, and smaller
  visible: {
    y: 0,
    opacity: 1,
    scale: 1, // Animate to final position, full opacity, normal scale
    transition: {
      type: 'spring', // Use spring physics for bounce effect
      stiffness: 120,
      damping: 14,
    },
  },
};


// --- Component ---

const technologies = [
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'HTML5', icon: SiHtml5 },
  { name: 'CSS3', icon: SiCss3 },
  { name: 'Styled Components', icon: SiStyledcomponents },
  { name: 'Three.js', icon: SiThreedotjs },
  // Add Cursor/AI tools if specific icons exist or use a generic one
];

const Technologies: React.FC = () => {
  return (
    <SectionWrapper
      id="technologies"
      initial="hidden" // Start with hidden variant
      whileInView="visible" // Animate to visible when in view
      viewport={{ once: true, amount: 0.1 }} // Trigger animation once when 10% is visible
    >
      <SectionTitle variants={cardVariants}>Technologies</SectionTitle> {/* Apply card animation to title */}
      <TechGrid variants={gridVariants}> {/* Apply grid variants for staggering */}
        {technologies.map((tech) => (
          <TechCard
            key={tech.name}
            variants={cardVariants} // Apply card animation to each card
            // You can add Framer Motion's whileHover for more complex physics-based hover animations if needed
            // whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
          >
            <tech.icon />
            <span>{tech.name}</span>
          </TechCard>
        ))}
      </TechGrid>
    </SectionWrapper>
  );
};

export default Technologies;