
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { supabase } from '../supabase';

export default function HealthMonitoringScreen({ navigation }) {
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [saving, setSaving] = useState(false);

  // Calculate BMI
  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (
      !Number.isFinite(w) ||
      !Number.isFinite(h) ||
      w <= 0 ||
      h <= 0
    ) {
      return null;
    }

    return Number((w / ((h / 100) ** 2)).toFixed(1));
  };

  const bmi = calculateBMI();

  // Get BMI category
  const getBMIStatus = () => {
    if (bmi === null) return '';

    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';

    return 'Obese';
  };

  // Save health information to Supabase
  const handleSaveHealth = async () => {
    if (saving) return;

    const bp = bloodPressure.trim();
    const hr = Number(heartRate);
    const w = Number(weight);
    const h = Number(height);

    // Check required fields
    if (
      !bp ||
      !heartRate.trim() ||
      !weight.trim() ||
      !height.trim()
    ) {
      Alert.alert(
        'Missing Information',
        'Please enter blood pressure, heart rate, weight and height.'
      );
      return;
    }

    // Validate blood pressure format, for example 120/80
    const bpMatch = bp.match(/^(\d{2,3})\s*\/\s*(\d{2,3})$/);

    if (
      !bpMatch ||
      Number(bpMatch[1]) < 1 ||
      Number(bpMatch[1]) > 300 ||
      Number(bpMatch[2]) < 1 ||
      Number(bpMatch[2]) > 200 ||
      !Number.isFinite(hr) ||
      hr < 1 ||
      hr > 300 ||
      !Number.isFinite(w) ||
      w <= 0 ||
      w > 500 ||
      !Number.isFinite(h) ||
      h <= 0 ||
      h > 300
    ) {
      Alert.alert(
        'Invalid Information',
        'Enter valid readings. Example: blood pressure 120/80, heart rate 72, weight 60 kg and height 165 cm.'
      );
      return;
    }

    try {
      setSaving(true);

      // Get logged-in user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        Alert.alert(
          'Login Required',
          'Please log in before saving your health information.'
        );
        return;
      }

      // Prepare health information
      const healthData = {
        user_id: user.id,
        blood_pressure: bp,
        heart_rate: Math.round(hr),
        weight: w,
        height: h,
        bmi,
        medical_condition: medicalCondition.trim() || 'None',
      };

      // Insert record into Supabase
      const { error } = await supabase
        .from('health_monitoring')
        .insert([healthData]);

      if (error) throw error;

      Alert.alert(
        'Success',
        'Your health information has been saved successfully!'
      );
    } catch (error) {
      console.error('Health Monitoring Save Error:', error);

      Alert.alert(
        'Save Failed',
        error.message ||
          'Unable to save health information. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Health Monitoring
          </Text>

          <View style={styles.headerSpace} />
        </View>

        {/* Introduction */}
        <Text style={styles.title}>Monitor Your Health</Text>

        <Text style={styles.subtitle}>
          Keep track of your important health and fitness information.
        </Text>

        {/* Health Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>
            Health Overview
          </Text>

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
              <Text style={styles.overviewLabel}>
                Blood Pressure
              </Text>

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
                {bmi ?? '--'}
              </Text>
            </View>
          </View>
        </View>

        {/* Health Information */}
        <Text style={styles.sectionTitle}>
          Health Information
        </Text>

        {/* Blood Pressure */}
        <View style={styles.inputCard}>
          <Text style={styles.inputIcon}>🩸</Text>

          <View style={styles.inputContent}>
            <Text style={styles.inputLabel}>
              Blood Pressure
            </Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. 120/80"
              placeholderTextColor="#68716C"
              value={bloodPressure}
              onChangeText={setBloodPressure}
              keyboardType="numbers-and-punctuation"
              maxLength={7}
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
              placeholder="e.g. 72"
              placeholderTextColor="#68716C"
              value={heartRate}
              onChangeText={setHeartRate}
              keyboardType="numeric"
              maxLength={3}
            />

            <Text style={styles.inputHint}>
              Enter your resting heart rate in BPM
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
              placeholder="e.g. 60"
              placeholderTextColor="#68716C"
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              maxLength={6}
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
              placeholder="e.g. 165"
              placeholderTextColor="#68716C"
              value={height}
              onChangeText={setHeight}
              keyboardType="decimal-pad"
              maxLength={6}
            />

            <Text style={styles.inputHint}>
              Enter your height in centimeters
            </Text>
          </View>
        </View>

        {/* BMI Result */}
        {bmi !== null && (
          <View style={styles.bmiCard}>
            <View>
              <Text style={styles.bmiSmall}>YOUR BMI</Text>
              <Text style={styles.bmiValue}>{bmi}</Text>
              <Text style={styles.bmiStatus}>
                {getBMIStatus()}
              </Text>
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
            maxLength={500}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            saving && styles.saveButtonDisabled,
          ]}
          onPress={handleSaveHealth}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator color="#07100B" />
          ) : (
            <Text style={styles.saveButtonText}>
              Save Health Information
            </Text>
          )}
        </TouchableOpacity>

        {/* Information Note */}
        <View style={styles.noteCard}>
          <Text style={styles.noteIcon}>ℹ️</Text>

          <Text style={styles.noteText}>
            Keep your health information updated for more personalized
            fitness recommendations.
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

  saveButtonDisabled: {
    opacity: 0.7,
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
