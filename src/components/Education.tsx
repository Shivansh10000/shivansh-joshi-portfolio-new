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
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
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