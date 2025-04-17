import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';
import { useSocialStore } from '@/store/social-store';
import { useAuthStore } from '@/store/auth-store';
import SocialPost from '@/components/SocialPost';
import Button from '@/components/Button';
import { users } from '@/mocks/users';
import { LinearGradient } from 'expo-linear-gradient';

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const { posts } = useSocialStore();
  const { user, login } = useAuthStore();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // Auto-login for demo purposes
  useEffect(() => {
    const autoLogin = async () => {
      if (!user) {
        // Login as the first user in our mock data
        await login(users[0].email, 'password');
      }
      setLoading(false);
    };

    autoLogin();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          headerTitle: 'Fitness Feed',
          headerTitleStyle: {
            fontWeight: '700',
            color: Colors.text,
          },
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }} 
      />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SocialPost post={item} />}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Latest Updates</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <LinearGradient
              colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
              style={styles.emptyGradient}
            />
            <Text style={styles.emptyText}>No posts yet</Text>
            <Button 
              title="Create your first post" 
              onPress={() => {}} 
              variant="primary"
              style={{ marginTop: 16 }}
            />
          </View>
        }
      />
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
  listContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 200,
  },
  emptyGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});