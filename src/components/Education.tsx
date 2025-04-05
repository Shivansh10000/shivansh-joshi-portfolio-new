import React from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.xlarge} ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.surface};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const EducationItem = styled.div`
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
    <SectionWrapper id="education">
      <SectionTitle>Education</SectionTitle>
      <EducationItem>
        <Institution>Awesome College University</Institution>
        <Description>Studied amazing things and learned a lot. Graduated with honors. (Placeholder Description)</Description>
      </EducationItem>
      <EducationItem>
        <Institution>Super High School</Institution>
        <Description>Built a strong foundation for future learning. Participated in coding clubs. (Placeholder Description)</Description>
      </EducationItem>
    </SectionWrapper>
  );
};

export default Education; 