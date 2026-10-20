import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

const GREEN = '#39FF88';
const BG = '#0B0F0E';
const CARD = '#171D1A';
const MUTED = '#89928D';

const exerciseDetails = {
  Squats: {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/squats.mp4'),
    instruction: 'Keep your feet shoulder-width apart. Lower your body by bending your knees, then return to the starting position.',
  },
  'Push Ups': {
    duration: '30 sec',
    reps: '10 Reps',
    video: require('../assets/videos/pushups.mp4'),
    instruction: 'Keep your body straight. Lower your chest toward the floor and push back up while keeping your core tight.',
  },
  Lunges: {
    duration: '30 sec',
    reps: '10 Reps',
    video: require('../assets/videos/lunges.mp4'),
    instruction: 'Step forward with one leg and lower your hips. Push through your front foot to return to the starting position.',
  },
  Plank: {
    duration: '30 sec',
    reps: '30 Seconds',
    video: require('../assets/videos/plank.mp4'),
    instruction: 'Keep your elbows under your shoulders and your body in a straight line. Tighten your core and hold the position.',
  },
  'Jumping Jacks': {
    duration: '30 sec',
    reps: '20 Reps',
    video: require('../assets/videos/jumpingjacks.mp4'),
    instruction: 'Stand straight with your feet together. Jump while moving your arms and legs outward, then return to the starting position.',
  },
  'Glute Bridge': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/glutebridge.mp4'),
    instruction: 'Lie on your back with your knees bent. Lift your hips while squeezing your glutes, then slowly lower them.',
  },
  'Mountain Climbers': {
    duration: '30 sec',
    reps: '20 Reps',
    video: require('../assets/videos/mountainclimbers.mp4'),
    instruction: 'Start in a plank position. Bring one knee toward your chest and quickly switch legs while keeping your core tight.',
  },
  'Arm Circles': {
    duration: '30 sec',
    reps: '20 Reps',
    video: require('../assets/videos/armcircles.mp4'),
    instruction: 'Stand straight and extend your arms to the sides. Make small controlled circles and gradually increase the movement.',
  },
  'Shoulder Press': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/shoulderpress.mp4'),
    instruction: 'Keep your back straight. Press your hands above your head and slowly return to the starting position.',
  },
  'Bicep Curls': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/bicepcurls.mp4'),
    instruction: 'Keep your elbows close to your body. Curl your hands toward your shoulders and slowly lower them.',
  },
  'Tricep Dips': {
    duration: '30 sec',
    reps: '10 Reps',
    video: require('../assets/videos/tricepdips.mp4'),
    instruction: 'Use a stable surface behind you. Lower your body by bending your elbows, then push yourself back up.',
  },
  'Chest Press': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/chestpress.mp4'),
    instruction: 'Keep your back stable and press your hands forward. Slowly return to the starting position.',
  },
  'Lateral Raises': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/lateral raises.mp4'),
    instruction: 'Stand straight with your arms beside you. Raise both arms to shoulder height and slowly lower them.',
  },
  'Front Raises': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/frontraises.mp4'),
    instruction: 'Keep your arms straight and raise them in front of you to shoulder height. Slowly lower them.',
  },
  'Tricep Extensions': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/tricepextensions.mp4'),
    instruction: 'Keep your elbows close to your head. Extend your arms upward and slowly return to the starting position.',
  },
  'Plank Shoulder Taps': {
    duration: '30 sec',
    reps: '20 Reps',
    video: require('../assets/videos/plankshouldertaps.mp4'),
    instruction: 'Start in a plank position. Touch the opposite shoulder with one hand, then switch sides while keeping your hips stable.',
  },
  'Calf Raises': {
    duration: '30 sec',
    reps: '15 Reps',
    video: require('../assets/videos/calfraises.mp4'),
    instruction: 'Stand straight and slowly raise your heels. Hold briefly and lower them back down.',
  },
  'Wall Sit': {
    duration: '30 sec',
    reps: '30 Seconds',
    video: require('../assets/videos/wallsit.mp4'),
    instruction: 'Place your back against a wall and lower your body until your knees are bent. Hold the position.',
  },
  'Step Ups': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/stepups.mp4'),
    instruction: 'Step onto a stable platform with one foot, bring the other foot up, then step back down carefully.',
  },
  'Side Leg Raises': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/sidelegraises.mp4'),
    instruction: 'Stand or lie on your side and slowly raise one leg outward. Lower it with control and repeat.',
  },
  'Donkey Kicks': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/donkeykicks.mp4'),
    instruction: 'Start on your hands and knees. Lift one leg while keeping your knee bent, then slowly lower it.',
  },
  'High Knees': {
    duration: '30 sec',
    reps: '20 Reps',
    video: require('../assets/videos/highkness.mp4'),
    instruction: 'Stand tall and run in place while lifting your knees toward your chest.',
  },
  Burpees: {
    duration: '30 sec',
    reps: '10 Reps',
    video: require('../assets/videos/burpees.mp4'),
    instruction: 'Squat down, place your hands on the floor, move your feet back, return to a squat, and jump upward.',
  },
  'Jump Squats': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/jumpsquats.mp4'),
    instruction: 'Perform a squat and jump upward. Land softly and move into the next squat.',
  },
  'Butt Kicks': {
    duration: '30 sec',
    reps: '20 Reps',
    video: require('../assets/videos/buttkicks.mp4'),
    instruction: 'Run in place while bringing your heels toward your glutes.',
  },
  'Skater Jumps': {
    duration: '30 sec',
    reps: '12 Reps',
    video: require('../assets/videos/skaterjumps.mp4'),
    instruction: 'Jump sideways from one leg to the other while keeping your movement controlled.',
  },
};

function ExerciseVideo({ video }) {
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;

    if (video) {
      player.play();
    }
  });

  if (!video) {
    return (
      <View style={styles.noVideoContainer}>
        <Text style={styles.noVideoIcon}>🎥</Text>
        <Text style={styles.noVideoText}>
          Exercise demonstration
        </Text>
        <Text style={styles.noVideoSubText}>
          Video will be added soon
        </Text>
      </View>
    );
  }

  return (
    <VideoView
      style={styles.video}
      player={player}
      nativeControls
      contentFit="contain"
    />
  );
}

function NoWorkoutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>
        No workout selected.
      </Text>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.nextButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

function ExerciseContent({ navigation, workout }) {
  const [currentExercise, setCurrentExercise] = useState(0);

  const exerciseNames = Array.isArray(workout.exerciseList)
    ? workout.exerciseList
    : [];

  const exercises = exerciseNames.map((name) => {
    const details = exerciseDetails[name];

    return {
      name,
      duration: details?.duration || '30 sec',
      reps: details?.reps || '12 Reps',
      video: details?.video || null,
      instruction:
        details?.instruction ||
        'Perform this exercise with controlled movement and maintain proper form.',
    };
  });

  if (exercises.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No exercises found.
        </Text>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.nextButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const exercise = exercises[currentExercise];

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise((previous) => previous + 1);
    } else {
      navigation.navigate('WorkoutComplete', { workout });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {workout.title}
        </Text>

        <Text style={styles.counter}>
          {currentExercise + 1}/{exercises.length}
        </Text>
      </View>

      <View style={styles.videoContainer}>
        <ExerciseVideo
          key={exercise.name}
          video={exercise.video}
        />
      </View>

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

      <View style={styles.instructionCard}>
        <Text style={styles.instructionTitle}>
          How to perform
        </Text>
        <Text style={styles.instructionText}>
          {exercise.instruction}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        {exercises.map((item, index) => (
          <View
            key={`${item.name}-${index}`}
            style={[
              styles.progressBar,
              index <= currentExercise && styles.activeProgressBar,
            ]}
          />
        ))}
      </View>

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

export default function ExerciseScreen({ navigation, route }) {
  const workout = route?.params?.workout;

  if (!workout) {
    return <NoWorkoutScreen navigation={navigation} />;
  }

  return (
    <ExerciseContent
      navigation={navigation}
      workout={workout}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: CARD,
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
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: 230,
  },
  counter: {
    color: GREEN,
    fontSize: 14,
    fontWeight: 'bold',
  },
  videoContainer: {
    width: '100%',
    height: 230,
    backgroundColor: CARD,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  noVideoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noVideoIcon: {
    fontSize: 45,
    marginBottom: 10,
  },
  noVideoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noVideoSubText: {
    color: MUTED,
    fontSize: 12,
    marginTop: 5,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  infoBox: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  infoNumber: {
    color: GREEN,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoLabel: {
    color: MUTED,
    fontSize: 12,
    marginTop: 5,
  },
  instructionCard: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#26302B',
  },
  activeProgressBar: {
    backgroundColor: GREEN,
  },
  nextButton: {
    height: 55,
    borderRadius: 28,
    backgroundColor: GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#07100B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
