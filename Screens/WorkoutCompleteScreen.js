import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function WorkoutCompleteScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🎉</Text>

      <Text style={styles.title}>
        Workout Complete!
      </Text>

      <Text style={styles.subtitle}>
        Great job! You completed today's workout.
      </Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.number}>4</Text>
          <Text style={styles.label}>Exercises</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.number}>25</Text>
          <Text style={styles.label}>Minutes</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.number}>🔥</Text>
          <Text style={styles.label}>Completed</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.buttonText}>
          Back to Dashboard
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
    marginBottom: 35,
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

  button: {
    width: '100%',
    height: 55,
    borderRadius: 28,
    backgroundColor: '#39FF88',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#07100B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});