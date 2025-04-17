import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { Post } from '@/types/workout';
import Colors from '@/constants/colors';
import { Heart, MessageCircle, Share2, Send } from 'lucide-react-native';
import { useSocialStore } from '@/store/social-store';
import { useAuthStore } from '@/store/auth-store';
import { LinearGradient } from 'expo-linear-gradient';

interface SocialPostProps {
  post: Post;
  onPress?: () => void;
}

export default function SocialPost({ post, onPress }: SocialPostProps) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  const { likePost, unlikePost, addComment } = useSocialStore();
  const { user } = useAuthStore();

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return diffDay === 1 ? '1 day ago' : `${diffDay} days ago`;
    } else if (diffHour > 0) {
      return diffHour === 1 ? '1 hour ago' : `${diffHour} hours ago`;
    } else if (diffMin > 0) {
      return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`;
    } else {
      return 'Just now';
    }
  };

  const handleLike = () => {
    if (liked) {
      unlikePost(post.id);
      setLiked(false);
    } else {
      likePost(post.id);
      setLiked(true);
    }
  };

  const handleComment = () => {
    if (!user || !newComment.trim()) return;

    addComment(post.id, {
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      content: newComment.trim()
    });

    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
        style={styles.gradient}
      />
      
      <Pressable onPress={onPress} style={styles.content}>
        <View style={styles.header}>
          <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.timestamp}>{formatTimestamp(post.timestamp)}</Text>
          </View>
        </View>

        <Text style={styles.postContent}>{post.content}</Text>

        {post.imageUrl && (
          <View style={styles.imageWrapper}>
            <Image 
              source={{ uri: post.imageUrl }} 
              style={styles.postImage} 
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'transparent']}
              style={styles.imageGradient}
            />
          </View>
        )}

        <View style={styles.stats}>
          <Text style={styles.likesText}>
            {post.likes + (liked ? 1 : 0)} likes
          </Text>
          <Text style={styles.commentsText}>
            {post.comments.length} comments
          </Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable 
          style={styles.actionButton} 
          onPress={handleLike}
          android_ripple={{ color: Colors.highlight }}
        >
          <Heart 
            size={20} 
            color={liked ? Colors.secondary : Colors.textSecondary} 
            fill={liked ? Colors.secondary : 'transparent'} 
          />
          <Text style={[
            styles.actionText, 
            liked && { color: Colors.secondary }
          ]}>
            Like
          </Text>
        </Pressable>

        <Pressable 
          style={styles.actionButton} 
          onPress={() => setShowComments(!showComments)}
          android_ripple={{ color: Colors.highlight }}
        >
          <MessageCircle size={20} color={Colors.textSecondary} />
          <Text style={styles.actionText}>Comment</Text>
        </Pressable>

        <Pressable 
          style={styles.actionButton}
          android_ripple={{ color: Colors.highlight }}
        >
          <Share2 size={20} color={Colors.textSecondary} />
          <Text style={styles.actionText}>Share</Text>
        </Pressable>
      </View>

      {showComments && (
        <View style={styles.commentsSection}>
          {post.comments.map(comment => (
            <View key={comment.id} style={styles.commentContainer}>
              <Image source={{ uri: comment.userAvatar }} style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <LinearGradient
                  colors={['rgba(138, 43, 226, 0.15)', 'rgba(138, 43, 226, 0.05)']}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <Text style={styles.commentUsername}>{comment.username}</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
                <Text style={styles.commentTimestamp}>
                  {formatTimestamp(comment.timestamp)}
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.addCommentContainer}>
            {user && (
              <Image source={{ uri: user.avatar }} style={styles.commentAvatar} />
            )}
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor={Colors.textLight}
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <Pressable 
              onPress={handleComment}
              disabled={!newComment.trim()}
            >
              <Send 
                size={20} 
                color={newComment.trim() ? Colors.primary : Colors.textLight} 
              />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'relative',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.textLight,
  },
  postContent: {
    marginBottom: 12,
    fontSize: 16,
    color: Colors.text,
    lineHeight: 22,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  likesText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  commentsText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  commentsSection: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  commentContent: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: Colors.text,
  },
  commentTimestamp: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 14,
    color: Colors.text,
    maxHeight: 100,
  },
});