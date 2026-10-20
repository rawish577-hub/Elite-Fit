
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Alert,
  Linking,
} from 'react-native';
import { supabase } from '../supabase';

const GREEN = '#39FF88';
const BG = '#0B0F0E';
const CARD = '#171D1A';
const MUTED = '#9AA6A0';

export default function WorkoutScreen({ navigation }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Navigate to Dashboard
  const goToDashboard = () => {
    if (navigation?.canGoBack?.()) {
      navigation.navigate('Dashboard');
    } else {
      navigation.navigate('Dashboard');
    }
  };

  // Fetch active workouts from the admin web app
  const fetchWorkouts = useCallback(async (refresh = false) => {
    if (refresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setErrorMessage('');

    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('id, title, level, duration, status, icon')
        .eq('status', 'Active')
        .order('id', { ascending: false });

      if (error) throw error;

      setWorkouts(data || []);
    } catch (error) {
      console.log('Fetch workouts error:', error);
      setErrorMessage(error.message || 'Could not load workouts.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  // Fetch exercises for the selected workout
  const openWorkout = async (workout) => {
    setSelectedWorkout(workout);
    setExercises([]);
    setDetailsLoading(true);

    try {
      const { data, error } = await supabase
        .from('workout_details')
        .select(
          'id, workout_id, title, url, duration, reps, how_to_perform'
        )
        .eq('workout_id', workout.id)
        .order('id', { ascending: true });

      if (error) throw error;

      setExercises(data || []);
    } catch (error) {
      console.log('Fetch workout details error:', error);
      Alert.alert(
        'Error',
        error.message || 'Could not load exercise details.'
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  // Return to workout list
  const goBackToWorkouts = () => {
    setSelectedWorkout(null);
    setExercises([]);
  };

  // Loading screen
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={GREEN} />
        <Text style={styles.muted}>Loading workouts...</Text>

        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={goToDashboard}
        >
          <Text style={styles.dashboardButtonText}>
            ← Back to Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => fetchWorkouts(true)}
          tintColor={GREEN}
          colors={[GREEN]}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.brand}>ELITE-FIT</Text>
          <Text style={styles.headerSubtitle}>
            Your personal workout space
          </Text>
        </View>

        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={goToDashboard}
          activeOpacity={0.8}
        >
          <Text style={styles.dashboardButtonText}>
            ← Back to Dashboard
          </Text>
        </TouchableOpacity>
      </View>

      {selectedWorkout ? (
        <>
          {/* Back to workout list */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={goBackToWorkouts}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>← All Workouts</Text>
          </TouchableOpacity>

          <Text style={styles.heading}>
            {selectedWorkout.title}
          </Text>

          <Text style={styles.muted}>
            {selectedWorkout.level || 'All Levels'} ·{' '}
            {selectedWorkout.duration || '--'} min
          </Text>

          <Text style={styles.sectionTitle}>
            Exercises ({exercises.length})
          </Text>

          {detailsLoading ? (
            <ActivityIndicator color={GREEN} size="large" />
          ) : exercises.length === 0 ? (
            <View style={styles.card}>
              <Text style={styles.exerciseTitle}>
                No exercises added yet
              </Text>
              <Text style={styles.muted}>
                No exercise details were found for this workout.
              </Text>
            </View>
          ) : (
            exercises.map((exercise, index) => (
              <View key={exercise.id} style={styles.card}>
                <Text style={styles.exerciseNumber}>
                  EXERCISE {index + 1}
                </Text>

                <Text style={styles.exerciseTitle}>
                  {exercise.title}
                </Text>

                <Text style={styles.muted}>
                  Duration: {exercise.duration || '--'} · Reps:{' '}
                  {exercise.reps || '--'}
                </Text>

                <Text style={styles.instructions}>
                  {exercise.how_to_perform ||
                    'Instructions are not available yet.'}
                </Text>

                {exercise.url ? (
                  <TouchableOpacity
                    style={styles.videoButton}
                    onPress={async () => {
                      try {
                        await Linking.openURL(exercise.url);
                      } catch (error) {
                        Alert.alert(
                          'Unable to open video',
                          'Please check the exercise video URL.'
                        );
                      }
                    }}
                  >
                    <Text style={styles.videoButtonText}>
                      ▶ Open Exercise Video
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ))
          )}
        </>
      ) : (
        <>
          <Text style={styles.heading}>Workouts</Text>

          <Text style={styles.subtitle}>
            Choose a workout and follow its exercises.
          </Text>

          {errorMessage ? (
            <View style={styles.card}>
              <Text style={styles.exerciseTitle}>
                Unable to load workouts
              </Text>

              <Text style={styles.muted}>
                {errorMessage}
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => fetchWorkouts()}
              >
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : workouts.length === 0 ? (
            <View style={styles.card}>
              <Text style={styles.exerciseTitle}>
                No active workouts found
              </Text>

              <Text style={styles.muted}>
                Check that the admin has added workouts and their
                status is set to Active.
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => fetchWorkouts()}
              >
                <Text style={styles.buttonText}>Refresh Workouts</Text>
              </TouchableOpacity>
            </View>
          ) : (
            workouts.map((workout) => (
              <TouchableOpacity
                key={workout.id}
                style={styles.workoutCard}
                onPress={() => openWorkout(workout)}
                activeOpacity={0.8}
              >
                <View style={styles.workoutIcon}>
                  <Text style={styles.iconText}>
                    {workout.icon || '💪'}
                  </Text>
                </View>

                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutTitle}>
                    {workout.title}
                  </Text>

                  <Text style={styles.muted}>
                    {workout.level || 'All Levels'}
                  </Text>

                  <Text style={styles.muted}>
                    ⏱ {workout.duration || '--'} min
                  </Text>
                </View>

                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 18,
    paddingBottom: 35,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BG,
    gap: 12,
  },
  header: {
    marginBottom: 22,
    gap: 15,
  },
  headerText: {
    gap: 4,
  },
  brand: {
    color: GREEN,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  headerSubtitle: {
    color: MUTED,
    fontSize: 12,
  },
  dashboardButton: {
    alignSelf: 'flex-start',
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  dashboardButtonText: {
    color: GREEN,
    fontSize: 13,
    fontWeight: '700',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: MUTED,
    fontSize: 14,
    marginBottom: 22,
  },
  muted: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 4,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    marginTop: 26,
    marginBottom: 14,
  },
  workoutCard: {
    backgroundColor: CARD,
    borderRadius: 17,
    padding: 15,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#28342C',
  },
  workoutIcon: {
    width: 54,
    height: 54,
    borderRadius: 15,
    backgroundColor: '#26372B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  iconText: {
    fontSize: 27,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 5,
  },
  arrow: {
    color: GREEN,
    fontSize: 30,
    marginLeft: 8,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 17,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#28342C',
  },
  exerciseNumber: {
    color: GREEN,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 7,
  },
  exerciseTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 7,
  },
  instructions: {
    color: '#E0E7E2',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: CARD,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 13,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: GREEN,
  },
  backText: {
    color: GREEN,
    fontWeight: '700',
  },
  videoButton: {
    backgroundColor: '#26372B',
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    alignItems: 'center',
  },
  videoButtonText: {
    color: GREEN,
    fontWeight: '700',
  },
  button: {
    backgroundColor: GREEN,
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#07110A',
    fontWeight: '800',
  },
});
