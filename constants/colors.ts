export default {
  // Main colors
  primary: '#8A2BE2', // Vibrant purple
  secondary: '#FF1493', // Deep pink
  accent: '#00BFFF', // Deep sky blue
  
  // Background colors
  background: '#121212', // Very dark gray (almost black)
  card: '#1E1E1E', // Dark gray for cards
  cardAlt: '#252525', // Slightly lighter dark gray
  
  // Text colors
  text: '#FFFFFF', // White
  textSecondary: '#BBBBBB', // Light gray
  textLight: '#888888', // Medium gray
  
  // UI elements
  border: '#333333', // Dark gray for borders
  success: '#4CD964', // Green
  error: '#FF3B30', // Red
  warning: '#FFCC00', // Yellow
  inactive: '#555555', // Gray for inactive elements
  overlay: 'rgba(0, 0, 0, 0.7)', // Dark overlay
  highlight: 'rgba(138, 43, 226, 0.15)', // Subtle purple highlight
  progressBar: '#8A2BE2', // Purple for progress bars
  
  // Gradients - changed from arrays to tuples with 'as const'
  gradientPurple: ['#8A2BE2', '#4A0082'] as const, // Purple gradient
  gradientPink: ['#FF1493', '#C71585'] as const, // Pink gradient
  gradientBlue: ['#00BFFF', '#1E90FF'] as const, // Blue gradient
  gradientMixed: ['#8A2BE2', '#FF1493'] as const, // Purple to pink gradient
};