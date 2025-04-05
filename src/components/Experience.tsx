import React from 'react';
import styled from 'styled-components';

// Re-using SectionWrapper and SectionTitle styles (or create shared ones)
const SectionWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.xlarge} ${({ theme }) => theme.spacing.large};
  /* background-color: ${({ theme }) => theme.colors.surface}; // Maybe different bg? */
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const ExperienceItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.medium};
  border-left: 4px solid ${({ theme }) => theme.colors.accent}; // Use accent color
`;

const Company = styled.h3`
  color: ${({ theme }) => theme.colors.accent}; // Use accent color
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
    <SectionWrapper id="experience">
      <SectionTitle>Experience</SectionTitle>
      <ExperienceItem>
        <Company>Tech Innovations Inc.</Company>
        <Role>Senior Software Engineer</Role>
        <Dates>Jan 2023 - Present</Dates>
        <Description>Promoted from Software Engineer. Led development on key projects, mentored junior developers, improved system performance by X%. (Placeholder Description)</Description>
        <br /> 
        <Role>Software Engineer</Role>
        <Dates>June 2021 - Dec 2022</Dates>
        <Description>Developed features for the main product, collaborated with cross-functional teams, contributed to code reviews. (Placeholder Description)</Description>
      </ExperienceItem>
      {/* Add more experiences later */}
    </SectionWrapper>
  );
};

export default Experience; 