import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Exercise } from '@/types/workout';
import Colors from '@/constants/colors';
import { Dumbbell, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress?: () => void;
  compact?: boolean;
}

export default function ExerciseCard({ exercise, onPress, compact = false }: ExerciseCardProps) {
  if (compact) {
    return (
      <Pressable 
        style={styles.compactContainer} 
        onPress={onPress}
        android_ripple={{ color: Colors.highlight }}
      >
        <LinearGradient
          colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
          style={styles.compactGradient}
        />
        <View style={styles.compactContent}>
          <Dumbbell size={18} color={Colors.primary} />
          <Text style={styles.compactName}>{exercise.name}</Text>
        </View>
        <ChevronRight size={18} color={Colors.textLight} />
      </Pressable>
    );
  }

  return (
    <Pressable 
      style={styles.container} 
      onPress={onPress}
      android_ripple={{ color: Colors.highlight }}
    >
      <Image 
        source={{ uri: exercise.imageUrl }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
        style={styles.imageGradient}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{exercise.name}</Text>
          <View style={[styles.difficultyBadge, 
            exercise.difficulty === 'beginner' ? styles.beginnerBadge : 
            exercise.difficulty === 'intermediate' ? styles.intermediateBadge : 
            styles.advancedBadge
          ]}>
            <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
          </View>
        </View>
        
        <Text style={styles.category}>{exercise.category}</Text>
        
        <View style={styles.musclesContainer}>
          {exercise.targetMuscles.slice(0, 3).map((muscle, index) => (
            <View key={index} style={styles.muscleBadge}>
              <LinearGradient
                colors={['rgba(138, 43, 226, 0.2)', 'rgba(138, 43, 226, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.muscleText}>{muscle}</Text>
            </View>
          ))}
          {exercise.targetMuscles.length > 3 && (
            <Text style={styles.moreText}>+{exercise.targetMuscles.length - 3} more</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'relative',
  },
  image: {
    height: 180,
    width: '100%',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },
  content: {
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  category: {
    fontSize: 14,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
    marginBottom: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  beginnerBadge: {
    backgroundColor: 'rgba(76, 217, 100, 0.2)',
  },
  intermediateBadge: {
    backgroundColor: 'rgba(255, 204, 0, 0.2)',
  },
  advancedBadge: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
  },
  musclesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  muscleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  muscleText: {
    fontSize: 12,
    color: Colors.text,
    textTransform: 'capitalize',
  },
  moreText: {
    fontSize: 12,
    color: Colors.textLight,
    alignSelf: 'center',
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginBottom: 8,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  compactGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  compactName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
});