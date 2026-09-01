import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

export default function ProfileScreen({ navigation, route }) {

  // Profile Setup se received data
  const profileData = route?.params?.profileData || {};

  const name = profileData.name || 'Not Set';
  const age = profileData.age || 'Not Set';
  const gender = profileData.gender || 'Not Set';
  const height = profileData.height || 'Not Set';
  const weight = profileData.weight || 'Not Set';
  const goal = profileData.goal || 'Not Set';
  const healthIssue = profileData.healthIssue || 'No health issue added';


  return (
    <View style={styles.container}>

      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          My Profile
        </Text>

        <View style={styles.headerSpace} />

      </View>


      {/* ================= CONTENT ================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ================= PROFILE AVATAR ================= */}

        <View style={styles.profileSection}>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              👤
            </Text>
          </View>

          <Text style={styles.profileName}>
            {name}
          </Text>

          <Text style={styles.profileSubtitle}>
            ELITE-FIT Member
          </Text>

        </View>


        {/* ================= PERSONAL INFORMATION ================= */}

        <Text style={styles.sectionTitle}>
          Personal Information
        </Text>

        <View style={styles.infoCard}>

          {/* Name */}

          <View style={styles.infoRow}>

            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>
                👤
              </Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Full Name
              </Text>

              <Text style={styles.infoValue}>
                {name}
              </Text>
            </View>

          </View>


          <View style={styles.divider} />


          {/* Age */}

          <View style={styles.infoRow}>

            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>
                🎂
              </Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Age
              </Text>

              <Text style={styles.infoValue}>
                {age} {age !== 'Not Set' ? 'years' : ''}
              </Text>
            </View>

          </View>


          <View style={styles.divider} />


          {/* Gender */}

          <View style={styles.infoRow}>

            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>
                ⚧️
              </Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Gender
              </Text>

              <Text style={styles.infoValue}>
                {gender}
              </Text>
            </View>

          </View>

        </View>


        {/* ================= BODY INFORMATION ================= */}

        <Text style={styles.sectionTitle}>
          Body Information
        </Text>

        <View style={styles.bodyRow}>

          {/* Height */}

          <View style={styles.bodyCard}>

            <Text style={styles.bodyIcon}>
              📏
            </Text>

            <Text style={styles.bodyLabel}>
              HEIGHT
            </Text>

            <Text style={styles.bodyValue}>
              {height}
            </Text>

            <Text style={styles.bodyUnit}>
              cm
            </Text>

          </View>


          {/* Weight */}

          <View style={styles.bodyCard}>

            <Text style={styles.bodyIcon}>
              ⚖️
            </Text>

            <Text style={styles.bodyLabel}>
              WEIGHT
            </Text>

            <Text style={styles.bodyValue}>
              {weight}
            </Text>

            <Text style={styles.bodyUnit}>
              kg
            </Text>

          </View>

        </View>


        {/* ================= FITNESS GOAL ================= */}

        <Text style={styles.sectionTitle}>
          Fitness Goal
        </Text>

        <View style={styles.goalCard}>

          <View style={styles.goalIconBox}>
            <Text style={styles.goalIcon}>
              🎯
            </Text>
          </View>

          <View style={styles.goalContent}>

            <Text style={styles.goalLabel}>
              CURRENT GOAL
            </Text>

            <Text style={styles.goalValue}>
              {goal}
            </Text>

          </View>

          <Text style={styles.goalArrow}>
            ›
          </Text>

        </View>


        {/* ================= HEALTH INFORMATION ================= */}

        <Text style={styles.sectionTitle}>
          Health Information
        </Text>

        <View style={styles.healthCard}>

          <View style={styles.healthIconBox}>
            <Text style={styles.healthIcon}>
              ❤️
            </Text>
          </View>

          <View style={styles.healthContent}>

            <Text style={styles.healthTitle}>
              Health Issues
            </Text>

            <Text style={styles.healthText}>
              {healthIssue}
            </Text>

          </View>

        </View>


        {/* ================= EDIT PROFILE ================= */}

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('ProfileSetup', {
              profileData: profileData,
            })
          }
        >

          <Text style={styles.editIcon}>
            ✏️
          </Text>

          <Text style={styles.editButtonText}>
            Edit Profile
          </Text>

        </TouchableOpacity>


        {/* ================= DASHBOARD BUTTON ================= */}

        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={() =>
            navigation.navigate('Dashboard', {
              profileData: profileData,
            })
          }
        >

          <Text style={styles.dashboardIcon}>
            🏠
          </Text>

          <Text style={styles.dashboardButtonText}>
            Back to Dashboard
          </Text>

        </TouchableOpacity>


        {/* Bottom spacing */}

        <View style={styles.bottomSpace} />

      </ScrollView>

    </View>
  );
}


/* ========================================================= */
/* ======================= STYLES ========================== */
/* ========================================================= */

const styles = StyleSheet.create({

  /* ================= MAIN ================= */

  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
  },


  /* ================= HEADER ================= */

  header: {
    height: 75,
    backgroundColor: '#111613',
    borderBottomWidth: 1,
    borderBottomColor: '#26302B',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
  },

  headerSpace: {
    width: 42,
  },


  /* ================= CONTENT ================= */

  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },


  /* ================= PROFILE ================= */

  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,

    backgroundColor: '#172B20',

    borderWidth: 2,
    borderColor: '#39FF88',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 12,
  },

  avatarText: {
    fontSize: 42,
  },

  profileName: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  profileSubtitle: {
    color: '#39FF88',
    fontSize: 12,
    fontWeight: '600',
  },


  /* ================= SECTION TITLE ================= */

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 5,
  },


  /* ================= INFO CARD ================= */

  infoCard: {
    backgroundColor: '#171D1A',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 25,

    borderWidth: 1,
    borderColor: '#26302B',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  infoIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,

    backgroundColor: '#202923',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 13,
  },

  infoIcon: {
    fontSize: 20,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: '#89928D',
    fontSize: 10,
    marginBottom: 4,
  },

  infoValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#26302B',
  },


  /* ================= BODY ================= */

  bodyRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  bodyCard: {
    flex: 1,

    backgroundColor: '#171D1A',

    borderRadius: 18,

    paddingVertical: 18,

    alignItems: 'center',

    marginHorizontal: 5,

    borderWidth: 1,
    borderColor: '#26302B',
  },

  bodyIcon: {
    fontSize: 25,
    marginBottom: 8,
  },

  bodyLabel: {
    color: '#89928D',
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  bodyValue: {
    color: '#39FF88',
    fontSize: 25,
    fontWeight: 'bold',
  },

  bodyUnit: {
    color: '#89928D',
    fontSize: 10,
    marginTop: 2,
  },


  /* ================= GOAL ================= */

  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#172B20',

    borderRadius: 17,

    padding: 16,

    marginBottom: 25,

    borderWidth: 1,
    borderColor: '#39FF88',
  },

  goalIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,

    backgroundColor: '#203D2C',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 13,
  },

  goalIcon: {
    fontSize: 24,
  },

  goalContent: {
    flex: 1,
  },

  goalLabel: {
    color: '#89928D',
    fontSize: 9,
    marginBottom: 4,
    fontWeight: 'bold',
  },

  goalValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  goalArrow: {
    color: '#39FF88',
    fontSize: 30,
  },


  /* ================= HEALTH ================= */

  healthCard: {
    flexDirection: 'row',

    backgroundColor: '#171D1A',

    borderRadius: 17,

    padding: 16,

    marginBottom: 25,

    borderWidth: 1,
    borderColor: '#26302B',
  },

  healthIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,

    backgroundColor: '#2A2022',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 13,
  },

  healthIcon: {
    fontSize: 23,
  },

  healthContent: {
    flex: 1,
  },

  healthTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  healthText: {
    color: '#9BA39F',
    fontSize: 12,
    lineHeight: 18,
  },


  /* ================= EDIT BUTTON ================= */

  editButton: {
    height: 53,

    borderRadius: 27,

    backgroundColor: '#39FF88',

    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',

    marginBottom: 12,
  },

  editIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  editButtonText: {
    color: '#07100B',
    fontSize: 15,
    fontWeight: 'bold',
  },


  /* ================= DASHBOARD BUTTON ================= */

  dashboardButton: {
    height: 53,

    borderRadius: 27,

    backgroundColor: '#171D1A',

    borderWidth: 1,
    borderColor: '#39FF88',

    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
  },

  dashboardIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  dashboardButtonText: {
    color: '#39FF88',
    fontSize: 15,
    fontWeight: 'bold',
  },


  bottomSpace: {
    height: 20,
  },

});