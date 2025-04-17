import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FormAnalysisResult as FormResult } from '@/types/workout';
import Colors from '@/constants/colors';
import { exercises } from '@/mocks/exercises';
import { CheckCircle, AlertCircle, XCircle, Video } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface FormAnalysisResultProps {
  result: FormResult;
}

export default function FormAnalysisResult({ result }: FormAnalysisResultProps) {
  const exercise = exercises.find(e => e.id === result.exerciseId);
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return Colors.success;
    if (score >= 70) return Colors.warning;
    return Colors.error;
  };
  
  const getScoreIcon = (score: number) => {
    if (score >= 85) return <CheckCircle size={20} color={Colors.success} />;
    if (score >= 70) return <AlertCircle size={20} color={Colors.warning} />;
    return <XCircle size={20} color={Colors.error} />;
  };
  
  const getGradientColors = (score: number) => {
    if (score >= 85) return ['rgba(76, 217, 100, 0.2)', 'rgba(76, 217, 100, 0.05)'] as const;
    if (score >= 70) return ['rgba(255, 204, 0, 0.2)', 'rgba(255, 204, 0, 0.05)'] as const;
    return ['rgba(255, 59, 48, 0.2)', 'rgba(255, 59, 48, 0.05)'] as const;
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
        style={styles.backgroundGradient}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.exerciseName}>{exercise?.name || 'Unknown Exercise'}</Text>
            <Text style={styles.timestamp}>{formatDate(result.timestamp)}</Text>
          </View>
          
          <View style={styles.scoreContainer}>
            <LinearGradient
              colors={getGradientColors(result.score)}
              style={styles.scoreBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {getScoreIcon(result.score)}
              <Text style={[styles.scoreText, { color: getScoreColor(result.score) }]}>
                {result.score}
              </Text>
            </LinearGradient>
          </View>
        </View>
        
        {result.imageUrl && (
          <View style={styles.imageWrapper}>
            <Image 
              source={{ uri: result.imageUrl }} 
              style={styles.image} 
              resizeMode="cover"
            />
            {result.mediaType === 'video' && (
              <View style={styles.videoIndicator}>
                <Video size={16} color={Colors.text} />
                <Text style={styles.videoText}>Video Analysis</Text>
              </View>
            )}
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'transparent']}
              style={styles.imageGradient}
            />
          </View>
        )}
        
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>Feedback:</Text>
          {result.feedback.map((item, index) => (
            <View key={index} style={styles.feedbackItem}>
              <Text style={styles.feedbackBullet}>•</Text>
              <Text style={styles.feedbackText}>{item}</Text>
            </View>
          ))}
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
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.textLight,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  videoIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(138, 43, 226, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  videoText: {
    color: Colors.text,
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '500',
  },
  feedbackContainer: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  feedbackItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  feedbackBullet: {
    fontSize: 16,
    color: Colors.primary,
    marginRight: 8,
  },
  feedbackText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
    lineHeight: 20,
  },
});