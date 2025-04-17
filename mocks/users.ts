import { User } from '@/types/user';

export const users: User[] = [
  {
    id: '1',
    username: 'fitness_pro',
    email: 'fitness_pro@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Personal trainer and nutrition coach. Helping people achieve their fitness goals for over 5 years.',
    level: 42,
    experience: 8400,
    rank: 'Elite',
    joinDate: '2021-03-15',
    followers: 1250,
    following: 345
  },
  {
    id: '2',
    username: 'strength_builder',
    email: 'strength_builder@example.com',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Powerlifter and strength coach. Current PR: 500lb deadlift, 405lb squat, 315lb bench.',
    level: 35,
    experience: 7000,
    rank: 'Advanced',
    joinDate: '2021-05-22',
    followers: 850,
    following: 420
  },
  {
    id: '3',
    username: 'cardio_queen',
    email: 'cardio_queen@example.com',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Marathon runner and yoga enthusiast. Completed 6 marathons and counting!',
    level: 28,
    experience: 5600,
    rank: 'Intermediate',
    joinDate: '2021-08-10',
    followers: 620,
    following: 310
  },
  {
    id: '4',
    username: 'fitness_newbie',
    email: 'fitness_newbie@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Just starting my fitness journey. Looking to lose weight and build strength.',
    level: 5,
    experience: 1000,
    rank: 'Beginner',
    joinDate: '2023-01-05',
    followers: 45,
    following: 120
  }
];