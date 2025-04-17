export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  targetMuscles: string[];
  description: string;
  formTips: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
}

export type ExerciseCategory = 
  | 'strength' 
  | 'cardio' 
  | 'flexibility' 
  | 'balance' 
  | 'functional';

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  weight?: number;
  reps?: number;
  duration?: number; // in seconds
  distance?: number; // in meters
  completed: boolean;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: WorkoutExercise[];
  notes?: string;
  duration: number; // in minutes
  completed: boolean;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
}

export interface FormAnalysisResult {
  id: string;
  exerciseId: string;
  timestamp: string;
  score: number; // 0-100
  feedback: string[];
  imageUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface UserStats {
  totalWorkouts: number;
  totalExercises: number;
  totalSets: number;
  totalWeight: number; // in kg
  streakDays: number;
  level: number;
  experience: number;
  rank: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  workoutId?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}