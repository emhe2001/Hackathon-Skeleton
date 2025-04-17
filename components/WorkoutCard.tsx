import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Workout } from '@/types/workout';
import Colors from '@/constants/colors';
import { Calendar, Clock, Dumbbell } from 'lucide-react-native';
import { exercises } from '@/mocks/exercises';
import { LinearGradient } from 'expo-linear-gradient';

interface WorkoutCardProps {
  workout: Workout;
  onPress?: () => void;
}

export default function WorkoutCard({ workout, onPress }: WorkoutCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Count total sets
  const totalSets = workout.exercises.reduce(
    (acc, exercise) => acc + exercise.sets.length, 
    0
  );

  // Get exercise names
  const exerciseNames = workout.exercises.map(exercise => {
    const exerciseDetails = exercises.find(e => e.id === exercise.exerciseId);
    return exerciseDetails?.name || 'Unknown exercise';
  });

  return (
    <Pressable 
      style={styles.container} 
      onPress={onPress}
      android_ripple={{ color: Colors.highlight }}
    >
      <LinearGradient
        colors={['rgba(138, 43, 226, 0.2)', 'rgba(255, 20, 147, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{workout.name}</Text>
          {workout.completed && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>Completed</Text>
            </View>
          )}
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Calendar size={16} color={Colors.primary} />
            <Text style={styles.infoText}>{formatDate(workout.date)}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Clock size={16} color={Colors.primary} />
            <Text style={styles.infoText}>{workout.duration} min</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Dumbbell size={16} color={Colors.primary} />
            <Text style={styles.infoText}>{workout.exercises.length} exercises</Text>
          </View>
        </View>

        <View style={styles.exercisesContainer}>
          {exerciseNames.slice(0, 3).map((name, index) => (
            <Text key={index} style={styles.exerciseName}>
              • {name}
            </Text>
          ))}
          {exerciseNames.length > 3 && (
            <Text style={styles.moreText}>+{exerciseNames.length - 3} more</Text>
          )}
        </View>

        {workout.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            {workout.notes}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'relative',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 16,
    backgroundColor: 'rgba(30, 30, 30, 0.85)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  completedBadge: {
    backgroundColor: 'rgba(76, 217, 100, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  completedText: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  exercisesContainer: {
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  moreText: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  notes: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});