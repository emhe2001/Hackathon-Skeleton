export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  level: number;
  experience: number;
  rank: string;
  joinDate: string;
  followers: number;
  following: number;
}