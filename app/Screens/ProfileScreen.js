
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/Slices/HomeDataSlice.js';
import { supabase } from '../supabase';

export default function ProfileScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const profileData = route?.params?.profileData || {};

  const name = profileData.name || 'Not Set';
  const age = profileData.age || 'Not Set';
  const gender = profileData.gender || 'Not Set';
  const height = profileData.height || 'Not Set';
  const weight = profileData.weight || 'Not Set';
  const goal = profileData.goal || 'Not Set';
  const healthIssue =
    profileData.healthIssue ||
    profileData.health_issue ||
    'No health issue added';

  const [notificationSettings, setNotificationSettings] = useState({
    notifications_enabled: true,
    workout_reminders: true,
    nutrition_reminders: true,
    progress_updates: true,
  });

  const [settingsLoading, setSettingsLoading] = useState(true);
  const [savingSetting, setSavingSetting] = useState(false);

  // Load notification preferences from Supabase
  const loadNotificationSettings = useCallback(async () => {
    try {
      setSettingsLoading(true);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        throw new Error('Please log in to view notification settings.');
      }

      const { data, error } = await supabase
        .from('notification_settings')
        .select(
          'notifications_enabled, workout_reminders, nutrition_reminders, progress_updates'
        )
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setNotificationSettings({
          notifications_enabled: data.notifications_enabled,
          workout_reminders: data.workout_reminders,
          nutrition_reminders: data.nutrition_reminders,
          progress_updates: data.progress_updates,
        });
      } else {
        // Create default settings for a new user
        const defaults = {
          user_id: user.id,
          notifications_enabled: true,
          workout_reminders: true,
          nutrition_reminders: true,
          progress_updates: true,
        };

        const { error: insertError } = await supabase
          .from('notification_settings')
          .insert(defaults);

        if (insertError) throw insertError;

        setNotificationSettings({
          notifications_enabled: true,
          workout_reminders: true,
          nutrition_reminders: true,
          progress_updates: true,
        });
      }
    } catch (error) {
      console.error('Notification settings error:', error.message);
      Alert.alert(
        'Notification Settings',
        error.message || 'Could not load notification settings.'
      );
    } finally {
      setSettingsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotificationSettings();
  }, [loadNotificationSettings]);

  // Update preferences in Supabase
  const updateNotificationSetting = async (key, value) => {
    if (savingSetting) return;

    const previousSettings = { ...notificationSettings };
    const updatedSettings = {
      ...previousSettings,
      [key]: value,
    };

    if (key === 'notifications_enabled' && !value) {
      updatedSettings.workout_reminders = false;
      updatedSettings.nutrition_reminders = false;
      updatedSettings.progress_updates = false;
    }

    if (key !== 'notifications_enabled' && value) {
      updatedSettings.notifications_enabled = true;
    }

    setNotificationSettings(updatedSettings);
    setSavingSetting(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) throw new Error('Please log in again.');

      const { error } = await supabase
        .from('notification_settings')
        .upsert(
          {
            user_id: user.id,
            ...updatedSettings,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );

      if (error) throw error;
    } catch (error) {
      setNotificationSettings(previousSettings);

      Alert.alert(
        'Save Failed',
        error.message || 'Could not save notification settings.'
      );
    } finally {
      setSavingSetting(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      dispatch(clearUser());
      navigation.replace('Welcome');
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  const renderNotificationSwitch = (key, label, subtitle, icon) => {
    const isEnabled = notificationSettings[key];

    return (
      <View style={styles.notificationRow} key={key}>
        <View style={styles.notificationSmallIcon}>
          <Text style={styles.notificationEmoji}>{icon}</Text>
        </View>

        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>{label}</Text>
          <Text style={styles.notificationSubtitle}>{subtitle}</Text>
        </View>

        <Switch
          value={isEnabled}
          onValueChange={(value) =>
            updateNotificationSetting(key, value)
          }
          trackColor={{ false: '#3A423D', true: '#237A49' }}
          thumbColor={isEnabled ? '#39FF88' : '#B8C0BB'}
          disabled={
            savingSetting ||
            !notificationSettings.notifications_enabled
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>

          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileSubtitle}>ELITE-FIT Member</Text>
        </View>

        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>👤</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{name}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>🎂</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>
                {age} {age !== 'Not Set' ? 'years' : ''}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>⚧️</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>{gender}</Text>
            </View>
          </View>
        </View>

        {/* Body Information */}
        <Text style={styles.sectionTitle}>Body Information</Text>

        <View style={styles.bodyRow}>
          <View style={styles.bodyCard}>
            <Text style={styles.bodyIcon}>📏</Text>
            <Text style={styles.bodyLabel}>HEIGHT</Text>
            <Text style={styles.bodyValue}>{height}</Text>
            <Text style={styles.bodyUnit}>cm</Text>
          </View>

          <View style={styles.bodyCard}>
            <Text style={styles.bodyIcon}>⚖️</Text>
            <Text style={styles.bodyLabel}>WEIGHT</Text>
            <Text style={styles.bodyValue}>{weight}</Text>
            <Text style={styles.bodyUnit}>kg</Text>
          </View>
        </View>

        {/* Fitness Goal */}
        <Text style={styles.sectionTitle}>Fitness Goal</Text>

        <View style={styles.goalCard}>
          <View style={styles.goalIconBox}>
            <Text style={styles.goalIcon}>🎯</Text>
          </View>

          <View style={styles.goalContent}>
            <Text style={styles.goalLabel}>CURRENT GOAL</Text>
            <Text style={styles.goalValue}>{goal}</Text>
          </View>

          <Text style={styles.goalArrow}>›</Text>
        </View>

        {/* Health Information */}
        <Text style={styles.sectionTitle}>Health Information</Text>

        <View style={styles.healthCard}>
          <View style={styles.healthIconBox}>
            <Text style={styles.healthIcon}>❤️</Text>
          </View>

          <View style={styles.healthContent}>
            <Text style={styles.healthTitle}>Health Issues</Text>
            <Text style={styles.healthText}>{healthIssue}</Text>
          </View>
        </View>

        {/* Notification Settings */}
        <Text style={styles.sectionTitle}>Notification Settings</Text>

        <View style={styles.notificationCard}>
          {settingsLoading ? (
            <ActivityIndicator
              color="#39FF88"
              size="large"
              style={styles.loader}
            />
          ) : (
            <>
              <View style={styles.mainNotificationRow}>
                <View style={styles.notificationMainIcon}>
                  <Text style={styles.notificationEmoji}>🔔</Text>
                </View>

                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationTitle}>
                    All Notifications
                  </Text>
                  <Text style={styles.notificationSubtitle}>
                    Turn all notifications on or off
                  </Text>
                </View>

                <Switch
                  value={notificationSettings.notifications_enabled}
                  onValueChange={(value) =>
                    updateNotificationSetting(
                      'notifications_enabled',
                      value
                    )
                  }
                  trackColor={{
                    false: '#3A423D',
                    true: '#237A49',
                  }}
                  thumbColor={
                    notificationSettings.notifications_enabled
                      ? '#39FF88'
                      : '#B8C0BB'
                  }
                  disabled={savingSetting}
                />
              </View>

              <View style={styles.notificationDivider} />

              {renderNotificationSwitch(
                'workout_reminders',
                'Workout Reminders',
                'Workout and exercise updates',
                '💪'
              )}

              <View style={styles.notificationDivider} />

              {renderNotificationSwitch(
                'nutrition_reminders',
                'Nutrition Reminders',
                'Diet, meals and water reminders',
                '🥗'
              )}

              <View style={styles.notificationDivider} />

              {renderNotificationSwitch(
                'progress_updates',
                'Progress Updates',
                'Fitness progress and achievements',
                '📈'
              )}

              {savingSetting && (
                <Text style={styles.savingText}>
                  Saving settings...
                </Text>
              )}
            </>
          )}
        </View>

        {/* View Notifications */}
        <TouchableOpacity
          style={styles.viewNotificationsButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Text style={styles.viewNotificationsText}>
            🔔  View My Notifications
          </Text>
          <Text style={styles.viewNotificationsArrow}>›</Text>
        </TouchableOpacity>

        {/* Edit Profile */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('ProfileSetup', {
              profileData: profileData,
            })
          }
        >
          <Text style={styles.editIcon}>✏️</Text>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Dashboard */}
        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={() =>
            navigation.navigate('Dashboard', {
              profileData: profileData,
            })
          }
        >
          <Text style={styles.dashboardIcon}>🏠</Text>
          <Text style={styles.dashboardButtonText}>
            Back to Dashboard
          </Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
  },

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

  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },

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

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 5,
  },

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

  notificationCard: {
    backgroundColor: '#171D1A',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#26302B',
  },

  loader: {
    paddingVertical: 20,
  },

  mainNotificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },

  notificationMainIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#203D2C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  notificationSmallIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#202923',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  notificationEmoji: {
    fontSize: 19,
  },

  notificationTextContainer: {
    flex: 1,
    marginRight: 8,
  },

  notificationTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },

  notificationSubtitle: {
    color: '#89928D',
    fontSize: 10,
    lineHeight: 15,
  },

  notificationDivider: {
    height: 1,
    backgroundColor: '#26302B',
    marginVertical: 12,
  },

  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  savingText: {
    color: '#39FF88',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
  },

  viewNotificationsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#171D1A',
    borderWidth: 1,
    borderColor: '#39FF88',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
  },

  viewNotificationsText: {
    color: '#39FF88',
    fontSize: 14,
    fontWeight: 'bold',
  },

  viewNotificationsArrow: {
    color: '#39FF88',
    fontSize: 25,
  },

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

  dashboardButton: {
    height: 53,
    borderRadius: 27,
    backgroundColor: '#171D1A',
    borderWidth: 1,
    borderColor: '#39FF88',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
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

  logoutButton: {
    height: 53,
    borderRadius: 27,
    backgroundColor: '#2A1515',
    borderWidth: 1,
    borderColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },

  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  logoutButtonText: {
    color: '#FF4444',
    fontSize: 15,
    fontWeight: 'bold',
  },

  bottomSpace: {
    height: 20,
  },
});
