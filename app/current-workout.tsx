import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { ArrowLeft, Plus, Trash2, Check, X, FileText } from 'lucide-react-native';
import { useWorkoutStore } from '@/store/workout-store';
import { exercises } from '@/mocks/exercises';
import Button from '@/components/Button';
import ExerciseCard from '@/components/ExerciseCard';
import { LinearGradient } from 'expo-linear-gradient';

export default function CurrentWorkoutScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { 
    currentWorkout, 
    addExerciseToWorkout, 
    removeExerciseFromWorkout,
    addSet,
    completeSet,
    endWorkout
  } = useWorkoutStore();
  
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [notes, setNotes] = useState('');
  
  if (!currentWorkout) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>No active workout</Text>
        <Button 
          title="Start New Workout" 
          onPress={() => {
            router.replace('/workouts');
          }}
          variant="primary"
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }
  
  const handleAddExercise = (exerciseId: string) => {
    addExerciseToWorkout(exerciseId);
    setShowExerciseSelector(false);
  };
  
  const handleRemoveExercise = (exerciseId: string) => {
    Alert.alert(
      "Remove Exercise",
      "Are you sure you want to remove this exercise?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => removeExerciseFromWorkout(exerciseId),
          style: "destructive"
        }
      ]
    );
  };
  
  const handleAddSet = (exerciseId: string) => {
    const exercise = exercises.find(e => e.id === exerciseId);
    
    if (exercise?.category === 'strength') {
      addSet(exerciseId, { weight: 0, reps: 0 });
    } else if (exercise?.category === 'cardio') {
      addSet(exerciseId, { duration: 0, distance: 0 });
    } else {
      addSet(exerciseId, {});
    }
  };
  
  const handleCompleteWorkout = () => {
    Alert.alert(
      "Complete Workout",
      "Are you sure you want to complete this workout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Complete", 
          onPress: () => {
            endWorkout(notes);
            router.replace('/workouts');
          }
        }
      ]
    );
  };
  
  const getExerciseDetails = (exerciseId: string) => {
    return exercises.find(e => e.id === exerciseId);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          headerTitle: currentWorkout.name,
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
        {currentWorkout.exercises.length === 0 ? (
          <View style={styles.emptyContainer}>
            <LinearGradient
              colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
              style={styles.emptyGradient}
            />
            <Text style={styles.emptyText}>
              Add exercises to your workout to get started.
            </Text>
            <Button 
              title="Add Exercise" 
              onPress={() => setShowExerciseSelector(true)}
              variant="primary"
              icon={<Plus size={16} color="#FFFFFF" />}
              style={{ marginTop: 16 }}
            />
          </View>
        ) : (
          <>
            {currentWorkout.exercises.map((exercise) => {
              const exerciseDetails = getExerciseDetails(exercise.exerciseId);
              
              return (
                <View key={exercise.exerciseId} style={styles.exerciseCard}>
                  <LinearGradient
                    colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
                    style={styles.exerciseCardGradient}
                  />
                  
                  <View style={styles.exerciseHeader}>
                    <View style={styles.exerciseInfo}>
                      <Text style={styles.exerciseName}>
                        {exerciseDetails?.name || 'Unknown Exercise'}
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
                    
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => handleRemoveExercise(exercise.exerciseId)}
                    >
                      <Trash2 size={20} color={Colors.error} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.setsContainer}>
                    {exercise.sets.length === 0 ? (
                      <Text style={styles.noSetsText}>No sets added yet</Text>
                    ) : (
                      <View>
                        <View style={styles.setHeader}>
                          <Text style={styles.setHeaderText}>Set</Text>
                          {exerciseDetails?.category === 'strength' && (
                            <>
                              <Text style={styles.setHeaderText}>Weight (kg)</Text>
                              <Text style={styles.setHeaderText}>Reps</Text>
                            </>
                          )}
                          {exerciseDetails?.category === 'cardio' && (
                            <>
                              <Text style={styles.setHeaderText}>Duration</Text>
                              <Text style={styles.setHeaderText}>Distance (m)</Text>
                            </>
                          )}
                          <Text style={styles.setHeaderText}>Done</Text>
                        </View>
                        
                        {exercise.sets.map((set, setIndex) => (
                          <View key={set.id} style={styles.setRow}>
                            <Text style={styles.setText}>{setIndex + 1}</Text>
                            
                            {exerciseDetails?.category === 'strength' && (
                              <>
                                <TextInput
                                  style={styles.setInput}
                                  value={set.weight?.toString() || '0'}
                                  keyboardType="numeric"
                                  placeholderTextColor={Colors.textLight}
                                  // In a real app, we would update the set here
                                />
                                <TextInput
                                  style={styles.setInput}
                                  value={set.reps?.toString() || '0'}
                                  keyboardType="numeric"
                                  placeholderTextColor={Colors.textLight}
                                  // In a real app, we would update the set here
                                />
                              </>
                            )}
                            
                            {exerciseDetails?.category === 'cardio' && (
                              <>
                                <TextInput
                                  style={styles.setInput}
                                  value={set.duration?.toString() || '0'}
                                  keyboardType="numeric"
                                  placeholderTextColor={Colors.textLight}
                                  // In a real app, we would update the set here
                                />
                                <TextInput
                                  style={styles.setInput}
                                  value={set.distance?.toString() || '0'}
                                  keyboardType="numeric"
                                  placeholderTextColor={Colors.textLight}
                                  // In a real app, we would update the set here
                                />
                              </>
                            )}
                            
                            <TouchableOpacity 
                              style={[
                                styles.completeButton,
                                set.completed && styles.completedButton
                              ]}
                              onPress={() => completeSet(set.id, !set.completed)}
                            >
                              {set.completed ? (
                                <Check size={20} color="#FFFFFF" />
                              ) : (
                                <X size={20} color={Colors.textLight} />
                              )}
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    )}
                    
                    <Button 
                      title="Add Set" 
                      onPress={() => handleAddSet(exercise.exerciseId)}
                      variant="glass"
                      size="small"
                      icon={<Plus size={14} color={Colors.primary} />}
                      style={{ marginTop: 16 }}
                    />
                  </View>
                </View>
              );
            })}
            
            <Button 
              title="Add Another Exercise" 
              onPress={() => setShowExerciseSelector(true)}
              variant="glass"
              icon={<Plus size={16} color={Colors.primary} />}
              style={{ marginTop: 16, marginBottom: 24 }}
            />
            
            <View style={styles.notesContainer}>
              <LinearGradient
                colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
                style={styles.notesGradient}
              />
              
              <View style={styles.notesHeader}>
                <FileText size={16} color={Colors.primary} />
                <Text style={styles.notesTitle}>Workout Notes</Text>
              </View>
              <TextInput
                style={styles.notesInput}
                placeholder="Add notes about your workout..."
                placeholderTextColor={Colors.textLight}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
              />
            </View>
            
            <Button 
              title="Complete Workout" 
              onPress={handleCompleteWorkout}
              variant="primary"
              style={{ marginTop: 24, marginBottom: 24 }}
            />
          </>
        )}
      </ScrollView>
      
      {showExerciseSelector && (
        <View style={styles.exerciseSelectorModal}>
          <View style={styles.exerciseSelectorContent}>
            <LinearGradient
              colors={['rgba(30, 30, 30, 0.95)', 'rgba(30, 30, 30, 0.98)']}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.exerciseSelectorTitle}>Select Exercise</Text>
            
            <ScrollView style={styles.exerciseList}>
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  compact
                  onPress={() => handleAddExercise(exercise.id)}
                />
              ))}
            </ScrollView>
            
            <Button 
              title="Cancel" 
              onPress={() => setShowExerciseSelector(false)}
              variant="glass"
              style={{ marginTop: 16 }}
            />
          </View>
        </View>
      )}
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
  emptyContainer: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  emptyGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
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
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  exerciseCategory: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  exerciseCategoryText: {
    fontSize: 12,
    color: Colors.text,
    textTransform: 'capitalize',
  },
  removeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setsContainer: {
    padding: 16,
  },
  noSetsText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 16,
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
  setInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 4,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.text,
  },
  completeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  completedButton: {
    backgroundColor: Colors.success,
  },
  notesContainer: {
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  notesGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  notesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: Colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  exerciseSelectorModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  exerciseSelectorContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  exerciseSelectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  exerciseList: {
    maxHeight: 400,
  },
});