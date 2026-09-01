import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

export default function ProfileSetupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [healthIssue, setHealthIssue] = useState('');

  const handleContinue = () => {
    const userData = {
      name,
      age,
      gender,
      height,
      weight,
      goal,
      healthIssue,
    };

    navigation.navigate('Dashboard', {
  profileData: {
    name,
    age,
    gender,
    height,
    weight,
    goal,
    healthIssue,
  },
});
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.logo}>ELITE-FIT</Text>

      <Text style={styles.title}>
        Create Your Fitness Profile
      </Text>

      <Text style={styles.subtitle}>
        Tell us about yourself so we can personalize your fitness journey.
      </Text>

      {/* NAME */}
      <Text style={styles.label}>Full Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />

      {/* AGE */}
      <Text style={styles.label}>Age</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      {/* GENDER */}
      <Text style={styles.label}>Gender</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.option,
            gender === 'Male' && styles.selectedOption,
          ]}
          onPress={() => setGender('Male')}
        >
          <Text
            style={[
              styles.optionText,
              gender === 'Male' && styles.selectedText,
            ]}
          >
            Male
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            gender === 'Female' && styles.selectedOption,
          ]}
          onPress={() => setGender('Female')}
        >
          <Text
            style={[
              styles.optionText,
              gender === 'Female' && styles.selectedText,
            ]}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>

      {/* HEIGHT */}
      <Text style={styles.label}>Height (cm)</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. 165"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      {/* WEIGHT */}
      <Text style={styles.label}>Weight (kg)</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. 60"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      {/* GOAL */}
      <Text style={styles.label}>
        What's your fitness goal?
      </Text>

      <View style={styles.goalContainer}>
        <TouchableOpacity
          style={[
            styles.goalButton,
            goal === 'Lose Weight' && styles.selectedOption,
          ]}
          onPress={() => setGoal('Lose Weight')}
        >
          <Text
            style={[
              styles.optionText,
              goal === 'Lose Weight' && styles.selectedText,
            ]}
          >
            Lose Weight
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.goalButton,
            goal === 'Gain Weight' && styles.selectedOption,
          ]}
          onPress={() => setGoal('Gain Weight')}
        >
          <Text
            style={[
              styles.optionText,
              goal === 'Gain Weight' && styles.selectedText,
            ]}
          >
            Gain Weight
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.goalButton,
            goal === 'Maintain Weight' && styles.selectedOption,
          ]}
          onPress={() => setGoal('Maintain Weight')}
        >
          <Text
            style={[
              styles.optionText,
              goal === 'Maintain Weight' && styles.selectedText,
            ]}
          >
            Maintain Weight
          </Text>
        </TouchableOpacity>
      </View>

      {/* HEALTH */}
      <Text style={styles.label}>
        Any health issues?
      </Text>

      <TextInput
        style={[styles.input, styles.healthInput]}
        placeholder="e.g. Blood pressure, fever, heart rate..."
        placeholderTextColor="#777"
        value={healthIssue}
        onChangeText={setHealthIssue}
        multiline
      />

      {/* CONTINUE */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>

      {/* BACK */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>
          Back
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0B0F0E',
    paddingHorizontal: 25,
    paddingVertical: 35,
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#39FF88',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 25,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#A9B0AC',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 30,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 5,
  },

  input: {
    height: 52,
    backgroundColor: '#171D1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 18,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },

  option: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#171D1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#26302B',
  },

  selectedOption: {
    backgroundColor: '#39FF88',
    borderColor: '#39FF88',
  },

  optionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  selectedText: {
    color: '#07100B',
  },

  goalContainer: {
    gap: 10,
    marginBottom: 18,
  },

  goalButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: '#171D1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#26302B',
  },

  healthInput: {
    height: 85,
    paddingTop: 15,
    textAlignVertical: 'top',
  },

  button: {
    height: 55,
    backgroundColor: '#39FF88',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#07100B',
    fontSize: 17,
    fontWeight: 'bold',
  },

  backButton: {
    alignItems: 'center',
    marginTop: 20,
  },

  backText: {
    color: '#39FF88',
    fontSize: 15,
    fontWeight: '600',
  },
});