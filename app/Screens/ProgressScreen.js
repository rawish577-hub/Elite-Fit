
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { supabase } from '../supabase';

const GREEN = '#39FF88';
const BG = '#0B0F0E';
const CARD = '#171D1A';
const MUTED = '#9AA6A0';

const FILTERS = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'All Time', value: 'all' },
];

function getStartDate(filter) {
  if (filter === 'all') return null;

  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - (filter === 'week' ? 6 : 29));

  return date;
}

function getRecordDate(item) {
  return (
    item.completed_at ||
    item.workout_date ||
    item.created_at ||
    null
  );
}

function getLastSevenDays(records) {
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const total = records
      .filter((item) => {
        const value = getRecordDate(item);
        if (!value) return false;

        const completed = new Date(value);
        return (
          !Number.isNaN(completed.getTime()) &&
          completed >= date &&
          completed < nextDay
        );
      })
      .reduce(
        (sum, item) => sum + Number(item.duration_minutes || 0),
        0
      );

    days.push({
      label: date.toLocaleDateString('en-US', {
        weekday: 'short',
      }),
      minutes: total,
    });
  }

  return days;
}

function getDateKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export default function ProgressScreen({ navigation }) {
  const [filter, setFilter] = useState('week');
  const [profile, setProfile] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadProgress = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setErrorMessage('');

    try {
      // Get the currently logged-in user.
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        setProfile(null);
        setRecords([]);
        setErrorMessage('Please log in to view your progress.');
        return;
      }

      // Load profile without assuming optional columns exist.
      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      setProfile(profileData || null);

      // Read progress records using the actual table columns.
      // Fetch all records first because dates can be stored in
      // completed_at, workout_date, or created_at.
      const {
        data: progressData,
        error: progressError,
      } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (progressError) throw progressError;

      const normalizedRecords = (progressData || []).map((item) => ({
        ...item,
        workout_title:
          item.workout_title || 'Completed Workout',
        duration_minutes: Number(item.duration_minutes || 0),
        calories_burned: Number(item.calories_burned || 0),
        reps_completed: Number(item.reps_completed || 0),
        posture_accuracy:
          item.posture_accuracy === null ||
          item.posture_accuracy === undefined
            ? null
            : Number(item.posture_accuracy),
        weight_kg:
          item.weight_kg === null ||
          item.weight_kg === undefined
            ? null
            : Number(item.weight_kg),
        completed_at: getRecordDate(item),
      }));

      // Apply Week / Month / All Time locally.
      const startDate = getStartDate(filter);

      const filteredRecords = normalizedRecords.filter((item) => {
        if (!startDate) return true;

        if (!item.completed_at) return false;

        const completed = new Date(item.completed_at);

        return (
          !Number.isNaN(completed.getTime()) &&
          completed >= startDate
        );
      });

      setRecords(filteredRecords);
    } catch (error) {
      console.error('Progress loading error:', error);
      setErrorMessage(
        error.message || 'Could not load your progress.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filter]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Workout statistics.
  // This assumes each progress row represents one completed workout.
  const totalWorkouts = records.length;

  const totalMinutes = records.reduce(
    (sum, item) => sum + item.duration_minutes,
    0
  );

  const totalCalories = records.reduce(
    (sum, item) => sum + item.calories_burned,
    0
  );

  const totalReps = records.reduce(
    (sum, item) => sum + item.reps_completed,
    0
  );

  // Average saved AI posture accuracy.
  const scoredRecords = records.filter(
    (item) =>
      item.posture_accuracy !== null &&
      Number.isFinite(item.posture_accuracy)
  );

  const averageAccuracy = scoredRecords.length
    ? Math.round(
        scoredRecords.reduce(
          (sum, item) => sum + item.posture_accuracy,
          0
        ) / scoredRecords.length
      )
    : null;

  // Current and target weight.
  const latestWeightRecord = records.find(
    (item) =>
      item.weight_kg !== null &&
      Number.isFinite(item.weight_kg)
  );

  const currentWeight =
    latestWeightRecord?.weight_kg ??
    profile?.weight_kg ??
    profile?.weight ??
    null;

  const targetWeight =
    profile?.target_weight ??
    profile?.goal_weight ??
    null;

  // Estimated weight-goal progress.
  const weightProgress =
    currentWeight !== null &&
    targetWeight !== null &&
    Number(currentWeight) > 0 &&
    Number(targetWeight) > 0
      ? Math.max(
          0,
          Math.min(
            100,
            Math.round(
              (1 -
                Math.abs(
                  Number(currentWeight) - Number(targetWeight)
                ) / Number(currentWeight)) *
                100
            )
          )
        )
      : null;

  // Last seven days' activity.
  const chartDays = getLastSevenDays(records);

  const maxMinutes = Math.max(
    30,
    ...chartDays.map((day) => day.minutes)
  );

  // Weekly goal.
  const weeklyTarget = 3;

  const weeklyCompleted = records.filter((item) => {
    if (!item.completed_at) return false;

    const completedAt = new Date(item.completed_at);
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    return (
      !Number.isNaN(completedAt.getTime()) &&
      completedAt >= sevenDaysAgo
    );
  }).length;

  // Consecutive workout-day streak.
  const streak = (() => {
    const dates = new Set(
      records
        .filter((item) => item.completed_at)
        .map((item) => {
          const date = new Date(item.completed_at);

          return Number.isNaN(date.getTime())
            ? null
            : getDateKey(date);
        })
        .filter(Boolean)
    );

    let count = 0;
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    // If no workout today, check whether yesterday continues the streak.
    if (!dates.has(getDateKey(date))) {
      date.setDate(date.getDate() - 1);
    }

    while (dates.has(getDateKey(date))) {
      count++;
      date.setDate(date.getDate() - 1);
    }

    return count;
  })();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={GREEN} />
        <Text style={styles.mutedText}>
          Loading your progress...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => loadProgress(true)}
          tintColor={GREEN}
          colors={[GREEN]}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.eyebrow}>ELITE-FIT</Text>
          <Text style={styles.title}>My Progress</Text>
          <Text style={styles.subtitle}>
            Every workout takes you forward.
          </Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (navigation?.canGoBack?.()) {
                navigation.goBack();
              } else {
                navigation?.navigate('Dashboard');
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.backText}>← Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => loadProgress(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.refreshText}>↻</Text>
          </TouchableOpacity>
        </View>
      </View>

      {errorMessage ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>
            Unable to load progress
          </Text>

          <Text style={styles.mutedText}>{errorMessage}</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => loadProgress()}
          >
            <Text style={styles.primaryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Time filters */}
          <View style={styles.filterRow}>
            {FILTERS.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => setFilter(item.value)}
                style={[
                  styles.filterButton,
                  filter === item.value && styles.activeFilter,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === item.value && styles.activeFilterText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Fitness goal */}
          <View style={styles.goalCard}>
            <Text style={styles.sectionLabel}>
              YOUR FITNESS GOAL
            </Text>

            <Text style={styles.goalTitle}>
              {profile?.goal || 'Set your fitness goal'}
            </Text>

            <View style={styles.weightRow}>
              <View style={styles.weightItem}>
                <Text style={styles.smallLabel}>
                  Current Weight
                </Text>
                <Text style={styles.weightValue}>
                  {currentWeight !== null
                    ? `${currentWeight} kg`
                    : '-- kg'}
                </Text>
              </View>

              <View style={styles.weightDivider} />

              <View style={styles.weightItem}>
                <Text style={styles.smallLabel}>
                  Target Weight
                </Text>
                <Text style={styles.weightValue}>
                  {targetWeight !== null
                    ? `${targetWeight} kg`
                    : '-- kg'}
                </Text>
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${weightProgress ?? 0}%` },
                ]}
              />
            </View>

            <Text style={styles.progressCaption}>
              {weightProgress !== null
                ? `${weightProgress}% estimated goal progress`
                : 'Add your target weight to track this goal.'}
            </Text>
          </View>

          {/* Statistics */}
          <Text style={styles.sectionTitle}>
            Workout Statistics
          </Text>

          <View style={styles.statsGrid}>
            <StatCard
              icon="🏋️"
              value={String(totalWorkouts)}
              label="Workouts"
            />
            <StatCard
              icon="⏱️"
              value={String(totalMinutes)}
              label="Minutes"
            />
            <StatCard
              icon="🔥"
              value={String(totalCalories)}
              label="Est. Calories"
            />
            <StatCard
              icon="💪"
              value={String(totalReps)}
              label="Reps Completed"
            />
          </View>

          {/* Weekly activity chart */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Weekly Activity
            </Text>

            <Text style={styles.mutedText}>
              Workout minutes for the last 7 days
            </Text>

            <View style={styles.chart}>
              {chartDays.map((day, index) => (
                <View
                  key={`${day.label}-${index}`}
                  style={styles.barColumn}
                >
                  <Text style={styles.barValue}>
                    {day.minutes || ''}
                  </Text>

                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${
                            day.minutes > 0
                              ? Math.max(
                                  8,
                                  (day.minutes / maxMinutes) * 100
                                )
                              : 3
                          }%`,
                          opacity: day.minutes > 0 ? 1 : 0.25,
                        },
                      ]}
                    />
                  </View>

                  <Text style={styles.dayLabel}>
                    {day.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* AI exercise performance */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              AI Exercise Performance
            </Text>

            <View style={styles.aiRow}>
              <View style={styles.aiIcon}>
                <Text style={styles.aiEmoji}>🎯</Text>
              </View>

              <View style={styles.aiTextWrap}>
                <Text style={styles.itemTitle}>
                  Average Posture Accuracy
                </Text>
                <Text style={styles.mutedText}>
                  Based on saved AI posture results
                </Text>
              </View>

              <Text style={styles.aiValue}>
                {averageAccuracy !== null
                  ? `${averageAccuracy}%`
                  : '--'}
              </Text>
            </View>

            {averageAccuracy !== null && (
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.max(
                        0,
                        Math.min(100, averageAccuracy)
                      )}%`,
                    },
                  ]}
                />
              </View>
            )}

            <Text style={styles.helperText}>
              {averageAccuracy !== null
                ? 'Your saved posture scores are shown here.'
                : 'Complete an AI posture session and save its score to see results.'}
            </Text>
          </View>

          {/* Achievements */}
          <Text style={styles.sectionTitle}>Achievements</Text>

          <View style={styles.achievementRow}>
            <AchievementCard
              icon="🏆"
              title="Weekly Goal"
              value={`${Math.min(
                weeklyCompleted,
                weeklyTarget
              )}/${weeklyTarget}`}
              subtitle="Workouts this week"
              achieved={weeklyCompleted >= weeklyTarget}
            />

            <AchievementCard
              icon="🔥"
              title="Workout Streak"
              value={`${streak} ${streak === 1 ? 'day' : 'days'}`}
              subtitle="Consecutive days"
              achieved={streak >= 3}
            />
          </View>

          {/* Recent activity */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          {records.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>📊</Text>

              <Text style={styles.itemTitle}>
                No workout records yet
              </Text>

              <Text style={styles.mutedText}>
                Complete a workout and save its result to see your
                progress here.
              </Text>
            </View>
          ) : (
            records.slice(0, 10).map((item, index) => (
              <View
                key={item.id ?? `${item.completed_at}-${index}`}
                style={styles.activityCard}
              >
                <View style={styles.activityIcon}>
                  <Text style={styles.aiEmoji}>💪</Text>
                </View>

                <View style={styles.activityText}>
                  <Text style={styles.itemTitle}>
                    {item.workout_title}
                  </Text>

                  <Text style={styles.mutedText}>
                    {item.completed_at
                      ? new Date(
                          item.completed_at
                        ).toLocaleDateString()
                      : 'Date unavailable'}
                  </Text>
                </View>

                <View style={styles.activityRight}>
                  <Text style={styles.activityMinutes}>
                    {item.duration_minutes} min
                  </Text>

                  <Text style={styles.mutedText}>
                    {item.calories_burned} kcal*
                  </Text>
                </View>
              </View>
            ))
          )}

          <Text style={styles.disclaimer}>
            *Calories are estimates. Results depend on the data saved
            after each workout.
          </Text>
        </>
      )}
    </ScrollView>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function AchievementCard({
  icon,
  title,
  value,
  subtitle,
  achieved,
}) {
  return (
    <View style={styles.achievementCard}>
      <Text style={styles.achievementIcon}>{icon}</Text>
      <Text style={styles.achievementTitle}>{title}</Text>
      <Text style={styles.achievementValue}>{value}</Text>
      <Text style={styles.mutedText}>{subtitle}</Text>

      <Text
        style={[
          styles.achievementStatus,
          achieved && styles.achievementDone,
        ]}
      >
        {achieved ? 'Achieved!' : 'In progress'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  center: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  headerTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  headerActions: {
    alignItems: 'flex-end',
    gap: 10,
  },
  backButton: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: GREEN,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  backText: {
    color: GREEN,
    fontSize: 12,
    fontWeight: '700',
  },
  eyebrow: {
    color: GREEN,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: MUTED,
    fontSize: 13,
    marginTop: 6,
  },
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshText: {
    color: GREEN,
    fontSize: 28,
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: CARD,
    padding: 5,
    borderRadius: 14,
    marginBottom: 18,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: GREEN,
  },
  filterText: {
    color: MUTED,
    fontWeight: '600',
    fontSize: 13,
  },
  activeFilterText: {
    color: '#07110A',
    fontWeight: '800',
  },
  goalCard: {
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#28342C',
  },
  sectionLabel: {
    color: GREEN,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.3,
  },
  goalTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  weightItem: {
    flex: 1,
  },
  weightDivider: {
    width: 1,
    height: 38,
    backgroundColor: '#354039',
    marginHorizontal: 18,
  },
  smallLabel: {
    color: MUTED,
    fontSize: 12,
    marginBottom: 5,
  },
  weightValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#303A33',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: GREEN,
    borderRadius: 10,
  },
  progressCaption: {
    color: MUTED,
    fontSize: 12,
    marginTop: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    minHeight: 132,
    backgroundColor: CARD,
    borderRadius: 17,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222C25',
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 10,
  },
  statValue: {
    color: GREEN,
    fontSize: 25,
    fontWeight: '800',
  },
  statLabel: {
    color: MUTED,
    fontSize: 12,
    marginTop: 5,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 17,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#222C25',
  },
  mutedText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
  },
  chart: {
    height: 165,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 22,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    marginHorizontal: 3,
  },
  barValue: {
    color: '#FFFFFF',
    fontSize: 10,
    height: 17,
  },
  barTrack: {
    height: 112,
    width: '65%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#202923',
    borderRadius: 7,
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    backgroundColor: GREEN,
    borderRadius: 7,
  },
  dayLabel: {
    color: MUTED,
    fontSize: 10,
    marginTop: 9,
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  aiIcon: {
    width: 42,
    height: 42,
    backgroundColor: '#26372B',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aiEmoji: {
    fontSize: 20,
  },
  aiTextWrap: {
    flex: 1,
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  aiValue: {
    color: GREEN,
    fontSize: 22,
    fontWeight: '800',
  },
  helperText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: CARD,
    padding: 14,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#28342C',
  },
  achievementIcon: {
    fontSize: 25,
    marginBottom: 10,
  },
  achievementTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  achievementValue: {
    color: GREEN,
    fontSize: 22,
    fontWeight: '800',
    marginVertical: 8,
  },
  achievementStatus: {
    color: '#F3C969',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 10,
  },
  achievementDone: {
    color: GREEN,
  },
  emptyCard: {
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
  },
  emptyIcon: {
    fontSize: 35,
    marginBottom: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    padding: 13,
    borderRadius: 15,
    marginBottom: 10,
  },
  activityIcon: {
    width: 42,
    height: 42,
    backgroundColor: '#26372B',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityText: {
    flex: 1,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityMinutes: {
    color: GREEN,
    fontWeight: '800',
    marginBottom: 4,
  },
  disclaimer: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 8,
  },
  errorCard: {
    backgroundColor: CARD,
    padding: 18,
    borderRadius: 16,
  },
  errorTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 17,
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: GREEN,
    alignSelf: 'flex-start',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginTop: 14,
  },
  primaryButtonText: {
    color: '#07110A',
    fontWeight: '800',
  },
});
