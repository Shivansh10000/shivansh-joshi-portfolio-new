import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Container variant (can reuse or define separately)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4 }, // Slightly slower stagger for experience
  },
};

// Item variant (slide in from left, different effect)
const itemVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80 }
  },
};

// Re-using SectionWrapper and SectionTitle styles (or create shared ones)
const SectionWrapper = styled(motion.section)`
  padding: ${({ theme }) => theme.spacing.xlarge} ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(3px);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 3rem 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 2rem 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  font-size: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const ExperienceItem = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.medium};
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  position: relative;
`;

const Company = styled.h3`
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Role = styled.h4`
 color: ${({ theme }) => theme.colors.secondary};
 margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Dates = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Experience: React.FC = () => {
  return (
    <SectionWrapper 
      id="experience"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SectionTitle variants={itemVariants}>Experience</SectionTitle>
      <ExperienceItem variants={itemVariants}>
        <Company>Tech Innovations Inc.</Company>
        <Role>Senior Software Engineer</Role>
        <Dates>Jan 2023 - Present</Dates>
        <Description>Promoted from Software Engineer. Led development on key projects, mentored junior developers, improved system performance by X%. (Placeholder Description)</Description>
        <br /> 
        <Role>Software Engineer</Role>
        <Dates>June 2021 - Dec 2022</Dates>
        <Description>Developed features for the main product, collaborated with cross-functional teams, contributed to code reviews. (Placeholder Description)</Description>
      </ExperienceItem>
      <ExperienceItem variants={itemVariants}>
        <Company>Startup Heroes LLC</Company>
        <Role>Junior Developer Intern</Role>
        <Dates>May 2020 - Aug 2020</Dates>
        <Description>Assisted senior developers, learned agile methodologies, fixed bugs, and contributed to documentation. (Placeholder Description)</Description>
      </ExperienceItem>
    </SectionWrapper>
  );
};

export default Experience; 