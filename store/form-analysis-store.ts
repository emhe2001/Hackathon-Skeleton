import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormAnalysisResult } from '@/types/workout';
import { formAnalysisResults as mockResults } from '@/mocks/form-analysis';
import { exercises } from '@/mocks/exercises';

interface FormAnalysisState {
  results: FormAnalysisResult[];
  isAnalyzing: boolean;
  
  // Analysis actions
  startAnalysis: (exerciseId: string) => void;
  stopAnalysis: () => void;
  saveAnalysisResult: (result: Omit<FormAnalysisResult, 'id' | 'timestamp'>) => void;
  
  // Mock analysis (for demo)
  simulateAnalysis: (exerciseId: string, mediaUri?: string, mediaType?: 'image' | 'video' | null) => Promise<FormAnalysisResult>;
  
  // Getters
  getResultsByExerciseId: (exerciseId: string) => FormAnalysisResult[];
  getLatestResult: () => FormAnalysisResult | undefined;
}

export const useFormAnalysisStore = create<FormAnalysisState>()(
  persist(
    (set, get) => ({
      results: [...mockResults], // Start with mock data
      isAnalyzing: false,
      
      startAnalysis: (exerciseId: string) => {
        set({ isAnalyzing: true });
      },
      
      stopAnalysis: () => {
        set({ isAnalyzing: false });
      },
      
      saveAnalysisResult: (resultData) => {
        const newResult: FormAnalysisResult = {
          id: Date.now().toString(),
          ...resultData,
          timestamp: new Date().toISOString()
        };
        
        set(state => ({
          results: [newResult, ...state.results],
          isAnalyzing: false
        }));
      },
      
      simulateAnalysis: async (exerciseId: string, mediaUri?: string, mediaType?: 'image' | 'video' | null) => {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get exercise details
        const exercise = exercises.find(e => e.id === exerciseId);
        
        // Generate random score between 65-95
        // Videos get a slightly higher score on average for demo purposes
        const baseScore = mediaType === 'video' ? 75 : 65;
        const scoreRange = mediaType === 'video' ? 25 : 30;
        const score = Math.floor(Math.random() * scoreRange) + baseScore;
        
        // Select random feedback based on score
        let feedback: string[] = [];
        
        if (exercise) {
          // Always include 1-2 positive points
          const positiveFeedback = [
            `Good ${exercise.name.toLowerCase()} form overall`,
            `Your ${exercise.targetMuscles[0]} engagement looks good`,
            'Nice controlled movement',
            'Good tempo on the exercise',
            'Proper range of motion achieved'
          ];
          
          // Include 1-3 improvement points based on score
          const improvementFeedback = exercise.formTips.map(tip => `Try to ${tip.toLowerCase()}`);
          
          // Add video-specific feedback if applicable
          if (mediaType === 'video') {
            positiveFeedback.push(
              'Video analysis provides better insights than static images',
              'Good consistency throughout the movement'
            );
          }
          
          // Add 1-2 positive points
          feedback = feedback.concat(
            positiveFeedback.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 1)
          );
          
          // Add improvement points based on score
          const improvementCount = score > 85 ? 1 : score > 75 ? 2 : 3;
          feedback = feedback.concat(
            improvementFeedback.sort(() => 0.5 - Math.random()).slice(0, improvementCount)
          );
        } else {
          feedback = ['Keep your form tight', 'Focus on controlled movements'];
        }
        
        const result: FormAnalysisResult = {
          id: Date.now().toString(),
          exerciseId,
          timestamp: new Date().toISOString(),
          score,
          feedback,
          imageUrl: mediaUri,
          mediaType: mediaType || 'image'
        };
        
        // Save the result
        set(state => ({
          results: [result, ...state.results]
        }));
        
        return result;
      },
      
      getResultsByExerciseId: (exerciseId: string) => {
        return get().results.filter(result => result.exerciseId === exerciseId);
      },
      
      getLatestResult: () => {
        const { results } = get();
        return results.length > 0 ? results[0] : undefined;
      }
    }),
    {
      name: 'form-analysis-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);