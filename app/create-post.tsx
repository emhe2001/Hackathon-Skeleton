import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/constants/colors';
import { ArrowLeft, Image as ImageIcon, X, CheckCircle, Dumbbell } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { useSocialStore } from '@/store/social-store';
import { useWorkoutStore } from '@/store/workout-store';
import Button from '@/components/Button';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreatePostScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuthStore();
  const { createPost } = useSocialStore();
  const { workouts } = useWorkoutStore();
  
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const [showWorkoutSelector, setShowWorkoutSelector] = useState(false);
  
  if (!user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>You need to be logged in to create a post</Text>
        <Button 
          title="Go Back" 
          onPress={() => router.back()}
          variant="outline"
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  
  const handleCreatePost = () => {
    if (!content.trim()) {
      Alert.alert("Error", "Please enter some content for your post");
      return;
    }
    
    createPost({
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      content: content.trim(),
      imageUrl: imageUri || undefined,
      workoutId: selectedWorkoutId || undefined,
    });
    
    Alert.alert(
      "Success",
      "Your post has been created!",
      [
        { 
          text: "OK", 
          onPress: () => router.back()
        }
      ]
    );
  };
  
  const getSelectedWorkout = () => {
    return workouts.find(w => w.id === selectedWorkoutId);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          headerTitle: 'Create Post',
          headerTitleStyle: {
            fontWeight: '700',
            color: Colors.text,
          },
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{user.username}</Text>
        </View>
        
        <View style={styles.contentInputContainer}>
          <LinearGradient
            colors={Colors.gradientPurple}
            style={styles.contentInputGradient}
          />
          <TextInput
            style={styles.contentInput}
            placeholder="What's on your mind?"
            placeholderTextColor={Colors.textLight}
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={5}
            autoFocus
          />
        </View>
        
        {imageUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.postImage} />
            <TouchableOpacity 
              style={styles.removeImageButton}
              onPress={() => setImageUri(null)}
            >
              <X size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
        
        {selectedWorkoutId && (
          <View style={styles.selectedWorkout}>
            <LinearGradient
              colors={Colors.gradientPurple}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.selectedWorkoutGradient}
            />
            <Text style={styles.workoutLabel}>Workout:</Text>
            <Text style={styles.workoutName}>{getSelectedWorkout()?.name}</Text>
            <TouchableOpacity 
              style={styles.removeWorkoutButton}
              onPress={() => setSelectedWorkoutId(null)}
            >
              <X size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={pickImage}
          >
            <ImageIcon size={20} color={Colors.primary} />
            <Text style={styles.actionText}>Add Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setShowWorkoutSelector(true)}
          >
            <Dumbbell size={20} color={Colors.primary} />
            <Text style={styles.actionText}>Tag Workout</Text>
          </TouchableOpacity>
        </View>
        
        <Button 
          title="Post" 
          onPress={handleCreatePost}
          variant="primary"
          disabled={!content.trim()}
          style={{ marginTop: 24 }}
        />
      </ScrollView>
      
      {showWorkoutSelector && (
        <View style={styles.workoutSelectorModal}>
          <View style={styles.workoutSelectorContent}>
            <LinearGradient
              colors={Colors.gradientPurple}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.workoutSelectorTitle}>Select Workout</Text>
            
            <ScrollView style={styles.workoutList}>
              {workouts.map((workout) => (
                <TouchableOpacity
                  key={workout.id}
                  style={[
                    styles.workoutItem,
                    selectedWorkoutId === workout.id && styles.workoutItemSelected
                  ]}
                  onPress={() => {
                    setSelectedWorkoutId(workout.id);
                    setShowWorkoutSelector(false);
                  }}
                >
                  <Text 
                    style={[
                      styles.workoutItemText,
                      selectedWorkoutId === workout.id && styles.workoutItemTextSelected
                    ]}
                  >
                    {workout.name} - {new Date(workout.date).toLocaleDateString()}
                  </Text>
                  {selectedWorkoutId === workout.id && (
                    <CheckCircle size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <Button 
              title="Cancel" 
              onPress={() => setShowWorkoutSelector(false)}
              variant="glass"
              style={{ marginTop: 16 }}
            />
          </View>
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  contentInputContainer: {
    borderRadius: 16,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  contentInputGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  contentInput: {
    padding: 16,
    fontSize: 16,
    color: Colors.text,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedWorkout: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  selectedWorkoutGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  workoutLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginRight: 8,
  },
  workoutName: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  removeWorkoutButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 8,
  },
  workoutSelectorModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  workoutSelectorContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  workoutSelectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  workoutList: {
    maxHeight: 300,
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  workoutItemSelected: {
    backgroundColor: 'rgba(138, 43, 226, 0.15)',
  },
  workoutItemText: {
    fontSize: 14,
    color: Colors.text,
  },
  workoutItemTextSelected: {
    fontWeight: '600',
    color: Colors.primary,
  },
});