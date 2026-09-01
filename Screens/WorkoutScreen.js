import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

export default function WorkoutScreen({ navigation }) {

  // ================= WORKOUT DATA =================
  const workouts = [
    {
      id: 1,
      title: 'Full Body Workout',
      level: 'Beginner',
      duration: '25 min',
      exercises: '8 Exercises',
      icon: '💪',
      exerciseList: [
        'Squats',
        'Push Ups',
        'Lunges',
        'Plank',
        'Jumping Jacks',
        'Glute Bridge',
        'Mountain Climbers',
        'Arm Circles',
      ],
    },

    {
      id: 2,
      title: 'Upper Body Strength',
      level: 'Intermediate',
      duration: '30 min',
      exercises: '10 Exercises',
      icon: '🏋️',
      exerciseList: [
        'Push Ups',
        'Shoulder Press',
        'Bicep Curls',
        'Tricep Dips',
        'Chest Press',
        'Lateral Raises',
        'Front Raises',
        'Tricep Extensions',
        'Plank Shoulder Taps',
        'Arm Circles',
      ],
    },

    {
      id: 3,
      title: 'Lower Body Workout',
      level: 'Beginner',
      duration: '25 min',
      exercises: '8 Exercises',
      icon: '🦵',
      exerciseList: [
        'Squats',
        'Lunges',
        'Glute Bridge',
        'Calf Raises',
        'Wall Sit',
        'Step Ups',
        'Side Leg Raises',
        'Donkey Kicks',
      ],
    },

    {
      id: 4,
      title: 'Cardio & Fat Burn',
      level: 'Intermediate',
      duration: '20 min',
      exercises: '7 Exercises',
      icon: '🔥',
      exerciseList: [
        'Jumping Jacks',
        'High Knees',
        'Mountain Climbers',
        'Burpees',
        'Jump Squats',
        'Butt Kicks',
        'Skater Jumps',
      ],
    },
  ];

  // Full Body recommendation
  const recommendedWorkout = workouts[0];

  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Workouts
          </Text>

          <View style={styles.headerSpace} />

        </View>


        {/* ================= INTRODUCTION ================= */}

        <Text style={styles.title}>
          Choose Your Workout
        </Text>

        <Text style={styles.subtitle}>
          Select a workout that matches your fitness level and goal.
        </Text>


        {/* ================= TODAY'S RECOMMENDATION ================= */}

        <View style={styles.recommendation}>

          <View style={styles.recommendationTop}>

            <View>

              <Text style={styles.recommendationSmall}>
                TODAY'S RECOMMENDATION
              </Text>

              <Text style={styles.recommendationTitle}>
                {recommendedWorkout.title}
              </Text>

            </View>

            <Text style={styles.bigIcon}>
              🔥
            </Text>

          </View>


          <Text style={styles.recommendationText}>
            A balanced workout designed to keep your whole body active.
          </Text>


          <View style={styles.infoRow}>

            <Text style={styles.infoText}>
              ⏱ {recommendedWorkout.duration}
            </Text>

            <Text style={styles.infoText}>
              💪 {recommendedWorkout.exercises}
            </Text>

            <Text style={styles.infoText}>
              ⭐ {recommendedWorkout.level}
            </Text>

          </View>


          {/* START RECOMMENDED WORKOUT */}

          <TouchableOpacity
            style={styles.startButton}
            onPress={() =>
              navigation.navigate('Exercise', {
                workout: recommendedWorkout,
              })
            }
          >
            <Text style={styles.startButtonText}>
              Start Workout
            </Text>
          </TouchableOpacity>

        </View>


        {/* ================= ALL WORKOUTS ================= */}

        <Text style={styles.sectionTitle}>
          All Workouts
        </Text>


        {workouts.map((workout) => (

          <TouchableOpacity
            key={workout.id}
            style={styles.workoutCard}

            onPress={() =>
              navigation.navigate('Exercise', {
                workout: workout,
              })
            }
          >

            {/* Workout Icon */}

            <View style={styles.workoutIconContainer}>

              <Text style={styles.workoutIcon}>
                {workout.icon}
              </Text>

            </View>


            {/* Workout Information */}

            <View style={styles.workoutInfo}>

              <Text style={styles.workoutTitle}>
                {workout.title}
              </Text>

              <Text style={styles.workoutDetails}>
                {workout.duration} • {workout.exercises}
              </Text>


              {/* Level */}

              <View style={styles.levelContainer}>

                <Text style={styles.levelText}>
                  {workout.level}
                </Text>

              </View>

            </View>


            {/* Arrow */}

            <Text style={styles.arrow}>
              ›
            </Text>

          </TouchableOpacity>

        ))}

      </ScrollView>


      {/* ================= BOTTOM NAVIGATION ================= */}

      <View style={styles.bottomNav}>

        {/* HOME */}

        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('Dashboard')
          }
        >
          <Text style={styles.navIcon}>
            🏠
          </Text>

          <Text style={styles.navText}>
            Home
          </Text>
        </TouchableOpacity>


        {/* WORKOUT */}

        <TouchableOpacity
          style={styles.navItem}
        >
          <Text style={styles.navIcon}>
            🏋️
          </Text>

          <Text style={styles.activeNavText}>
            Workout
          </Text>
        </TouchableOpacity>


        {/* AI TRAINER */}

        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('AITrainer')
          }
        >
          <Text style={styles.navIcon}>
            🤖
          </Text>

          <Text style={styles.navText}>
            AI Trainer
          </Text>
        </TouchableOpacity>


        {/* NUTRITION */}

        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('Nutrition')
          }
        >
          <Text style={styles.navIcon}>
            🥗
          </Text>

          <Text style={styles.navText}>
            Nutrition
          </Text>
        </TouchableOpacity>


        {/* PROFILE */}

        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('Profile')
          }
        >
          <Text style={styles.navIcon}>
            👤
          </Text>

          <Text style={styles.navText}>
            Profile
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  // ================= CONTAINER =================

  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
  },


  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 100,
  },


  // ================= HEADER =================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },


  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#171D1A',
    alignItems: 'center',
    justifyContent: 'center',
  },


  backIcon: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 35,
  },


  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },


  headerSpace: {
    width: 42,
  },


  // ================= INTRODUCTION =================

  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },


  subtitle: {
    color: '#9BA39F',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 25,
  },


  // ================= RECOMMENDATION =================

  recommendation: {
    backgroundColor: '#17231D',
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },


  recommendationTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },


  recommendationSmall: {
    color: '#39FF88',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },


  recommendationTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
  },


  bigIcon: {
    fontSize: 42,
  },


  recommendationText: {
    color: '#A9B0AC',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 15,
  },


  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 18,
  },


  infoText: {
    color: '#C5CCC8',
    fontSize: 11,
  },


  startButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#39FF88',
    justifyContent: 'center',
    alignItems: 'center',
  },


  startButtonText: {
    color: '#07100B',
    fontSize: 15,
    fontWeight: 'bold',
  },


  // ================= ALL WORKOUTS =================

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
  },


  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#171D1A',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },


  workoutIconContainer: {
    width: 55,
    height: 55,
    borderRadius: 14,
    backgroundColor: '#222B27',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },


  workoutIcon: {
    fontSize: 27,
  },


  workoutInfo: {
    flex: 1,
  },


  workoutTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },


  workoutDetails: {
    color: '#89928D',
    fontSize: 12,
    marginBottom: 7,
  },


  levelContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#20372A',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },


  levelText: {
    color: '#39FF88',
    fontSize: 10,
    fontWeight: '600',
  },


  arrow: {
    color: '#39FF88',
    fontSize: 28,
    marginLeft: 8,
  },


  // ================= BOTTOM NAV =================

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#111613',
    borderTopWidth: 1,
    borderTopColor: '#26302B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },


  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },


  navIcon: {
    fontSize: 20,
    marginBottom: 3,
  },


  navText: {
    color: '#777F7B',
    fontSize: 10,
  },


  activeNavText: {
    color: '#39FF88',
    fontSize: 10,
    fontWeight: 'bold',
  },

});