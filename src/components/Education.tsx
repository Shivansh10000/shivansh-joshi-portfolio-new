import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Placeholder Data (Replace with your actual info) ---
const educationData = [
  {
    id: 1,
    institution: 'Delhi Technological University',
    degree: 'Bachelor of Technology in Information Technology', // Added Degree field
    description: 'Studied Information Technology at Delhi Technological University, where I gained a strong foundation in computer science and software development.',
    dates: '2020 - 2024',
    scoreLabel: 'CGPA',
    scoreValue: '8.8',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b5/DTU%2C_Delhi_official_logo.png', // Placeholder Image URL
    imageAlt: 'Delhi Technological University'
  },
  {
    id: 2,
    institution: 'Vikas Bharati Public School',
    degree: 'High School 12th Grade', // Added Degree field
    description: 'Built a strong foundation for future learning. Participated in coding clubs and science fairs.',
    dates: '2018 - 2019',
    scoreLabel: 'Percentage',
    scoreValue: '92%',
    imageUrl: 'https://housing-images.n7net.in/d89cff98/1ad4011c04cd9619b9a39a282fbce59a/v0/medium.jpg',
    imageAlt: 'Vikas Bharati Public School'
  }
];

// --- Styled Components ---

// Re-use or redefine SectionWrapper and SectionTitle (assuming similar style as Technologies)
const SectionWrapper = styled(motion.section)`
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(10, 25, 47, 0.8) 0%, rgba(17, 34, 64, 0.9) 100%); // Slightly different gradient mix
  backdrop-filter: blur(4px);
  border-radius: 15px;
  margin: 3rem auto;
  max-width: 1000px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 0 15px ${({ theme }) => theme.colors.primary}40;
`;

// Container for the list of education items
const EducationList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2.5rem; // Space between education cards
`;

// Individual Education Item Card
const EducationItem = styled(motion.div)`
  display: flex;
  flex-direction: column; // Default: Stack image on top for mobile
  background-color: rgba(255, 255, 255, 0.05); // Slightly different background than wrapper
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  overflow: hidden; // Ensure image corners are clipped if needed
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3), 0 0 15px ${({ theme }) => theme.colors.primary}33;
  }

  // Media query for larger screens (tablet and up)
  @media (min-width: 768px) {
    flex-direction: row; // Side-by-side layout
    gap: 2rem; // Gap between image and text
    align-items: flex-start; // Align items to the top
  }
`;

// Wrapper for the image
const ImageWrapper = styled.div`
  flex-shrink: 0; // Prevent image from shrinking
  width: 100%; // Full width on mobile
  margin-bottom: 1.5rem; // Space below image on mobile

  @media (min-width: 768px) {
    width: 150px; // Fixed width on larger screens
    height: 150px; // Fixed height for a square aspect ratio
    margin-bottom: 0; // No margin needed on larger screens
  }
`;

// Styled Image
const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover; // Cover the area, crop if needed
  border-radius: 8px; // Slightly rounded corners for the image
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

// Container for all text details
const TextDetails = styled.div`
  flex-grow: 1; // Allow text details to take remaining space
  display: flex;
  flex-direction: column;
`;

// Institution Name (Most prominent)
const InstitutionName = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary}; // Use accent color
  margin: 0 0 0.25rem 0; // Adjust margin
  line-height: 1.2;
`;

// Degree (Slightly less prominent than name)
const Degree = styled.p`
  font-size: 1rem;
  font-weight: 500; // Medium weight
  color: ${({ theme }) => theme.colors.text}; // Brighter than secondary text
  margin: 0 0 0.5rem 0;
`;


// Dates (Less prominent)
const Dates = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 1rem 0; // Space before description
  font-family: monospace; // Optional: use mono font for dates
`;

// Description Text
const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0 0 1.5rem 0; // Space before score
`;

// Score / CGPA Area
const Score = styled.div`
  margin-top: auto; // Push score to the bottom of the text area
  padding-top: 1rem; // Space above the score
  border-top: 1px solid rgba(255, 255, 255, 0.1); // Divider line
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    font-weight: 600; // Bold label
    color: ${({ theme }) => theme.colors.text}; // Slightly brighter label
  }

  strong {
     font-weight: 700; // Bold value
     color: ${({ theme }) => theme.colors.primary}; // Accent color for score value
     margin-left: 0.5rem;
  }
`;


// --- Animation Variants (Can reuse variants from Technologies or define new ones) ---
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the appearance of each EducationItem
    },
  },
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 }, // Slide in from left
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// --- Component ---
const Education: React.FC = () => {
  return (
    <SectionWrapper
      id="education" // Link from Navbar
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <SectionTitle variants={itemVariants}>Education</SectionTitle>
      <EducationList variants={listVariants}>
        {educationData.map((edu) => (
          <EducationItem key={edu.id} variants={itemVariants}>
            <ImageWrapper>
              <StyledImage src={edu.imageUrl} alt={edu.imageAlt} />
            </ImageWrapper>
            <TextDetails>
              <InstitutionName>{edu.institution}</InstitutionName>
              <Degree>{edu.degree}</Degree>
              <Dates>{edu.dates}</Dates>
              <Description>{edu.description}</Description>
              <Score>
                <span>{edu.scoreLabel}:</span>
                <strong>{edu.scoreValue}</strong>
              </Score>
            </TextDetails>
          </EducationItem>
        ))}
      </EducationList>
    </SectionWrapper>
  );
};

export default Education;