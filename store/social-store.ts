import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post, Comment } from '@/types/workout';
import { posts as mockPosts } from '@/mocks/posts';

interface SocialState {
  posts: Post[];
  
  // Post actions
  createPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'timestamp'>) => void;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  
  // Comment actions
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  
  // Getters
  getPostById: (postId: string) => Post | undefined;
  getPostsByUserId: (userId: string) => Post[];
}

export const useSocialStore = create<SocialState>()(
  persist(
    (set, get) => ({
      posts: [...mockPosts], // Start with mock data
      
      createPost: (postData) => {
        const newPost: Post = {
          id: Date.now().toString(),
          ...postData,
          likes: 0,
          comments: [],
          timestamp: new Date().toISOString()
        };
        
        set(state => ({
          posts: [newPost, ...state.posts]
        }));
      },
      
      likePost: (postId: string) => {
        set(state => ({
          posts: state.posts.map(post => 
            post.id === postId
              ? { ...post, likes: post.likes + 1 }
              : post
          )
        }));
      },
      
      unlikePost: (postId: string) => {
        set(state => ({
          posts: state.posts.map(post => 
            post.id === postId && post.likes > 0
              ? { ...post, likes: post.likes - 1 }
              : post
          )
        }));
      },
      
      addComment: (postId: string, commentData) => {
        const newComment: Comment = {
          id: Date.now().toString(),
          ...commentData,
          timestamp: new Date().toISOString()
        };
        
        set(state => ({
          posts: state.posts.map(post => 
            post.id === postId
              ? { ...post, comments: [...post.comments, newComment] }
              : post
          )
        }));
      },
      
      getPostById: (postId: string) => {
        return get().posts.find(post => post.id === postId);
      },
      
      getPostsByUserId: (userId: string) => {
        return get().posts.filter(post => post.userId === userId);
      }
    }),
    {
      name: 'social-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);