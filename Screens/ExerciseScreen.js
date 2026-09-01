import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const exercises = [
  {
    name: 'Bodyweight Squats',
    duration: '30 sec',
    reps: '12 Reps',
    icon: '🦵',
    instruction:
      'Keep your feet shoulder-width apart. Lower your body by bending your knees, then return to the starting position.',
  },
  {
    name: 'Push Ups',
    duration: '30 sec',
    reps: '10 Reps',
    icon: '💪',
    instruction:
      'Keep your body straight. Lower your chest toward the floor and push back up while keeping your core tight.',
  },
  {
    name: 'Forward Lunges',
    duration: '30 sec',
    reps: '10 Reps',
    icon: '🏃',
    instruction:
      'Step forward with one leg and lower your hips. Push through your front foot to return to the starting position.',
  },
  {
    name: 'Plank',
    duration: '30 sec',
    reps: '30 Seconds',
    icon: '🔥',
    instruction:
      'Keep your elbows under your shoulders and your body in a straight line. Tighten your core and hold the position.',
  },
];

export default function ExerciseScreen({ navigation }) {
  const [currentExercise, setCurrentExercise] = useState(0);

  const exercise = exercises[currentExercise];

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      navigation.navigate('WorkoutComplete');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Active Workout</Text>

        <Text style={styles.counter}>
          {currentExercise + 1}/{exercises.length}
        </Text>
      </View>

      {/* Exercise Icon */}
      <View style={styles.exerciseIconContainer}>
        <Text style={styles.exerciseIcon}>
          {exercise.icon}
        </Text>
      </View>

      {/* Exercise Info */}
      <Text style={styles.exerciseName}>
        {exercise.name}
      </Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoNumber}>
            {exercise.duration}
          </Text>

          <Text style={styles.infoLabel}>Duration</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoNumber}>
            {exercise.reps}
          </Text>

          <Text style={styles.infoLabel}>Target</Text>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructionCard}>
        <Text style={styles.instructionTitle}>
          How to perform
        </Text>

        <Text style={styles.instructionText}>
          {exercise.instruction}
        </Text>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        {exercises.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressBar,
              index <= currentExercise &&
                styles.activeProgressBar,
            ]}
          />
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={nextExercise}
      >
        <Text style={styles.nextButtonText}>
          {currentExercise === exercises.length - 1
            ? 'Finish Workout'
            : 'Next Exercise'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#171D1A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 35,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },

  counter: {
    color: '#39FF88',
    fontSize: 14,
    fontWeight: 'bold',
  },

  exerciseIconContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#17231D',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },

  exerciseIcon: {
    fontSize: 75,
  },

  exerciseName: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 22,
  },

  infoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },

  infoBox: {
    flex: 1,
    backgroundColor: '#171D1A',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },

  infoNumber: {
    color: '#39FF88',
    fontSize: 16,
    fontWeight: 'bold',
  },

  infoLabel: {
    color: '#89928D',
    fontSize: 12,
    marginTop: 5,
  },

  instructionCard: {
    backgroundColor: '#171D1A',
    borderRadius: 16,
    padding: 18,
    marginBottom: 25,
  },

  instructionTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  instructionText: {
    color: '#A9B0AC',
    fontSize: 13,
    lineHeight: 21,
  },

  progressContainer: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 25,
  },

  progressBar: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#26302B',
  },

  activeProgressBar: {
    backgroundColor: '#39FF88',
  },

  nextButton: {
    height: 55,
    borderRadius: 28,
    backgroundColor: '#39FF88',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextButtonText: {
    color: '#07100B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});