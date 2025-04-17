import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/constants/colors';
import { Camera, Image as ImageIcon, Video, CheckCircle, AlertCircle } from 'lucide-react-native';
import Button from '@/components/Button';
import { exercises } from '@/mocks/exercises';
import { useFormAnalysisStore } from '@/store/form-analysis-store';
import FormAnalysisResult from '@/components/FormAnalysisResult';
import { LinearGradient } from 'expo-linear-gradient';

export default function CameraScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  
  const cameraRef = useRef(null);
  const { simulateAnalysis, results, getLatestResult } = useFormAnalysisStore();
  const latestResult = getLatestResult();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(cameraStatus === 'granted' && mediaStatus === 'granted');
      } else {
        setHasPermission(false); // Web doesn't have camera access in this implementation
      }
    })();
  }, []);

  const takePicture = async () => {
    // In a real app, this would use the camera to take a picture
    // For now, we'll just use the image picker as a fallback
    pickMedia('image');
  };

  const recordVideo = async () => {
    // In a real app, this would use the camera to record video
    // For now, we'll just use the video picker as a fallback
    pickMedia('video');
  };

  const pickMedia = async (type: 'image' | 'video') => {
    const mediaTypes = type === 'image' 
      ? ImagePicker.MediaTypeOptions.Images 
      : ImagePicker.MediaTypeOptions.Videos;
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
      setMediaType(type);
    }
  };

  const analyzeForm = async () => {
    if (!mediaUri) return;
    
    setAnalyzing(true);
    try {
      await simulateAnalysis(selectedExercise.id, mediaUri, mediaType);
      // Clear the captured media after analysis
      setMediaUri(null);
      setMediaType(null);
    } catch (error) {
      console.error('Error analyzing form:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const renderCameraContent = () => {
    if (hasPermission === null) {
      return (
        <View style={styles.cameraPlaceholder}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.placeholderText}>Requesting camera permission...</Text>
        </View>
      );
    }
    
    if (hasPermission === false) {
      return (
        <View style={styles.cameraPlaceholder}>
          <Camera size={48} color={Colors.textLight} />
          <Text style={styles.placeholderText}>No access to camera</Text>
          <View style={styles.mediaButtons}>
            <Button 
              title="Select Image" 
              onPress={() => pickMedia('image')}
              variant="primary"
              style={{ marginRight: 8, flex: 1 }}
            />
            <Button 
              title="Select Video" 
              onPress={() => pickMedia('video')}
              variant="secondary"
              style={{ flex: 1 }}
            />
          </View>
        </View>
      );
    }
    
    // For simplicity, we'll just show a placeholder instead of actual camera preview
    return (
      <View style={styles.cameraPlaceholder}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.5)']}
          style={StyleSheet.absoluteFill}
        />
        <Camera size={48} color={Colors.primary} />
        <Text style={styles.placeholderText}>Camera Preview</Text>
        <Text style={styles.placeholderSubtext}>
          (In a real app, this would show the camera feed)
        </Text>
        
        <View style={styles.cameraControls}>
          <TouchableOpacity 
            style={styles.galleryButton}
            onPress={() => pickMedia('image')}
          >
            <ImageIcon size={24} color={Colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.captureButton}
            onPress={takePicture}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.videoButton}
            onPress={recordVideo}
          >
            <Video size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMediaPreview = () => {
    if (!mediaUri) return null;
    
    return (
      <View style={styles.previewContainer}>
        <Image 
          source={{ uri: mediaUri }} 
          style={styles.previewImage} 
          resizeMode="contain"
        />
        {mediaType === 'video' && (
          <View style={styles.videoIndicator}>
            <Video size={24} color={Colors.text} />
            <Text style={styles.videoText}>Video</Text>
          </View>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(18, 18, 18, 0.9)']}
          style={styles.previewGradient}
        />
        
        <View style={styles.previewControls}>
          <Button 
            title="Retake" 
            onPress={() => {
              setMediaUri(null);
              setMediaType(null);
            }}
            variant="outline"
            style={{ flex: 1, marginRight: 8 }}
          />
          <Button 
            title="Analyze Form" 
            onPress={analyzeForm}
            variant="primary"
            loading={analyzing}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    );
  };

  const renderExerciseSelector = () => {
    return (
      <View style={styles.exerciseSelectorModal}>
        <View style={styles.exerciseSelectorContent}>
          <LinearGradient
            colors={['rgba(30, 30, 30, 0.95)', 'rgba(30, 30, 30, 0.98)']}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.exerciseSelectorTitle}>Select Exercise</Text>
          
          <ScrollView style={styles.exerciseList}>
            {exercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                style={[
                  styles.exerciseItem,
                  selectedExercise.id === exercise.id && styles.exerciseItemSelected
                ]}
                onPress={() => {
                  setSelectedExercise(exercise);
                  setShowExerciseSelector(false);
                }}
              >
                <Text 
                  style={[
                    styles.exerciseItemText,
                    selectedExercise.id === exercise.id && styles.exerciseItemTextSelected
                  ]}
                >
                  {exercise.name}
                </Text>
                {selectedExercise.id === exercise.id && (
                  <CheckCircle size={20} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <Button 
            title="Cancel" 
            onPress={() => setShowExerciseSelector(false)}
            variant="glass"
            style={{ marginTop: 16 }}
          />
        </View>
      </View>
    );
  };

  const renderAnalysisResults = () => {
    if (!latestResult) return null;
    
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Latest Analysis</Text>
        <FormAnalysisResult result={latestResult} />
        
        <Button 
          title="View All Results" 
          onPress={() => router.push('/analysis-history')}
          variant="glass"
          style={{ marginTop: 8 }}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          headerTitle: 'Form Analysis',
          headerTitleStyle: {
            fontWeight: '700',
            color: Colors.text,
          },
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.exerciseSelector}>
          <LinearGradient
            colors={['rgba(138, 43, 226, 0.2)', 'rgba(138, 43, 226, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.exerciseSelectorGradient}
          />
          <TouchableOpacity 
            style={styles.exerciseButton}
            onPress={() => setShowExerciseSelector(!showExerciseSelector)}
          >
            <Text style={styles.exerciseName}>{selectedExercise.name}</Text>
            <Text style={styles.exerciseHint}>Tap to change</Text>
          </TouchableOpacity>
        </View>
        
        {mediaUri ? renderMediaPreview() : renderCameraContent()}
        
        {!mediaUri && !showExerciseSelector && renderAnalysisResults()}
      </ScrollView>
      
      {showExerciseSelector && renderExerciseSelector()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  camera: {
    flex: 1,
  },
  cameraPlaceholder: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#000',
    position: 'relative',
  },
  placeholderText: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 16,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  exerciseSelector: {
    padding: 16,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  exerciseSelectorGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  exerciseButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
  },
  exerciseName: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  exerciseHint: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
    position: 'absolute',
    bottom: 40,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.text,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    height: 400,
    backgroundColor: Colors.background,
    position: 'relative',
  },
  previewImage: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  previewControls: {
    flexDirection: 'row',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  videoIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoText: {
    color: Colors.text,
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  mediaButtons: {
    flexDirection: 'row',
    marginTop: 16,
    width: '100%',
    paddingHorizontal: 16,
  },
  exerciseSelectorModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  exerciseSelectorContent: {
    width: '80%',
    maxHeight: '70%',
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  exerciseSelectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  exerciseList: {
    maxHeight: 300,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseItemSelected: {
    backgroundColor: 'rgba(138, 43, 226, 0.15)',
  },
  exerciseItemText: {
    fontSize: 16,
    color: Colors.text,
  },
  exerciseItemTextSelected: {
    fontWeight: '600',
    color: Colors.primary,
  },
  resultsContainer: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
});