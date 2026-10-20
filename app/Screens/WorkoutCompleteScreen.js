
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { supabase } from '../supabase';

export default function WorkoutCompleteScreen({ navigation, route }) {
  const workout = route?.params?.workout;

  const totalExercises = workout?.exerciseList?.length || 0;

  const duration = workout?.duration || '0 min';
  const durationMinutes = parseInt(duration, 10) || 0;

  const [saving, setSaving] = useState(true);
  const [saved, setSaved] = useState(false);
  const saveStarted = useRef(false);

  useEffect(() => {
    if (saveStarted.current) return;

    saveStarted.current = true;

    const saveProgress = async () => {
      try {
        if (!workout) {
          throw new Error('Workout information was not found.');
        }

        // Get the currently logged-in user
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        if (!user) {
          throw new Error('Please log in to save your workout progress.');
        }

        const completedAt = new Date();

        // Approximate estimate, not an actual measurement
        const estimatedCalories = durationMinutes * 5;

        // Save the completed workout to Supabase
        const { error } = await supabase
          .from('progress')
          .insert({
            user_id: user.id,
            workout_title: workout.title || 'Workout',
            workouts_completed: 1,
            duration_minutes: durationMinutes,
            calories_burned: estimatedCalories,
            workout_date: completedAt.toISOString().slice(0, 10),
            completed_at: completedAt.toISOString(),
          });

        if (error) throw error;

        setSaved(true);
      } catch (error) {
        console.error('Error saving workout progress:', error);

        Alert.alert(
          'Progress Not Saved',
          error.message ||
            'Unable to save your workout. Please try again.'
        );
      } finally {
        setSaving(false);
      }
    };

    saveProgress();
  }, [workout]);

  const goToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      {/* ICON */}
      <Text style={styles.icon}>🎉</Text>

      {/* TITLE */}
      <Text style={styles.title}>Workout Complete!</Text>

      <Text style={styles.subtitle}>
        Great job! You completed today's workout.
      </Text>

      {/* SUMMARY */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.number}>{totalExercises}</Text>
          <Text style={styles.label}>Exercises</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.number}>{durationMinutes}</Text>
          <Text style={styles.label}>Minutes</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.number}>🔥</Text>
          <Text style={styles.label}>Completed</Text>
        </View>
      </View>

      {/* WORKOUT NAME */}
      <Text style={styles.workoutName}>
        {workout?.title || 'Workout'}
      </Text>

      {/* SAVE STATUS */}
      <View style={styles.statusContainer}>
        {saving ? (
          <>
            <ActivityIndicator color="#39FF88" />
            <Text style={styles.statusText}>
              Saving your progress...
            </Text>
          </>
        ) : saved ? (
          <Text style={styles.successText}>
            ✓ Workout progress saved successfully!
          </Text>
        ) : (
          <Text style={styles.errorText}>
            Progress could not be saved.
          </Text>
        )}
      </View>

      {/* DASHBOARD BUTTON */}
      <TouchableOpacity
        style={[
          styles.button,
          saving && styles.disabledButton,
        ]}
        onPress={goToDashboard}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? 'Please wait...' : 'Back to Dashboard'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  icon: {
    fontSize: 75,
    marginBottom: 25,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtitle: {
    color: '#A9B0AC',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 35,
  },

  summaryCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#171D1A',
    borderRadius: 18,
    paddingVertical: 22,
    marginBottom: 20,
  },

  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },

  number: {
    color: '#39FF88',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  label: {
    color: '#89928D',
    fontSize: 12,
  },

  workoutName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  statusContainer: {
    minHeight: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  statusText: {
    color: '#A9B0AC',
    fontSize: 13,
    marginTop: 8,
  },

  successText: {
    color: '#39FF88',
    fontSize: 13,
    textAlign: 'center',
  },

  errorText: {
    color: '#FF7777',
    fontSize: 13,
    textAlign: 'center',
  },

  button: {
    width: '100%',
    height: 55,
    borderRadius: 28,
    backgroundColor: '#39FF88',
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#07100B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

