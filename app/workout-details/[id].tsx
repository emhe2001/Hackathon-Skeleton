import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { ArrowLeft, Calendar, Clock, Dumbbell, FileText } from 'lucide-react-native';
import { useWorkoutStore } from '@/store/workout-store';
import { exercises } from '@/mocks/exercises';
import Button from '@/components/Button';
import { LinearGradient } from 'expo-linear-gradient';

export default function WorkoutDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getWorkoutById } = useWorkoutStore();
  
  const workout = getWorkoutById(id as string);
  
  if (!workout) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Workout not found</Text>
        <Button 
          title="Go Back" 
          onPress={() => router.back()}
          variant="outline"
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get exercise details
  const getExerciseDetails = (exerciseId: string) => {
    return exercises.find(e => e.id === exerciseId);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          headerTitle: workout.name,
          headerTitleStyle: {
            fontWeight: '700',
            color: Colors.text,
          },
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <LinearGradient
            colors={['rgba(138, 43, 226, 0.2)', 'rgba(138, 43, 226, 0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          />
          
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
          
          {workout.notes && (
            <View style={styles.notesContainer}>
              <View style={styles.notesHeader}>
                <FileText size={16} color={Colors.primary} />
                <Text style={styles.notesTitle}>Notes</Text>
              </View>
              <Text style={styles.notesText}>{workout.notes}</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.sectionTitle}>Exercises</Text>
        
        {workout.exercises.map((exercise, index) => {
          const exerciseDetails = getExerciseDetails(exercise.exerciseId);
          
          return (
            <View key={exercise.exerciseId} style={styles.exerciseCard}>
              <LinearGradient
                colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
                style={styles.exerciseCardGradient}
              />
              
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>
                  {index + 1}. {exerciseDetails?.name || 'Unknown Exercise'}
                </Text>
                <View style={styles.exerciseCategory}>
                  <LinearGradient
                    colors={['#8A2BE2', '#4A0082']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                  />
                  <Text style={styles.exerciseCategoryText}>
                    {exerciseDetails?.category || 'unknown'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.setsContainer}>
                <View style={styles.setHeader}>
                  <Text style={styles.setHeaderText}>Set</Text>
                  {exerciseDetails?.category === 'strength' && (
                    <>
                      <Text style={styles.setHeaderText}>Weight</Text>
                      <Text style={styles.setHeaderText}>Reps</Text>
                    </>
                  )}
                  {exerciseDetails?.category === 'cardio' && (
                    <>
                      <Text style={styles.setHeaderText}>Duration</Text>
                      <Text style={styles.setHeaderText}>Distance</Text>
                    </>
                  )}
                  <Text style={styles.setHeaderText}>Status</Text>
                </View>
                
                {exercise.sets.map((set, setIndex) => (
                  <View key={set.id} style={styles.setRow}>
                    <Text style={styles.setText}>{setIndex + 1}</Text>
                    
                    {exerciseDetails?.category === 'strength' && (
                      <>
                        <Text style={styles.setText}>{set.weight || '-'} kg</Text>
                        <Text style={styles.setText}>{set.reps || '-'}</Text>
                      </>
                    )}
                    
                    {exerciseDetails?.category === 'cardio' && (
                      <>
                        <Text style={styles.setText}>
                          {set.duration ? `${Math.floor(set.duration / 60)}:${(set.duration % 60).toString().padStart(2, '0')}` : '-'}
                        </Text>
                        <Text style={styles.setText}>
                          {set.distance ? `${set.distance / 1000} km` : '-'}
                        </Text>
                      </>
                    )}
                    
                    <View style={[
                      styles.statusBadge,
                      set.completed ? styles.completedBadge : styles.incompleteBadge
                    ]}>
                      <Text style={[
                        styles.statusText,
                        set.completed ? styles.completedText : styles.incompleteText
                ]}>
                        {set.completed ? 'Done' : 'Missed'}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
        
        <View style={styles.actionsContainer}>
          <Button 
            title="Share Workout" 
            onPress={() => {}}
            variant="glass"
            style={{ flex: 1, marginRight: 8 }}
          />
          <Button 
            title="Repeat Workout" 
            onPress={() => {}}
            variant="primary"
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  cardGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
  },
  notesContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 16,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  notesText: {
    fontSize: 14,
    color: Colors.text,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  exerciseCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  exerciseCardGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  exerciseCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  exerciseCategoryText: {
    fontSize: 12,
    color: Colors.text,
    textTransform: 'capitalize',
  },
  setsContainer: {
    padding: 16,
  },
  setHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  setHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    flex: 1,
    textAlign: 'center',
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  setText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  completedBadge: {
    backgroundColor: 'rgba(76, 217, 100, 0.2)',
  },
  incompleteBadge: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  completedText: {
    color: Colors.success,
  },
  incompleteText: {
    color: Colors.error,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 24,
  },
});