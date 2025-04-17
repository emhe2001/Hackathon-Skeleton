import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Workout, WorkoutSet, UserStats } from '@/types/workout';
import { workouts as mockWorkouts } from '@/mocks/workouts';

interface WorkoutState {
  workouts: Workout[];
  currentWorkout: Workout | null;
  userStats: UserStats;
  
  // Workout actions
  startWorkout: (name: string) => void;
  endWorkout: (notes?: string) => void;
  addExerciseToWorkout: (exerciseId: string) => void;
  removeExerciseFromWorkout: (exerciseId: string) => void;
  
  // Set actions
  addSet: (exerciseId: string, set: Partial<WorkoutSet>) => void;
  updateSet: (setId: string, updates: Partial<WorkoutSet>) => void;
  completeSet: (setId: string, completed: boolean) => void;
  
  // History actions
  getWorkoutHistory: () => Workout[];
  getWorkoutById: (id: string) => Workout | undefined;
  
  // Stats
  updateStats: () => void;
}

// Initial stats
const initialStats: UserStats = {
  totalWorkouts: 0,
  totalExercises: 0,
  totalSets: 0,
  totalWeight: 0,
  streakDays: 0,
  level: 1,
  experience: 0,
  rank: 'Beginner'
};

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      workouts: [...mockWorkouts], // Start with mock data
      currentWorkout: null,
      userStats: initialStats,
      
      startWorkout: (name: string) => {
        const newWorkout: Workout = {
          id: Date.now().toString(),
          name,
          date: new Date().toISOString().split('T')[0],
          exercises: [],
          duration: 0,
          completed: false
        };
        
        set({ currentWorkout: newWorkout });
      },
      
      endWorkout: (notes?: string) => {
        const { currentWorkout, workouts } = get();
        
        if (currentWorkout) {
          const completedWorkout: Workout = {
            ...currentWorkout,
            notes,
            completed: true,
            duration: Math.floor(Math.random() * 60) + 30 // Mock duration between 30-90 mins
          };
          
          set({
            workouts: [completedWorkout, ...workouts],
            currentWorkout: null
          });
          
          // Update stats after workout completion
          get().updateStats();
        }
      },
      
      addExerciseToWorkout: (exerciseId: string) => {
        const { currentWorkout } = get();
        
        if (currentWorkout) {
          // Check if exercise already exists
          if (currentWorkout.exercises.some(e => e.exerciseId === exerciseId)) {
            return;
          }
          
          const updatedWorkout = {
            ...currentWorkout,
            exercises: [
              ...currentWorkout.exercises,
              {
                exerciseId,
                sets: []
              }
            ]
          };
          
          set({ currentWorkout: updatedWorkout });
        }
      },
      
      removeExerciseFromWorkout: (exerciseId: string) => {
        const { currentWorkout } = get();
        
        if (currentWorkout) {
          const updatedWorkout = {
            ...currentWorkout,
            exercises: currentWorkout.exercises.filter(
              e => e.exerciseId !== exerciseId
            )
          };
          
          set({ currentWorkout: updatedWorkout });
        }
      },
      
      addSet: (exerciseId: string, setData: Partial<WorkoutSet>) => {
        const { currentWorkout } = get();
        
        if (currentWorkout) {
          const newSet: WorkoutSet = {
            id: Date.now().toString(),
            exerciseId,
            weight: setData.weight,
            reps: setData.reps,
            duration: setData.duration,
            distance: setData.distance,
            completed: false
          };
          
          const updatedWorkout = {
            ...currentWorkout,
            exercises: currentWorkout.exercises.map(exercise => {
              if (exercise.exerciseId === exerciseId) {
                return {
                  ...exercise,
                  sets: [...exercise.sets, newSet]
                };
              }
              return exercise;
            })
          };
          
          set({ currentWorkout: updatedWorkout });
        }
      },
      
      updateSet: (setId: string, updates: Partial<WorkoutSet>) => {
        const { currentWorkout } = get();
        
        if (currentWorkout) {
          const updatedWorkout = {
            ...currentWorkout,
            exercises: currentWorkout.exercises.map(exercise => ({
              ...exercise,
              sets: exercise.sets.map(set => 
                set.id === setId ? { ...set, ...updates } : set
              )
            }))
          };
          
          set({ currentWorkout: updatedWorkout });
        }
      },
      
      completeSet: (setId: string, completed: boolean) => {
        const { currentWorkout } = get();
        
        if (currentWorkout) {
          const updatedWorkout = {
            ...currentWorkout,
            exercises: currentWorkout.exercises.map(exercise => ({
              ...exercise,
              sets: exercise.sets.map(set => 
                set.id === setId ? { ...set, completed } : set
              )
            }))
          };
          
          set({ currentWorkout: updatedWorkout });
        }
      },
      
      getWorkoutHistory: () => {
        return get().workouts;
      },
      
      getWorkoutById: (id: string) => {
        return get().workouts.find(workout => workout.id === id);
      },
      
      updateStats: () => {
        const { workouts, userStats } = get();
        
        // Calculate basic stats
        const totalWorkouts = workouts.length;
        let totalExercises = 0;
        let totalSets = 0;
        let totalWeight = 0;
        
        workouts.forEach(workout => {
          totalExercises += workout.exercises.length;
          
          workout.exercises.forEach(exercise => {
            totalSets += exercise.sets.length;
            
            exercise.sets.forEach(set => {
              if (set.weight) {
                totalWeight += set.weight * (set.reps || 1);
              }
            });
          });
        });
        
        // Calculate streak
        const dates = workouts.map(w => w.date).sort();
        let streakDays = 0;
        
        if (dates.length > 0) {
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          
          if (dates.includes(today) || dates.includes(yesterday)) {
            streakDays = 1;
            
            // Count back from yesterday to find streak
            let checkDate = new Date(Date.now() - 86400000);
            
            while (true) {
              const dateStr = checkDate.toISOString().split('T')[0];
              if (dates.includes(dateStr)) {
                streakDays++;
                checkDate = new Date(checkDate.getTime() - 86400000);
              } else {
                break;
              }
            }
          }
        }
        
        // Calculate level and rank
        const experience = totalWorkouts * 100 + totalSets * 10;
        const level = Math.floor(Math.sqrt(experience / 100)) + 1;
        
        let rank = 'Beginner';
        if (level >= 30) rank = 'Elite';
        else if (level >= 20) rank = 'Advanced';
        else if (level >= 10) rank = 'Intermediate';
        
        set({
          userStats: {
            totalWorkouts,
            totalExercises,
            totalSets,
            totalWeight,
            streakDays,
            level,
            experience,
            rank
          }
        });
      }
    }),
    {
      name: 'workout-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);