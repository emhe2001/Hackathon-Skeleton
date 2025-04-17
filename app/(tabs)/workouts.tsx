import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { Plus, Calendar, Dumbbell } from 'lucide-react-native';
import { useWorkoutStore } from '@/store/workout-store';
import WorkoutCard from '@/components/WorkoutCard';
import Button from '@/components/Button';
import { LinearGradient } from 'expo-linear-gradient';

export default function WorkoutsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { workouts, currentWorkout, startWorkout } = useWorkoutStore();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'history' | 'current'>('history');

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleStartWorkout = () => {
    startWorkout('New Workout');
    setActiveTab('current');
  };

  const handleWorkoutPress = (workoutId: string) => {
    router.push(`/workout-details/${workoutId}`);
  };

  const renderEmptyHistory = () => (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
        style={styles.emptyGradient}
      />
      <Dumbbell size={48} color={Colors.textLight} />
      <Text style={styles.emptyTitle}>No workouts yet</Text>
      <Text style={styles.emptyText}>
        Start tracking your workouts to see your progress over time.
      </Text>
      <Button 
        title="Start Your First Workout" 
        onPress={handleStartWorkout}
        variant="primary"
        style={{ marginTop: 24 }}
      />
    </View>
  );

  const renderEmptyCurrent = () => (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
        style={styles.emptyGradient}
      />
      <Calendar size={48} color={Colors.textLight} />
      <Text style={styles.emptyTitle}>No active workout</Text>
      <Text style={styles.emptyText}>
        Start a new workout session to track your exercises and sets.
      </Text>
      <Button 
        title="Start New Workout" 
        onPress={handleStartWorkout}
        variant="primary"
        style={{ marginTop: 24 }}
      />
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          headerTitle: 'Workouts',
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
              onPress={handleStartWorkout}
            >
              <Plus size={24} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }} 
      />

      <View style={styles.tabContainer}>
        <LinearGradient
          colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
          style={styles.tabGradient}
        />
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'history' && styles.activeTab
          ]}
          onPress={() => setActiveTab('history')}
        >
          {activeTab === 'history' && (
            <LinearGradient
              colors={['#8A2BE2', '#4A0082']}
              style={StyleSheet.absoluteFill}
            />
          )}
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'history' && styles.activeTabText
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'current' && styles.activeTab
          ]}
          onPress={() => setActiveTab('current')}
        >
          {activeTab === 'current' && (
            <LinearGradient
              colors={['#8A2BE2', '#4A0082']}
              style={StyleSheet.absoluteFill}
            />
          )}
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'current' && styles.activeTabText
            ]}
          >
            Current
          </Text>
          {currentWorkout && (
            <View style={styles.badge} />
          )}
        </TouchableOpacity>
      </View>

      {activeTab === 'history' ? (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WorkoutCard 
              workout={item} 
              onPress={() => handleWorkoutPress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyHistory}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
        />
      ) : (
        <View style={styles.currentContainer}>
          {currentWorkout ? (
            <>
              <WorkoutCard workout={currentWorkout} />
              <Button 
                title="Continue Workout" 
                onPress={() => router.push('/current-workout')}
                variant="primary"
                style={{ marginTop: 16 }}
              />
            </>
          ) : (
            renderEmptyCurrent()
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  tabGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  activeTab: {
    // Gradient is applied as a child
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  activeTabText: {
    color: Colors.text,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 24,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  currentContainer: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    minHeight: 400,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  emptyGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
});