import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

export default function DashboardScreen({ navigation, route }) {

  // Profile Setup se aane wala data
  const profileData = route?.params?.profileData || {};

  const userName = profileData.name || 'User';

  return (
    <View style={styles.container}>

      {/* ================= CONTENT ================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          <View>
            <Text style={styles.greeting}>
              Welcome, {userName} 👋
            </Text>

            <Text style={styles.logo}>
              ELITE-FIT
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() =>
              navigation.navigate('Profile', {
                profileData: profileData,
              })
            }
          >
            <Text style={styles.profileIcon}>
              👤
            </Text>
          </TouchableOpacity>

        </View>


        {/* ================= WELCOME CARD ================= */}

        <View style={styles.welcomeCard}>

          <Text style={styles.welcomeTitle}>
            Ready for today's workout? 💪
          </Text>

          <Text style={styles.welcomeText}>
            Stay consistent, stay strong and keep moving
            toward your fitness goal.
          </Text>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('Workouts')}
          >
            <Text style={styles.startButtonText}>
              Start Workout
            </Text>
          </TouchableOpacity>

        </View>


        {/* ================= PROGRESS ================= */}

        <Text style={styles.sectionTitle}>
          Your Progress
        </Text>

        <View style={styles.statsRow}>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              0
            </Text>

            <Text style={styles.statLabel}>
              Workouts
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              0
            </Text>

            <Text style={styles.statLabel}>
              Calories
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              0
            </Text>

            <Text style={styles.statLabel}>
              Days
            </Text>
          </View>

        </View>


        {/* ================= EXPLORE ================= */}

        <Text style={styles.sectionTitle}>
          Explore Elite-Fit
        </Text>


        {/* ================= WORKOUT ================= */}

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('Workouts')}
        >

          <View style={styles.iconBox}>
            <Text style={styles.featureIcon}>
              🏋️
            </Text>
          </View>

          <View style={styles.featureInfo}>

            <Text style={styles.featureTitle}>
              Workouts
            </Text>

            <Text style={styles.featureText}>
              Personalized exercises designed for your
              fitness goal.
            </Text>

          </View>

          <Text style={styles.arrow}>
            ›
          </Text>

        </TouchableOpacity>


        {/* ================= AI POSTURE DETECTION ================= */}

        <TouchableOpacity
          style={styles.postureCard}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('PostureDetection')
          }
        >

          <View style={styles.postureIconBox}>
            <Text style={styles.postureIcon}>
              🧍
            </Text>
          </View>

          <View style={styles.postureInfo}>

            <View style={styles.postureTitleRow}>

              <Text style={styles.postureTitle}>
                AI Posture Detection
              </Text>

              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>
                  AI
                </Text>
              </View>

            </View>

            <Text style={styles.postureText}>
              Analyze your exercise form with AI camera
              detection and get instant feedback.
            </Text>

          </View>

          <Text style={styles.postureArrow}>
            ›
          </Text>

        </TouchableOpacity>


        {/* ================= AI TRAINER ================= */}

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('AITrainer')}
        >

          <View style={styles.iconBox}>
            <Text style={styles.featureIcon}>
              🤖
            </Text>
          </View>

          <View style={styles.featureInfo}>

            <Text style={styles.featureTitle}>
              AI Trainer
            </Text>

            <Text style={styles.featureText}>
              Get smart fitness guidance from your
              personal AI coach.
            </Text>

          </View>

          <Text style={styles.arrow}>
            ›
          </Text>

        </TouchableOpacity>


        {/* ================= NUTRITION ================= */}

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('Nutrition')}
        >

          <View style={styles.iconBox}>
            <Text style={styles.featureIcon}>
              🥗
            </Text>
          </View>

          <View style={styles.featureInfo}>

            <Text style={styles.featureTitle}>
              Nutrition
            </Text>

            <Text style={styles.featureText}>
              Discover personalized nutrition
              recommendations.
            </Text>

          </View>

          <Text style={styles.arrow}>
            ›
          </Text>

        </TouchableOpacity>


        {/* ================= PROGRESS ================= */}
<TouchableOpacity
  style={styles.featureCard}
  activeOpacity={0.8}
  onPress={() => navigation.navigate('Progress')}
>

  <View style={styles.iconBox}>
    <Text style={styles.featureIcon}>
      📊
    </Text>
  </View>

  <View style={styles.featureInfo}>

    <Text style={styles.featureTitle}>
      Progress
    </Text>

    <Text style={styles.featureText}>
      Track your workouts and fitness
      achievements.
    </Text>

  </View>

  <Text style={styles.arrow}>
    ›
  </Text>

</TouchableOpacity>
        
         


       {/* ================= HEALTH MONITORING ================= */}

<TouchableOpacity
  style={styles.featureCard}
  onPress={() => navigation.navigate('HealthMonitoring')}
>

  <View style={styles.iconBox}>
    <Text style={styles.featureIcon}>
      ❤️
    </Text>
  </View>

  <View style={styles.featureInfo}>

    <Text style={styles.featureTitle}>
      Health Monitoring
    </Text>

    <Text style={styles.featureText}>
      Monitor important health and fitness
      information.
    </Text>

  </View>

  <Text style={styles.arrow}>
    ›
  </Text>

</TouchableOpacity>

</ScrollView>

       

          

      {/* ================================================= */}
      {/* ================= BOTTOM NAV ==================== */}
      {/* ================================================= */}

      <View style={styles.bottomNav}>

        {/* HOME */}

        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('Dashboard', {
              profileData: profileData,
            })
          }
        >
          <Text style={styles.navIcon}>
            🏠
          </Text>

          <Text style={styles.activeNavText}>
            Home
          </Text>
        </TouchableOpacity>


        {/* WORKOUT */}

        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('Workouts')
          }
        >
          <Text style={styles.navIcon}>
            🏋️
          </Text>

          <Text style={styles.navText}>
            Workout
          </Text>
        </TouchableOpacity>


        {/* ================= AI POSTURE ================= */}

        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('PostureDetection')
          }
        >

          <Text style={styles.navIcon}>
            🧍
          </Text>

          <Text style={styles.navText}>
            Posture
          </Text>

        </TouchableOpacity>


        {/* ================= AI TRAINER ================= */}

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


        {/* ================= NUTRITION ================= */}

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


        {/* ================= PROFILE ================= */}

        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('Profile', {
              profileData: profileData,
            })
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


/* ========================================================= */
/* ======================= STYLES ========================== */
/* ========================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 105,
  },


  /* ================= HEADER ================= */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  greeting: {
    color: '#A9B0AC',
    fontSize: 14,
    marginBottom: 3,
  },

  logo: {
    color: '#39FF88',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#171D1A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIcon: {
    fontSize: 22,
  },


  /* ================= WELCOME ================= */

  welcomeCard: {
    backgroundColor: '#17231D',
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#26302B',
  },

  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  welcomeText: {
    color: '#A9B0AC',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },

  startButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#39FF88',
    justifyContent: 'center',
    alignItems: 'center',
  },

  startButtonText: {
    color: '#07100B',
    fontSize: 15,
    fontWeight: 'bold',
  },


  /* ================= SECTION ================= */

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
  },


  /* ================= STATS ================= */

  statsRow: {
    flexDirection: 'row',
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#171D1A',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  statNumber: {
    color: '#39FF88',
    fontSize: 25,
    fontWeight: 'bold',
  },

  statLabel: {
    color: '#A9B0AC',
    fontSize: 12,
    marginTop: 5,
  },


  /* ================= FEATURE CARD ================= */

  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#171D1A',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#202823',
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#202923',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  featureIcon: {
    fontSize: 27,
  },

  featureInfo: {
    flex: 1,
  },

  featureTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  featureText: {
    color: '#8F9994',
    fontSize: 12,
    lineHeight: 18,
  },

  arrow: {
    color: '#39FF88',
    fontSize: 30,
    marginLeft: 8,
  },


  /* ================= AI POSTURE CARD ================= */

  postureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172B20',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#39FF88',
    elevation: 5,
  },

  postureIconBox: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#203D2C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  postureIcon: {
    fontSize: 28,
  },

  postureInfo: {
    flex: 1,
  },

  postureTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  postureTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  aiBadge: {
    marginLeft: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#39FF88',
  },

  aiBadgeText: {
    color: '#07100B',
    fontSize: 8,
    fontWeight: 'bold',
  },

  postureText: {
    color: '#A0AAA4',
    fontSize: 12,
    lineHeight: 18,
  },

  postureArrow: {
    color: '#39FF88',
    fontSize: 31,
    marginLeft: 7,
  },


  /* ================= BOTTOM NAV ================= */

  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 75,
    backgroundColor: '#111613',
    borderTopWidth: 1,
    borderTopColor: '#26302B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 18,
    marginBottom: 3,
  },

  navText: {
    color: '#777F7B',
    fontSize: 8,
    textAlign: 'center',
  },

  activeNavText: {
    color: '#39FF88',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});