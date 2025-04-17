import { Post } from '@/types/workout';

export const posts: Post[] = [
  {
    id: '1',
    userId: '1',
    username: 'fitness_pro',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    content: 'Just crushed a new PR on deadlifts! 405lbs x 3 reps. Hard work pays off! 💪',
    imageUrl: 'https://images.unsplash.com/photo-1598575468023-f9472c9e1abe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    workoutId: '1',
    likes: 156,
    comments: [
      {
        id: '101',
        userId: '2',
        username: 'strength_builder',
        userAvatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: 'Beast mode! Keep it up! 🔥',
        timestamp: '2023-06-15T14:35:00Z'
      },
      {
        id: '102',
        userId: '3',
        username: 'cardio_queen',
        userAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: "What's your training split like?",
        timestamp: '2023-06-15T15:12:00Z'
      }
    ],
    timestamp: '2023-06-15T14:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    username: 'strength_builder',
    userAvatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    content: 'Form check on my squat. Trying to hit depth while keeping my back straight. Any tips?',
    videoUrl: 'https://example.com/squat-video.mp4',
    likes: 89,
    comments: [
      {
        id: '103',
        userId: '1',
        username: 'fitness_pro',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: 'Looking solid! Try pointing your toes out slightly more to help with depth.',
        timestamp: '2023-06-16T10:45:00Z'
      }
    ],
    timestamp: '2023-06-16T10:30:00Z'
  },
  {
    id: '3',
    userId: '3',
    username: 'cardio_queen',
    userAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    content: 'Morning run complete! 10K in 45 minutes. Perfect way to start the day. 🏃‍♀️',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    workoutId: '2',
    likes: 112,
    comments: [
      {
        id: '104',
        userId: '4',
        username: 'fitness_newbie',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: "That's impressive! I'm still working on my first 5K.",
        timestamp: '2023-06-17T08:15:00Z'
      },
      {
        id: '105',
        userId: '1',
        username: 'fitness_pro',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: "What's your next race?",
        timestamp: '2023-06-17T09:30:00Z'
      }
    ],
    timestamp: '2023-06-17T08:00:00Z'
  },
  {
    id: '4',
    userId: '4',
    username: 'fitness_newbie',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    content: "First time trying deadlifts today. How's my form looking? Any tips appreciated!",
    imageUrl: 'https://images.unsplash.com/photo-1598575468023-f9472c9e1abe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    likes: 34,
    comments: [
      {
        id: '106',
        userId: '2',
        username: 'strength_builder',
        userAvatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: 'Looking good for a beginner! Try to keep your back a bit flatter and push through your heels.',
        timestamp: '2023-06-18T16:45:00Z'
      },
      {
        id: '107',
        userId: '1',
        username: 'fitness_pro',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: 'Great start! Focus on bracing your core before each rep. Keep it up!',
        timestamp: '2023-06-18T17:30:00Z'
      }
    ],
    timestamp: '2023-06-18T16:30:00Z'
  }
];