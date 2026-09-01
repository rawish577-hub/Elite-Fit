import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function ProgressScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          <View>
            <Text style={styles.smallTitle}>
              ELITE-FIT
            </Text>

            <Text style={styles.title}>
              Your Progress 📊
            </Text>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeText}>
              ✕
            </Text>
          </TouchableOpacity>

        </View>


        {/* ================= SUMMARY ================= */}

        <Text style={styles.sectionTitle}>
          This Month
        </Text>

        <View style={styles.statsContainer}>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🏋️</Text>

            <Text style={styles.statNumber}>
              12
            </Text>

            <Text style={styles.statLabel}>
              Workouts
            </Text>
          </View>


          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔥</Text>

            <Text style={styles.statNumber}>
              2,450
            </Text>

            <Text style={styles.statLabel}>
              Calories
            </Text>
          </View>


          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📅</Text>

            <Text style={styles.statNumber}>
              18
            </Text>

            <Text style={styles.statLabel}>
              Active Days
            </Text>
          </View>

        </View>


        {/* ================= WEEKLY PROGRESS ================= */}

        <Text style={styles.sectionTitle}>
          Weekly Activity
        </Text>

        <View style={styles.weekCard}>

          <View style={styles.daysRow}>

            <View style={styles.dayContainer}>
              <View style={[styles.bar, styles.barSmall]} />
              <Text style={styles.dayText}>Mon</Text>
            </View>

            <View style={styles.dayContainer}>
              <View style={[styles.bar, styles.barMedium]} />
              <Text style={styles.dayText}>Tue</Text>
            </View>

            <View style={styles.dayContainer}>
              <View style={[styles.bar, styles.barLarge]} />
              <Text style={styles.dayText}>Wed</Text>
            </View>

            <View style={styles.dayContainer}>
              <View style={[styles.bar, styles.barMedium]} />
              <Text style={styles.dayText}>Thu</Text>
            </View>

            <View style={styles.dayContainer}>
              <View style={[styles.bar, styles.barLarge]} />
              <Text style={styles.dayText}>Fri</Text>
            </View>

            <View style={styles.dayContainer}>
              <View style={[styles.bar, styles.barSmall]} />
              <Text style={styles.dayText}>Sat</Text>
            </View>

            <View style={styles.dayContainer}>
              <View style={[styles.bar, styles.barEmpty]} />
              <Text style={styles.dayText}>Sun</Text>
            </View>

          </View>

        </View>


        {/* ================= FITNESS GOAL ================= */}

        <Text style={styles.sectionTitle}>
          Fitness Goal
        </Text>

        <View style={styles.goalCard}>

          <View style={styles.goalHeader}>

            <View>
              <Text style={styles.goalTitle}>
                Workout Goal
              </Text>

              <Text style={styles.goalSubtitle}>
                12 of 20 workouts completed
              </Text>
            </View>

            <Text style={styles.goalPercentage}>
              60%
            </Text>

          </View>


          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.remainingText}>
            8 workouts remaining this month
          </Text>

        </View>


        {/* ================= ACHIEVEMENTS ================= */}

        <Text style={styles.sectionTitle}>
          Achievements 🏆
        </Text>

        <View style={styles.achievementCard}>

          <View style={styles.achievementIcon}>
            <Text style={styles.achievementEmoji}>
              🔥
            </Text>
          </View>

          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>
              7 Day Streak
            </Text>

            <Text style={styles.achievementText}>
              You completed workouts for 7 days in a row.
            </Text>
          </View>

          <Text style={styles.checkIcon}>
            ✓
          </Text>

        </View>


        <View style={styles.achievementCard}>

          <View style={styles.achievementIcon}>
            <Text style={styles.achievementEmoji}>
              💪
            </Text>
          </View>

          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>
              Workout Warrior
            </Text>

            <Text style={styles.achievementText}>
              You completed 10 workouts.
            </Text>
          </View>

          <Text style={styles.checkIcon}>
            ✓
          </Text>

        </View>


        <View style={styles.achievementCard}>

          <View style={styles.achievementIcon}>
            <Text style={styles.achievementEmoji}>
              ⭐
            </Text>
          </View>

          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>
              Fitness Beginner
            </Text>

            <Text style={styles.achievementText}>
              Keep going and unlock more achievements.
            </Text>
          </View>

          <Text style={styles.lockIcon}>
            🔒
          </Text>

        </View>


        {/* ================= MOTIVATION ================= */}

        <View style={styles.motivationCard}>

          <Text style={styles.motivationIcon}>
            🚀
          </Text>

          <Text style={styles.motivationTitle}>
            Keep Going!
          </Text>

          <Text style={styles.motivationText}>
            Every workout brings you one step closer
            to your fitness goal.
          </Text>

        </View>


        {/* ================= BACK BUTTON ================= */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>
            Back to Dashboard
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
  },


  /* ================= HEADER ================= */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  smallTitle: {
    color: '#39FF88',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 5,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#171D1A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    color: '#FFFFFF',
    fontSize: 18,
  },


  /* ================= SECTION ================= */

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 14,
    marginTop: 5,
  },


  /* ================= STATS ================= */

  statsContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#171D1A',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#222A25',
  },

  statIcon: {
    fontSize: 22,
    marginBottom: 7,
  },

  statNumber: {
    color: '#39FF88',
    fontSize: 22,
    fontWeight: 'bold',
  },

  statLabel: {
    color: '#8F9994',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },


  /* ================= WEEK ================= */

  weekCard: {
    backgroundColor: '#171D1A',
    borderRadius: 18,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#222A25',
  },

  daysRow: {
    height: 150,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },

  bar: {
    width: 20,
    borderRadius: 10,
    backgroundColor: '#39FF88',
    marginBottom: 9,
  },

  barSmall: {
    height: 45,
  },

  barMedium: {
    height: 75,
  },

  barLarge: {
    height: 110,
  },

  barEmpty: {
    height: 20,
    backgroundColor: '#29322D',
  },

  dayText: {
    color: '#8F9994',
    fontSize: 10,
  },


  /* ================= GOAL ================= */

  goalCard: {
    backgroundColor: '#17231D',
    borderRadius: 18,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#26302B',
  },

  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  goalTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  goalSubtitle: {
    color: '#8F9994',
    fontSize: 12,
    marginTop: 5,
  },

  goalPercentage: {
    color: '#39FF88',
    fontSize: 22,
    fontWeight: 'bold',
  },

  progressBackground: {
    height: 10,
    backgroundColor: '#29322D',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#39FF88',
    borderRadius: 10,
  },

  remainingText: {
    color: '#8F9994',
    fontSize: 11,
    marginTop: 9,
  },


  /* ================= ACHIEVEMENTS ================= */

  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#171D1A',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#222A25',
  },

  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#202923',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  achievementEmoji: {
    fontSize: 25,
  },

  achievementInfo: {
    flex: 1,
  },

  achievementTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  achievementText: {
    color: '#8F9994',
    fontSize: 11,
    lineHeight: 17,
  },

  checkIcon: {
    color: '#39FF88',
    fontSize: 22,
    fontWeight: 'bold',
  },

  lockIcon: {
    fontSize: 17,
  },


  /* ================= MOTIVATION ================= */

  motivationCard: {
    backgroundColor: '#172B20',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#39FF88',
  },

  motivationIcon: {
    fontSize: 32,
    marginBottom: 8,
  },

  motivationTitle: {
    color: '#39FF88',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  motivationText: {
    color: '#A9B0AC',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },


  /* ================= BACK ================= */

  backButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#39FF88',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonText: {
    color: '#07100B',
    fontSize: 15,
    fontWeight: 'bold',
  },

});