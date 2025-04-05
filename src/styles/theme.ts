export const theme = {
  colors: {
    primary: '#00aaff', // Electric Blue
    secondary: '#03DAC6', // Teal
    background: '#121212', // Dark background
    surface: '#1E1E1E', // Slightly lighter surface for cards/sections
    text: '#E0E0E0', // Light text
    textSecondary: '#A0A0A0', // Secondary text
    accent: '#00ffaa', // Vibrant Green
  },
  /* // Fonts are now set in GlobalStyles
  fonts: {
    main: '"Roboto", sans-serif', // Example main font (ensure imported)
    heading: '"Montserrat", sans-serif', // Example heading font (ensure imported)
  },
  */
  spacing: {
    small: '8px',
    medium: '16px',
    large: '32px',
    xlarge: '64px',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
};

export type ThemeType = typeof theme; // Export type for use with styled-components 