import React from 'react';
import styled from 'styled-components';
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
  SiThreedotjs // Example AI tool icon (replace if needed)
} from 'react-icons/si'; // Using react-icons

// Re-using SectionWrapper and SectionTitle styles
const SectionWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.xlarge} ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.surface};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const IconsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); // Responsive grid
  gap: ${({ theme }) => theme.spacing.large};
  justify-items: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    font-size: 3rem; // Adjust icon size
  }
`;

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
    <SectionWrapper id="technologies">
      <SectionTitle>Technologies</SectionTitle>
      <IconsGrid>
        {technologies.map((tech) => (
          <IconWrapper key={tech.name}>
            <tech.icon />
            <span>{tech.name}</span>
          </IconWrapper>
        ))}
      </IconsGrid>
    </SectionWrapper>
  );
};

export default Technologies; 