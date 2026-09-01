import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';

export default function HealthMonitoringScreen({ navigation }) {
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h) {
      return null;
    }

    const heightInMeters = h / 100;
    return (w / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const bmi = calculateBMI();

  const getBMIStatus = () => {
    if (!bmi) return '';

    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Health Monitoring</Text>

          <View style={styles.headerSpace} />
        </View>

        {/* Introduction */}
        <Text style={styles.title}>Monitor Your Health</Text>

        <Text style={styles.subtitle}>
          Keep track of your important health and fitness information.
        </Text>

        {/* Health Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Health Overview</Text>

          <View style={styles.overviewRow}>

            <View style={styles.overviewItem}>
              <Text style={styles.overviewIcon}>❤️</Text>
              <Text style={styles.overviewLabel}>Heart Rate</Text>
              <Text style={styles.overviewValue}>
                {heartRate ? `${heartRate} BPM` : '--'}
              </Text>
            </View>

            <View style={styles.overviewItem}>
              <Text style={styles.overviewIcon}>🩸</Text>
              <Text style={styles.overviewLabel}>Blood Pressure</Text>
              <Text style={styles.overviewValue}>
                {bloodPressure || '--'}
              </Text>
            </View>

          </View>

          <View style={styles.overviewRow}>

            <View style={styles.overviewItem}>
              <Text style={styles.overviewIcon}>⚖️</Text>
              <Text style={styles.overviewLabel}>Weight</Text>
              <Text style={styles.overviewValue}>
                {weight ? `${weight} kg` : '--'}
              </Text>
            </View>

            <View style={styles.overviewItem}>
              <Text style={styles.overviewIcon}>📊</Text>
              <Text style={styles.overviewLabel}>BMI</Text>
              <Text style={styles.overviewValue}>
                {bmi || '--'}
              </Text>
            </View>

          </View>
        </View>

        {/* Health Information */}
        <Text style={styles.sectionTitle}>Health Information</Text>

        {/* Blood Pressure */}
        <View style={styles.inputCard}>
          <Text style={styles.inputIcon}>🩸</Text>

          <View style={styles.inputContent}>
            <Text style={styles.inputLabel}>Blood Pressure</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. 120/80"
              placeholderTextColor="#68716C"
              value={bloodPressure}
              onChangeText={setBloodPressure}
              keyboardType="numbers-and-punctuation"
            />

            <Text style={styles.inputHint}>
              Enter your blood pressure reading
            </Text>
          </View>
        </View>

        {/* Heart Rate */}
        <View style={styles.inputCard}>
          <Text style={styles.inputIcon}>❤️</Text>

          <View style={styles.inputContent}>
            <Text style={styles.inputLabel}>Heart Rate</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. 72 BPM"
              placeholderTextColor="#68716C"
              value={heartRate}
              onChangeText={setHeartRate}
              keyboardType="numeric"
            />

            <Text style={styles.inputHint}>
              Enter your resting heart rate
            </Text>
          </View>
        </View>

        {/* Weight */}
        <View style={styles.inputCard}>
          <Text style={styles.inputIcon}>⚖️</Text>

          <View style={styles.inputContent}>
            <Text style={styles.inputLabel}>Weight</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. 60 kg"
              placeholderTextColor="#68716C"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />

            <Text style={styles.inputHint}>
              Enter your current weight in kilograms
            </Text>
          </View>
        </View>

        {/* Height */}
        <View style={styles.inputCard}>
          <Text style={styles.inputIcon}>📏</Text>

          <View style={styles.inputContent}>
            <Text style={styles.inputLabel}>Height</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. 165 cm"
              placeholderTextColor="#68716C"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />

            <Text style={styles.inputHint}>
              Enter your height in centimeters
            </Text>
          </View>
        </View>

        {/* BMI Result */}
        {bmi && (
          <View style={styles.bmiCard}>
            <View>
              <Text style={styles.bmiSmall}>YOUR BMI</Text>
              <Text style={styles.bmiValue}>{bmi}</Text>
              <Text style={styles.bmiStatus}>{getBMIStatus()}</Text>
            </View>

            <Text style={styles.bmiIcon}>📊</Text>
          </View>
        )}

        {/* Medical Condition */}
        <View style={styles.conditionCard}>
          <Text style={styles.conditionTitle}>
            Medical Condition
          </Text>

          <Text style={styles.conditionSubtitle}>
            Mention any health condition that may affect your workout.
          </Text>

          <TextInput
            style={styles.conditionInput}
            placeholder="e.g. Blood pressure, diabetes, asthma, none..."
            placeholderTextColor="#68716C"
            value={medicalCondition}
            onChangeText={setMedicalCondition}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>
            Save Health Information
          </Text>
        </TouchableOpacity>

        {/* Safety Note */}
        <View style={styles.noteCard}>
          <Text style={styles.noteIcon}>ℹ️</Text>

          <Text style={styles.noteText}>
            Keep your health information updated for more
            personalized fitness recommendations.
          </Text>
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Workout')}
        >
          <Text style={styles.navIcon}>🏋️</Text>
          <Text style={styles.navText}>Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('PostureDetection')}
        >
          <Text style={styles.navIcon}>🧍</Text>
          <Text style={styles.navText}>Posture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('AITrainer')}
        >
          <Text style={styles.navIcon}>🤖</Text>
          <Text style={styles.navText}>AI Trainer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Nutrition')}
        >
          <Text style={styles.navIcon}>🥗</Text>
          <Text style={styles.navText}>Nutrition</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 110,
  },

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
    marginBottom: 22,
  },

  overviewCard: {
    backgroundColor: '#17231D',
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },

  overviewTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  overviewItem: {
    width: '47%',
    backgroundColor: '#111A15',
    borderRadius: 14,
    padding: 13,
  },

  overviewIcon: {
    fontSize: 22,
    marginBottom: 6,
  },

  overviewLabel: {
    color: '#89928D',
    fontSize: 11,
    marginBottom: 4,
  },

  overviewValue: {
    color: '#39FF88',
    fontSize: 16,
    fontWeight: 'bold',
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  inputCard: {
    flexDirection: 'row',
    backgroundColor: '#171D1A',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
  },

  inputIcon: {
    fontSize: 25,
    width: 42,
    marginTop: 4,
  },

  inputContent: {
    flex: 1,
  },

  inputLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#222B27',
    borderRadius: 10,
    color: '#FFFFFF',
    height: 42,
    paddingHorizontal: 12,
    fontSize: 13,
  },

  inputHint: {
    color: '#68716C',
    fontSize: 10,
    marginTop: 5,
  },

  bmiCard: {
    backgroundColor: '#20372A',
    borderRadius: 18,
    padding: 18,
    marginTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bmiSmall: {
    color: '#39FF88',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  bmiValue: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 3,
  },

  bmiStatus: {
    color: '#B8C0BB',
    fontSize: 12,
    marginTop: 2,
  },

  bmiIcon: {
    fontSize: 40,
  },

  conditionCard: {
    backgroundColor: '#171D1A',
    borderRadius: 16,
    padding: 17,
    marginBottom: 18,
  },

  conditionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  conditionSubtitle: {
    color: '#89928D',
    fontSize: 11,
    lineHeight: 17,
    marginBottom: 12,
  },

  conditionInput: {
    backgroundColor: '#222B27',
    borderRadius: 10,
    color: '#FFFFFF',
    minHeight: 75,
    paddingHorizontal: 12,
    paddingTop: 10,
    fontSize: 12,
    textAlignVertical: 'top',
  },

  saveButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#39FF88',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  saveButtonText: {
    color: '#07100B',
    fontSize: 15,
    fontWeight: 'bold',
  },

  noteCard: {
    flexDirection: 'row',
    backgroundColor: '#151B18',
    borderRadius: 14,
    padding: 14,
    marginBottom: 15,
  },

  noteIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  noteText: {
    flex: 1,
    color: '#89928D',
    fontSize: 11,
    lineHeight: 17,
  },

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
    fontSize: 19,
    marginBottom: 3,
  },

  navText: {
    color: '#777F7B',
    fontSize: 9,
  },
});