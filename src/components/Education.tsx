import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Container variant for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Time delay between each child animation
    },
  },
};

// Item variant for individual item animation (slide in from bottom)
const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 100 } 
  },
};

const SectionWrapper = styled(motion.section)`
  padding: ${({ theme }) => theme.spacing.xlarge} ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.surface + '99'};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
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

const EducationItem = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  border-left: 4px solid ${({ theme }) => theme.colors.secondary};
`;

const Institution = styled.h3`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Education: React.FC = () => {
  return (
    <SectionWrapper 
      id="education"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SectionTitle variants={itemVariants}>Education</SectionTitle>
      <EducationItem variants={itemVariants}>
        <Institution>Awesome College University</Institution>
        <Description>Studied amazing things and learned a lot. Graduated with honors. (2017 - 2021)</Description>
      </EducationItem>
      <EducationItem variants={itemVariants}>
        <Institution>Super High School</Institution>
        <Description>Built a strong foundation for future learning. Participated in coding clubs. (2013 - 2017)</Description>
      </EducationItem>
    </SectionWrapper>
  );
};

export default Education; 