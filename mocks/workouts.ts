import { Workout } from '@/types/workout';

export const workouts: Workout[] = [
  {
    id: '1',
    name: 'Full Body Strength',
    date: '2023-06-15',
    exercises: [
      {
        exerciseId: '1',
        sets: [
          { id: '101', exerciseId: '1', weight: 60, reps: 10, completed: true },
          { id: '102', exerciseId: '1', weight: 65, reps: 8, completed: true },
          { id: '103', exerciseId: '1', weight: 70, reps: 6, completed: true }
        ]
      },
      {
        exerciseId: '2',
        sets: [
          { id: '104', exerciseId: '2', weight: 100, reps: 8, completed: true },
          { id: '105', exerciseId: '2', weight: 110, reps: 6, completed: true },
          { id: '106', exerciseId: '2', weight: 120, reps: 4, completed: true }
        ]
      },
      {
        exerciseId: '3',
        sets: [
          { id: '107', exerciseId: '3', weight: 80, reps: 10, completed: true },
          { id: '108', exerciseId: '3', weight: 85, reps: 8, completed: true },
          { id: '109', exerciseId: '3', weight: 90, reps: 6, completed: true }
        ]
      }
    ],
    notes: 'Felt strong today, increased weights on all exercises',
    duration: 60,
    completed: true
  },
  {
    id: '2',
    name: 'Cardio & Core',
    date: '2023-06-17',
    exercises: [
      {
        exerciseId: '6',
        sets: [
          { id: '110', exerciseId: '6', duration: 1200, distance: 3000, completed: true }
        ]
      },
      {
        exerciseId: '7',
        sets: [
          { id: '111', exerciseId: '7', duration: 60, completed: true },
          { id: '112', exerciseId: '7', duration: 60, completed: true },
          { id: '113', exerciseId: '7', duration: 60, completed: true }
        ]
      }
    ],
    notes: 'Good cardio session, maintained pace throughout',
    duration: 45,
    completed: true
  },
  {
    id: '3',
    name: 'Upper Body Focus',
    date: '2023-06-19',
    exercises: [
      {
        exerciseId: '3',
        sets: [
          { id: '114', exerciseId: '3', weight: 80, reps: 10, completed: true },
          { id: '115', exerciseId: '3', weight: 85, reps: 8, completed: true },
          { id: '116', exerciseId: '3', weight: 90, reps: 6, completed: true }
        ]
      },
      {
        exerciseId: '4',
        sets: [
          { id: '117', exerciseId: '4', reps: 8, completed: true },
          { id: '118', exerciseId: '4', reps: 6, completed: true },
          { id: '119', exerciseId: '4', reps: 4, completed: true }
        ]
      },
      {
        exerciseId: '5',
        sets: [
          { id: '120', exerciseId: '5', weight: 50, reps: 10, completed: true },
          { id: '121', exerciseId: '5', weight: 55, reps: 8, completed: true },
          { id: '122', exerciseId: '5', weight: 60, reps: 6, completed: true }
        ]
      }
    ],
    notes: 'Shoulders feeling fatigued, but good session overall',
    duration: 50,
    completed: true
  },
  {
    id: '4',
    name: 'Lower Body Focus',
    date: '2023-06-21',
    exercises: [
      {
        exerciseId: '1',
        sets: [
          { id: '123', exerciseId: '1', weight: 65, reps: 10, completed: true },
          { id: '124', exerciseId: '1', weight: 70, reps: 8, completed: true },
          { id: '125', exerciseId: '1', weight: 75, reps: 6, completed: true }
        ]
      },
      {
        exerciseId: '2',
        sets: [
          { id: '126', exerciseId: '2', weight: 110, reps: 8, completed: true },
          { id: '127', exerciseId: '2', weight: 120, reps: 6, completed: true },
          { id: '128', exerciseId: '2', weight: 130, reps: 4, completed: true }
        ]
      },
      {
        exerciseId: '8',
        sets: [
          { id: '129', exerciseId: '8', weight: 20, reps: 12, completed: true },
          { id: '130', exerciseId: '8', weight: 25, reps: 10, completed: true },
          { id: '131', exerciseId: '8', weight: 30, reps: 8, completed: true }
        ]
      }
    ],
    notes: 'Legs are toast! Great session though.',
    duration: 55,
    completed: true
  }
];