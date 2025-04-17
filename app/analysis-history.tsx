import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { ArrowLeft } from 'lucide-react-native';
import { useFormAnalysisStore } from '@/store/form-analysis-store';
import FormAnalysisResult from '@/components/FormAnalysisResult';
import { LinearGradient } from 'expo-linear-gradient';

export default function AnalysisHistoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { results } = useFormAnalysisStore();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          headerTitle: 'Form Analysis History',
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

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FormAnalysisResult result={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <LinearGradient
              colors={['rgba(30, 30, 30, 0.9)', 'rgba(30, 30, 30, 0.95)']}
              style={styles.emptyGradient}
            />
            <Text style={styles.emptyText}>
              No form analysis results yet. Use the camera to analyze your workout form.
            </Text>
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
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    minHeight: 300,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
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