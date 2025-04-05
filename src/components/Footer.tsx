import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import icons
import { motion } from 'framer-motion';

const FooterWrapper = styled(motion.footer)`
  padding: ${({ theme }) => theme.spacing.medium} 0;
  text-align: center;
  /* margin-top: ${({ theme }) => theme.spacing.large}; // No longer needed with fixed position */
  position: fixed; // Changed from relative to fixed
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(10, 10, 25, 0.6); // Match navbar background style
  backdrop-filter: blur(5px); // Match navbar background style
  z-index: 10; // Ensure it's above canvas and potentially other elements
`;

const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.8rem; // Larger icons
  margin: 0 ${({ theme }) => theme.spacing.medium};
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent}; // Hover with accent color
    transform: scale(1.2); // Scale up on hover
  }
`;

const Footer: React.FC = () => {
  // Placeholder URLs
  const githubUrl = "https://github.com/yourusername";
  const linkedinUrl = "https://linkedin.com/in/yourusername";
  const emailAddress = "mailto:youremail@example.com";

  return (
    <FooterWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }} // Slight delay after content loads
    >
      <IconLink href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <FaGithub />
      </IconLink>
      <IconLink href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <FaLinkedin />
      </IconLink>
      <IconLink href={emailAddress} aria-label="Email">
        <FaEnvelope />
      </IconLink>
    </FooterWrapper>
  );
};

export default Footer; 