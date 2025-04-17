import { Exercise } from '@/types/workout';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Squat',
    category: 'strength',
    targetMuscles: ['quadriceps', 'hamstrings', 'glutes', 'core'],
    description: 'A compound exercise that targets the muscles of the lower body.',
    formTips: [
      'Keep your feet shoulder-width apart',
      'Keep your back straight',
      'Knees should track over toes',
      'Lower until thighs are parallel to ground',
      'Push through heels to return to standing'
    ],
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    name: 'Deadlift',
    category: 'strength',
    targetMuscles: ['hamstrings', 'glutes', 'lower back', 'traps'],
    description: 'A compound exercise that targets the posterior chain muscles.',
    formTips: [
      'Start with feet hip-width apart',
      'Grip the bar just outside your legs',
      'Keep your back flat and chest up',
      'Push through your heels',
      'Keep the bar close to your body throughout the movement'
    ],
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1598575468023-f9472c9e1abe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    name: 'Bench Press',
    category: 'strength',
    targetMuscles: ['chest', 'shoulders', 'triceps'],
    description: 'A compound exercise that targets the muscles of the upper body.',
    formTips: [
      'Lie flat on the bench with feet on the ground',
      'Grip the bar slightly wider than shoulder-width',
      'Lower the bar to mid-chest',
      'Keep elbows at about 45 degrees from your body',
      'Push the bar straight up'
    ],
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1534368786749-b63e05c92717?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '4',
    name: 'Pull-up',
    category: 'strength',
    targetMuscles: ['lats', 'biceps', 'upper back'],
    description: 'A compound exercise that targets the muscles of the upper back and arms.',
    formTips: [
      'Grip the bar with hands slightly wider than shoulder-width',
      'Start from a dead hang',
      'Pull up until your chin is over the bar',
      'Lower with control',
      'Avoid swinging or kipping'
    ],
    difficulty: 'advanced',
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '5',
    name: 'Overhead Press',
    category: 'strength',
    targetMuscles: ['shoulders', 'triceps', 'upper chest'],
    description: 'A compound exercise that targets the muscles of the shoulders and arms.',
    formTips: [
      'Start with the bar at shoulder height',
      'Grip the bar slightly wider than shoulder-width',
      'Press the bar straight up over your head',
      'Keep your core tight and avoid arching your back',
      'Lower the bar with control'
    ],
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '6',
    name: 'Running',
    category: 'cardio',
    targetMuscles: ['quadriceps', 'hamstrings', 'calves', 'core'],
    description: 'A cardiovascular exercise that improves endurance and burns calories.',
    formTips: [
      'Land midfoot, not on your heels',
      'Keep your back straight and chest up',
      'Swing arms at 90-degree angles',
      'Look ahead, not down at your feet',
      'Breathe rhythmically'
    ],
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '7',
    name: 'Plank',
    category: 'strength',
    targetMuscles: ['core', 'shoulders', 'back'],
    description: 'An isometric core exercise that improves stability and posture.',
    formTips: [
      'Place forearms on the ground with elbows under shoulders',
      'Keep your body in a straight line from head to heels',
      'Engage your core and glutes',
      "Don't let your hips sag or pike up",
      'Breathe normally throughout'
    ],
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '8',
    name: 'Lunges',
    category: 'strength',
    targetMuscles: ['quadriceps', 'hamstrings', 'glutes', 'calves'],
    description: 'A unilateral exercise that targets the muscles of the lower body.',
    formTips: [
      'Step forward with one leg',
      'Lower your body until both knees are bent at 90 degrees',
      'Keep your front knee over your ankle, not past your toes',
      'Keep your torso upright',
      'Push through your front heel to return to standing'
    ],
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];