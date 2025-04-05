import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// --- Placeholder Data ---
const placeholderProjects = [
  {
    id: 1,
    title: 'Project Alpha',
    date: 'Jan 2024 - Mar 2024',
    description: 'An innovative web application built with React and Node.js, solving a complex problem in data visualization. Features real-time updates and a dynamic user interface.',
    imageUrl: 'https://via.placeholder.com/600x400/FFA500/000000?text=Project+Alpha+Image', // Orange placeholder
  },
  {
    id: 2,
    title: 'Gamma Game Engine',
    date: 'Sep 2023 - Dec 2023',
    description: 'A custom 2D game engine developed using TypeScript and WebGL. Focused on performance and ease of use for developers. Includes physics simulation and particle effects.',
    imageUrl: 'https://via.placeholder.com/600x400/4682B4/FFFFFF?text=Gamma+Engine+Image', // SteelBlue placeholder
  },
  {
    id: 3,
    title: 'Portfolio Website v3',
    date: 'Apr 2024 - Present',
    description: 'The very website you are exploring! Built with React, Three.js, Framer Motion, and Styled Components to create an interactive and engaging experience.',
    imageUrl: 'https://via.placeholder.com/600x400/32CD32/FFFFFF?text=Portfolio+V3+Image', // LimeGreen placeholder
  },
  // Add more projects as needed
];

// --- Styled Components ---

const SectionWrapper = styled(motion.section)`
  padding: 4rem 2rem;
  margin: 3rem auto;
  max-width: 1200px; // Wider max-width for two columns
  position: relative;
  background: rgba(20, 20, 40, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 3rem 1rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 2rem 0.5rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.secondary}; // Use secondary color
  text-shadow: 0 0 15px ${({ theme }) => theme.colors.secondary}40;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.8rem;
  }
`;

const ProjectsLayout = styled(motion.div)`
  display: flex;
  gap: 2rem;
  /* flex-wrap: wrap; // Keep wrap for safety, but explicitly stack */

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column; // Stack columns on tablet and smaller
    gap: 1.5rem;
  }
`;

const ProjectList = styled(motion.div)`
  flex: 2; 
  min-width: 250px; 
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: none; // Reset flex basis when stacked
    width: 100%; // Take full width when stacked
  }
`;

const ProjectListItem = styled(motion.div)<{ $isSelected: boolean }>`
  padding: 1rem 1.5rem;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid transparent;
  border-left: 4px solid ${({ $isSelected, theme }) => ($isSelected ? theme.colors.accent : theme.colors.surface)};
  background-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.surface + 'CC' : theme.colors.surface + '80')};
  transition: all 0.3s ease;
  box-shadow: ${({ $isSelected }) => ($isSelected ? '0 4px 15px rgba(0,0,0,0.2)' : 'none')};

  h3 {
    margin-bottom: 0.25rem;
    color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.accent : theme.colors.text)};
    transition: color 0.3s ease;
  }

  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface + 'AA'};
    border-left-color: ${({ theme }) => theme.colors.secondary};
    h3 {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.8rem 1rem;
    h3 {
      font-size: 1rem; // Slightly smaller title on mobile
    }
  }
`;

const ProjectDetails = styled(motion.div)`
  flex: 3; 
  min-width: 300px;
  background-color: ${({ theme }) => theme.colors.surface + 'AA'};
  border-radius: 10px;
  padding: 1.5rem;
  overflow: hidden; // Contain the image within bounds
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: none; // Reset flex basis when stacked
    width: 100%; // Take full width when stacked
  }
`;

const ProjectImage = styled(motion.img)`
  width: 100%;
  height: auto;
  max-height: 400px; // Limit image height
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProjectDescription = styled(motion.p)`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
`;

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

// --- Component ---

const Projects: React.FC = () => {
  // State for the persistently clicked project
  const [clickedProject, setClickedProject] = useState(placeholderProjects[0]);
  // State for the currently hovered project (null if none)
  const [hoveredProject, setHoveredProject] = useState<typeof placeholderProjects[0] | null>(null);

  // Determine which project details to display
  const projectToShow = hoveredProject || clickedProject;

  return (
    <SectionWrapper 
      id="projects"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <SectionTitle variants={itemVariants}>Projects</SectionTitle>
      <ProjectsLayout variants={sectionVariants}>
        <ProjectList variants={itemVariants}>
          {placeholderProjects.map((project) => (
            <ProjectListItem
              key={project.id}
              // Highlight based on the clicked project
              $isSelected={clickedProject.id === project.id} 
              // Set clicked project on click
              onClick={() => { 
                setClickedProject(project); 
                setHoveredProject(null); // Clear hover on click
              }} 
              // Set hovered project on hover start
              onHoverStart={() => setHoveredProject(project)} 
              // Clear hovered project on hover end
              onHoverEnd={() => setHoveredProject(null)} 
              layout
              variants={itemVariants}
            >
              <h3>{project.title}</h3>
              <p>{project.date}</p>
            </ProjectListItem>
          ))}
        </ProjectList>

        <ProjectDetails variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              // Key based on the project being shown (hovered or clicked)
              key={projectToShow.id} 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectImage 
                src={projectToShow.imageUrl}
                alt={`${projectToShow.title} screenshot`}
              />
              <ProjectDescription>
                {projectToShow.description}
              </ProjectDescription>
            </motion.div>
          </AnimatePresence>
        </ProjectDetails>
      </ProjectsLayout>
    </SectionWrapper>
  );
};

export default Projects; 