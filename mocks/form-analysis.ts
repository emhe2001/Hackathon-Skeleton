import { FormAnalysisResult } from '@/types/workout';

export const formAnalysisResults: FormAnalysisResult[] = [
  {
    id: '1',
    exerciseId: '1', // Squat
    timestamp: '2023-06-15T14:30:00Z',
    score: 85,
    feedback: [
      'Good depth on your squat',
      'Knees are tracking well over toes',
      'Try to keep your chest up a bit more',
      'Weight is properly distributed through your heels'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    exerciseId: '2', // Deadlift
    timestamp: '2023-06-16T15:45:00Z',
    score: 78,
    feedback: [
      'Bar path is good, staying close to your body',
      'Your back could be a bit flatter at the start',
      'Good hip hinge movement',
      'Remember to fully lock out at the top'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1598575468023-f9472c9e1abe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    exerciseId: '3', // Bench Press
    timestamp: '2023-06-17T10:15:00Z',
    score: 92,
    feedback: [
      'Great bar path',
      'Good arch in your back',
      'Elbows are at the right angle',
      'Full range of motion achieved'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534368786749-b63e05c92717?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '4',
    exerciseId: '8', // Lunges
    timestamp: '2023-06-18T09:30:00Z',
    score: 75,
    feedback: [
      'Good depth on your lunges',
      'Front knee is going a bit too far forward',
      'Try to keep your torso more upright',
      'Step length is appropriate'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];