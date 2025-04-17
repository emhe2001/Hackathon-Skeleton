import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { Settings, Camera, LogOut, Users, Edit } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { useWorkoutStore } from '@/store/workout-store';
import { useSocialStore } from '@/store/social-store';
import ProfileStats from '@/components/ProfileStats';
import SocialPost from '@/components/SocialPost';
import Button from '@/components/Button';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { userStats } = useWorkoutStore();
  const { posts } = useSocialStore();
  
  // Filter posts by current user
  const userPosts = user ? posts.filter(post => post.userId === user.id) : [];

  if (!user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.title}>Please log in</Text>
        <Button 
          title="Log In" 
          onPress={() => router.push('/login')}
          variant="primary"
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          headerTitle: 'Profile',
          headerTitleStyle: {
            fontWeight: '700',
            color: Colors.text,
          },
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerRight: () => (
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => router.push('/settings')}
            >
              <Settings size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={['rgba(138, 43, 226, 0.2)', 'rgba(255, 20, 147, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          />
          
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user.avatar }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Camera size={16} color={Colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.bio}>{user.bio || 'No bio yet'}</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userPosts.length}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <Button 
            title="Edit Profile" 
            onPress={() => router.push('/edit-profile')}
            variant="glass"
            icon={<Edit size={16} color={Colors.primary} />}
            style={{ flex: 1, marginRight: 8 }}
          />
          
          <Button 
            title="Find Friends" 
            onPress={() => router.push('/find-friends')}
            variant="glass"
            icon={<Users size={16} color={Colors.primary} />}
            style={{ flex: 1 }}
          />
        </View>
        
        <ProfileStats stats={userStats} />
        
        <View style={styles.postsHeader}>
          <Text style={styles.postsTitle}>Your Posts</Text>
          <TouchableOpacity onPress={() => router.push('/create-post')}>
            <Text style={styles.newPostText}>New Post</Text>
          </TouchableOpacity>
        </View>
        
        {userPosts.length > 0 ? (
          userPosts.map(post => (
            <SocialPost key={post.id} post={post} />
          ))
        ) : (
          <View style={styles.emptyPosts}>
            <LinearGradient
              colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
              style={styles.emptyPostsGradient}
            />
            <Text style={styles.emptyPostsText}>
              You haven't posted anything yet. Share your fitness journey with others!
            </Text>
            <Button 
              title="Create Your First Post" 
              onPress={() => router.push('/create-post')}
              variant="primary"
              style={{ marginTop: 16 }}
            />
          </View>
        )}
        
        <Button 
          title="Log Out" 
          onPress={logout}
          variant="glass"
          icon={<LogOut size={16} color={Colors.error} />}
          style={{ marginTop: 24, marginBottom: 24 }}
          textStyle={{ color: Colors.error }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  profileInfo: {
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  postsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  newPostText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  emptyPosts: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  emptyPostsGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  emptyPostsText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});