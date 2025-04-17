import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { UserStats } from '@/types/workout';
import { Trophy, Dumbbell, Calendar, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileStatsProps {
  stats: UserStats;
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
        style={styles.backgroundGradient}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.levelContainer}>
            <Trophy size={20} color={Colors.primary} />
            <Text style={styles.levelText}>Level {stats.level}</Text>
          </View>
          <View style={styles.rankContainer}>
            <LinearGradient
              colors={['#8A2BE2', '#4A0082']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.rankText}>{stats.rank}</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={['#8A2BE2', '#FF1493']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.progressFill, 
                { width: `${Math.min(100, (stats.experience % 1000) / 10)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {stats.experience % 1000} / 1000 XP to next level
          </Text>
        </View>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <LinearGradient
              colors={['rgba(138, 43, 226, 0.1)', 'rgba(138, 43, 226, 0.05)']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Calendar size={20} color={Colors.primary} />
            <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          
          <View style={styles.statItem}>
            <LinearGradient
              colors={['rgba(138, 43, 226, 0.1)', 'rgba(138, 43, 226, 0.05)']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Dumbbell size={20} color={Colors.primary} />
            <Text style={styles.statValue}>{stats.totalSets}</Text>
            <Text style={styles.statLabel}>Sets</Text>
          </View>
          
          <View style={styles.statItem}>
            <LinearGradient
              colors={['rgba(138, 43, 226, 0.1)', 'rgba(138, 43, 226, 0.05)']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <TrendingUp size={20} color={Colors.primary} />
            <Text style={styles.statValue}>{stats.totalWeight.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total kg</Text>
          </View>
          
          <View style={styles.statItem}>
            <LinearGradient
              colors={['rgba(138, 43, 226, 0.1)', 'rgba(138, 43, 226, 0.05)']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Calendar size={20} color={Colors.primary} />
            <Text style={styles.statValue}>{stats.streakDays}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </View>
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
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  rankContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    overflow: 'hidden',
  },
  rankText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});