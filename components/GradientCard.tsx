import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

interface GradientCardProps {
  children: ReactNode;
  colors?: readonly string[];
  style?: ViewStyle;
  intensity?: 'low' | 'medium' | 'high';
}

export default function GradientCard({
  children,
  colors = Colors.gradientPurple,
  style,
  intensity = 'medium'
}: GradientCardProps) {
  // Adjust opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case 'low':
        return 0.7;
      case 'high':
        return 1;
      case 'medium':
      default:
        return 0.85;
    }
  };

  // Ensure we have at least two colors
  const firstColor = colors[0] || '#8A2BE2';
  const secondColor = colors[1] || '#4A0082';
  
  // Create a proper readonly tuple
  const gradientColors = [firstColor, secondColor] as const;

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 16,
  },
});