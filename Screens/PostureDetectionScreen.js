import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function PostureDetectionScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraStarted, setCameraStarted] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState('Squats');
  const [reps, setReps] = useState(0);
  const [feedback, setFeedback] = useState('Ready to analyze your posture');

  // Camera permission loading
  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Loading camera...
        </Text>
      </View>
    );
  }

  // Camera permission not granted
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.logo}>ELITE-FIT</Text>

        <Text style={styles.cameraIcon}>📷</Text>

        <Text style={styles.permissionTitle}>
          Camera Permission Required
        </Text>

        <Text style={styles.permissionText}>
          AI Posture Detection needs access to your camera
          to analyze your exercise form.
        </Text>

        <TouchableOpacity
          style={styles.allowButton}
          onPress={requestPermission}
        >
          <Text style={styles.allowButtonText}>
            Allow Camera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const startDetection = () => {
    setCameraStarted(true);
    setFeedback('Position yourself in front of the camera');
  };

  const stopDetection = () => {
    setCameraStarted(false);
    setFeedback('Detection stopped');
  };

  const simulateRep = () => {
    setReps(prev => prev + 1);
    setFeedback('✅ Good posture! Keep going.');
  };

  return (
    <View style={styles.container}>

      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButtonTop}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>
            ‹
          </Text>
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            AI Posture Detection
          </Text>

          <Text style={styles.headerSubtitle}>
            Smart Exercise Form Analysis
          </Text>
        </View>

        <View style={styles.aiBadge}>
          <Text style={styles.aiBadgeText}>
            AI
          </Text>
        </View>

      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ================= EXERCISE SELECTION ================= */}

        <Text style={styles.sectionTitle}>
          Select Exercise
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.exerciseRow}
        >

          {/* Squats */}

          <TouchableOpacity
            style={[
              styles.exerciseButton,
              selectedExercise === 'Squats' &&
                styles.selectedExercise,
            ]}
            onPress={() => setSelectedExercise('Squats')}
          >
            <Text style={styles.exerciseIcon}>
              🏋️
            </Text>

            <Text
              style={[
                styles.exerciseText,
                selectedExercise === 'Squats' &&
                  styles.selectedExerciseText,
              ]}
            >
              Squats
            </Text>
          </TouchableOpacity>


          {/* Push Ups */}

          <TouchableOpacity
            style={[
              styles.exerciseButton,
              selectedExercise === 'Push-ups' &&
                styles.selectedExercise,
            ]}
            onPress={() => setSelectedExercise('Push-ups')}
          >
            <Text style={styles.exerciseIcon}>
              💪
            </Text>

            <Text
              style={[
                styles.exerciseText,
                selectedExercise === 'Push-ups' &&
                  styles.selectedExerciseText,
              ]}
            >
              Push-ups
            </Text>
          </TouchableOpacity>


          {/* Lunges */}

          <TouchableOpacity
            style={[
              styles.exerciseButton,
              selectedExercise === 'Lunges' &&
                styles.selectedExercise,
            ]}
            onPress={() => setSelectedExercise('Lunges')}
          >
            <Text style={styles.exerciseIcon}>
              🦵
            </Text>

            <Text
              style={[
                styles.exerciseText,
                selectedExercise === 'Lunges' &&
                  styles.selectedExerciseText,
              ]}
            >
              Lunges
            </Text>
          </TouchableOpacity>

        </ScrollView>


        {/* ================= CAMERA ================= */}

        <Text style={styles.sectionTitle}>
          Camera Analysis
        </Text>

        <View style={styles.cameraContainer}>

          {cameraStarted ? (

            <CameraView
              style={styles.camera}
              facing="front"
            >

              {/* Camera Overlay */}

              <View style={styles.cameraOverlay}>

                <View style={styles.detectionFrame} />

                <View style={styles.cameraTopText}>
                  <View style={styles.liveDot} />

                  <Text style={styles.liveText}>
                    LIVE AI ANALYSIS
                  </Text>
                </View>

                <View style={styles.cameraBottom}>

                  <Text style={styles.cameraExercise}>
                    {selectedExercise}
                  </Text>

                  <Text style={styles.cameraInstruction}>
                    Keep your full body visible
                  </Text>

                </View>

              </View>

            </CameraView>

          ) : (

            <View style={styles.cameraPlaceholder}>

              <Text style={styles.cameraPlaceholderIcon}>
                📷
              </Text>

              <Text style={styles.cameraPlaceholderTitle}>
                Camera Ready
              </Text>

              <Text style={styles.cameraPlaceholderText}>
                Start detection to analyze your
                {` ${selectedExercise}`} form.
              </Text>

            </View>

          )}

        </View>


        {/* ================= FEEDBACK ================= */}

        <View style={styles.feedbackCard}>

          <View style={styles.feedbackHeader}>

            <Text style={styles.feedbackTitle}>
              AI Feedback
            </Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {cameraStarted ? 'ACTIVE' : 'READY'}
              </Text>
            </View>

          </View>

          <Text style={styles.feedbackText}>
            {feedback}
          </Text>

        </View>


        {/* ================= REP COUNTER ================= */}

        <View style={styles.statsContainer}>

          <View style={styles.repCard}>

            <Text style={styles.repNumber}>
              {reps}
            </Text>

            <Text style={styles.repLabel}>
              Repetitions
            </Text>

          </View>

          <View style={styles.repCard}>

            <Text style={styles.repNumber}>
              {selectedExercise}
            </Text>

            <Text style={styles.repLabel}>
              Exercise
            </Text>

          </View>

        </View>


        {/* ================= BUTTONS ================= */}

        {!cameraStarted ? (

          <TouchableOpacity
            style={styles.startButton}
            onPress={startDetection}
          >
            <Text style={styles.startButtonIcon}>
              📷
            </Text>

            <Text style={styles.startButtonText}>
              Start AI Detection
            </Text>
          </TouchableOpacity>

        ) : (

          <View>

            <TouchableOpacity
              style={styles.repButton}
              onPress={simulateRep}
            >
              <Text style={styles.repButtonText}>
                + Add Rep
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.stopButton}
              onPress={stopDetection}
            >
              <Text style={styles.stopButtonText}>
                Stop Detection
              </Text>
            </TouchableOpacity>

          </View>

        )}

        <Text style={styles.note}>
          💡 AI posture analysis will provide real-time
          exercise form feedback.
        </Text>

      </ScrollView>

    </View>
  );
}


/* ========================================================= */
/* ========================= STYLES ======================== */
/* ========================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#0B0F0E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#39FF88',
    fontSize: 16,
  },

  permissionContainer: {
    flex: 1,
    backgroundColor: '#0B0F0E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  logo: {
    color: '#39FF88',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 35,
  },

  cameraIcon: {
    fontSize: 55,
    marginBottom: 20,
  },

  permissionTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  permissionText: {
    color: '#A9B0AC',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 30,
  },

  allowButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#39FF88',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },

  allowButtonText: {
    color: '#07100B',
    fontSize: 16,
    fontWeight: 'bold',
  },

  backButton: {
    marginTop: 20,
  },

  backText: {
    color: '#39FF88',
    fontSize: 15,
    fontWeight: '600',
  },


  /* HEADER */

  header: {
    height: 75,
    backgroundColor: '#111613',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#26302B',
  },

  backButtonTop: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#171D1A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backArrow: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 32,
  },

  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  headerSubtitle: {
    color: '#8F9994',
    fontSize: 10,
    marginTop: 3,
  },

  aiBadge: {
    backgroundColor: '#39FF88',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
  },

  aiBadgeText: {
    color: '#07100B',
    fontSize: 10,
    fontWeight: 'bold',
  },


  /* CONTENT */

  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },


  /* EXERCISES */

  exerciseRow: {
    paddingBottom: 20,
  },

  exerciseButton: {
    width: 105,
    height: 85,
    backgroundColor: '#171D1A',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#26302B',
  },

  selectedExercise: {
    backgroundColor: '#203D2C',
    borderColor: '#39FF88',
  },

  exerciseIcon: {
    fontSize: 25,
    marginBottom: 5,
  },

  exerciseText: {
    color: '#A9B0AC',
    fontSize: 12,
    fontWeight: '600',
  },

  selectedExerciseText: {
    color: '#39FF88',
  },


  /* CAMERA */

  cameraContainer: {
    height: 390,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#111613',
    borderWidth: 1,
    borderColor: '#26302B',
    marginBottom: 15,
  },

  camera: {
    flex: 1,
  },

  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },

  cameraPlaceholderIcon: {
    fontSize: 50,
    marginBottom: 15,
  },

  cameraPlaceholderTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  cameraPlaceholderText: {
    color: '#8F9994',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },

  cameraOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },

  cameraTopText: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#39FF88',
    marginRight: 7,
  },

  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  detectionFrame: {
    position: 'absolute',
    top: '18%',
    left: '17%',
    right: '17%',
    bottom: '15%',
    borderWidth: 2,
    borderColor: '#39FF88',
    borderRadius: 20,
  },

  cameraBottom: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },

  cameraExercise: {
    color: '#39FF88',
    fontSize: 15,
    fontWeight: 'bold',
  },

  cameraInstruction: {
    color: '#FFFFFF',
    fontSize: 10,
    marginTop: 3,
  },


  /* FEEDBACK */

  feedbackCard: {
    backgroundColor: '#17231D',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#26302B',
  },

  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 9,
  },

  feedbackTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  statusBadge: {
    backgroundColor: '#203D2C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  statusText: {
    color: '#095859',
    fontSize: 8,
    fontWeight: 'bold',
  },

  feedbackText: {
    color: '#A9B0AC',
    fontSize: 13,
    lineHeight: 20,
  },


  /* STATS */

  statsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  repCard: {
    flex: 1,
    backgroundColor: '#171D1A',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  repNumber: {
    color: '#095859',
    fontSize: 20,
    fontWeight: 'bold',
  },

  repLabel: {
    color: '#8F9994',
    fontSize: 11,
    marginTop: 4,
  },


  /* BUTTONS */

  startButton: {
    height: 55,
    borderRadius: 28,
    backgroundColor: '#095859',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  startButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  startButtonText: {
    color: '#07100B',
    fontSize: 16,
    fontWeight: 'bold',
  },

  repButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#095859',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  repButtonText: {
    color: '#07100B',
    fontSize: 15,
    fontWeight: 'bold',
  },

  stopButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#171D1A',
    borderWidth: 1,
    borderColor: '#39433E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  note: {
    color: '#68736D',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 15,
  },

});