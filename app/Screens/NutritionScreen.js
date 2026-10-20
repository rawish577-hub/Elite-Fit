import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { supabase } from '../supabase';

const GREEN = '#39FF88';
const BG = '#0B0F0E';
const CARD = '#171D1A';

const GOALS = [
  { label: 'Weight Loss', value: 'lose', icon: '🔥' },
  { label: 'Weight Gain', value: 'gain', icon: '💪' },
  { label: 'Maintain Weight', value: 'maintain', icon: '⚖️' },
];

const MEAL_PLANS = {
  lose: [
    {
      name: 'Breakfast',
      time: '8:00 AM',
      foods: '1 boiled egg, 1 small whole-wheat roti, cucumber and tomato, unsweetened tea.',
      icon: '🍳',
      share: 0.25,
    },
    {
      name: 'Mid-Morning Snack',
      time: '11:00 AM',
      foods: '1 small apple or guava with plain yogurt.',
      icon: '🍎',
      share: 0.10,
    },
    {
      name: 'Lunch',
      time: '1:30 PM',
      foods: 'Grilled chicken or daal, a moderate portion of roti or rice, a large salad, and plain yogurt.',
      icon: '🥗',
      share: 0.30,
    },
    {
      name: 'Evening Snack',
      time: '4:30 PM',
      foods: '1 seasonal fruit or roasted chana, with water or unsweetened tea.',
      icon: '🍐',
      share: 0.10,
    },
    {
      name: 'Dinner',
      time: '7:30 PM',
      foods: 'Daal, grilled fish or chicken, cooked vegetables, and a moderate portion of roti.',
      icon: '🍲',
      share: 0.25,
    },
  ],

  gain: [
    {
      name: 'Breakfast',
      time: '8:00 AM',
      foods: '2 eggs, 2 whole-wheat rotis, 1 banana, and 1 glass of milk.',
      icon: '🍳',
      share: 0.25,
    },
    {
      name: 'Mid-Morning Snack',
      time: '11:00 AM',
      foods: 'Banana smoothie with milk, oats, and peanut butter if tolerated.',
      icon: '🥤',
      share: 0.15,
    },
    {
      name: 'Lunch',
      time: '1:30 PM',
      foods: 'Chicken, fish or daal, a generous serving of rice or 2 rotis, yogurt, and vegetables.',
      icon: '🍛',
      share: 0.30,
    },
    {
      name: 'Evening Snack',
      time: '4:30 PM',
      foods: 'A handful of nuts, dates, and a glass of milk or yogurt.',
      icon: '🥜',
      share: 0.10,
    },
    {
      name: 'Dinner',
      time: '7:30 PM',
      foods: 'Chicken, beans or paneer, rice or rotis, cooked vegetables, and yogurt.',
      icon: '🍲',
      share: 0.20,
    },
  ],

  maintain: [
    {
      name: 'Breakfast',
      time: '8:00 AM',
      foods: '1–2 eggs, 1–2 whole-wheat rotis, and a serving of milk or plain yogurt.',
      icon: '🍳',
      share: 0.25,
    },
    {
      name: 'Mid-Morning Snack',
      time: '11:00 AM',
      foods: '1 seasonal fruit and a small handful of nuts.',
      icon: '🍎',
      share: 0.10,
    },
    {
      name: 'Lunch',
      time: '1:30 PM',
      foods: 'Chicken, fish or daal, a balanced serving of rice or roti, vegetables, and salad.',
      icon: '🥗',
      share: 0.30,
    },
    {
      name: 'Evening Snack',
      time: '4:30 PM',
      foods: 'Plain yogurt, roasted chana, or fruit according to hunger.',
      icon: '🥣',
      share: 0.10,
    },
    {
      name: 'Dinner',
      time: '7:30 PM',
      foods: 'Daal, chicken or beans, vegetables, and a balanced serving of roti or rice.',
      icon: '🍲',
      share: 0.25,
    },
  ],
};

function normalizeGoal(goal) {
  const value = String(goal || '').toLowerCase();

  if (
    value.includes('gain') ||
    value.includes('increase') ||
    value.includes('muscle')
  ) {
    return 'gain';
  }

  if (
    value.includes('loss') ||
    value.includes('lose') ||
    value.includes('reduce')
  ) {
    return 'lose';
  }

  return 'maintain';
}

function calculateNutrition(profile, goal) {
  const weight = Number(profile.weight);
  const height = Number(profile.height);
  const age = Number(profile.age);

  if (
    !Number.isFinite(weight) ||
    !Number.isFinite(height) ||
    !Number.isFinite(age) ||
    weight <= 0 ||
    height <= 0 ||
    age <= 0
  ) {
    return null;
  }

  const gender = String(profile.gender || '').toLowerCase();

  const adjustment =
    gender === 'male' || gender === 'man'
      ? 5
      : gender === 'female' || gender === 'woman'
      ? -161
      : -78;

  const bmr =
    10 * weight + 6.25 * height - 5 * age + adjustment;

  const maintenance = Math.round(bmr * 1.35);

  let calories = maintenance;

  if (goal === 'lose') calories -= 250;
  if (goal === 'gain') calories += 250;

  const minimum =
    gender === 'male' || gender === 'man' ? 1500 : 1200;

  calories = Math.max(minimum, Math.round(calories));

  const protein = Math.round(weight * 1.4);
  const fats = Math.round(weight * 0.8);

  const carbs = Math.max(
    0,
    Math.round((calories - protein * 4 - fats * 9) / 4)
  );

  return {
    daily_calories: calories,
    protein_grams: protein,
    carbs_grams: carbs,
    fats_grams: fats,
  };
}

export default function NutritionScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [waterSaving, setWaterSaving] = useState(false);

  const [profile, setProfile] = useState(null);
  const [goal, setGoal] = useState('maintain');
  const [nutrition, setNutrition] = useState(null);
  const [planId, setPlanId] = useState(null);

  const [waterGoal, setWaterGoal] = useState(8);
  const [waterCompleted, setWaterCompleted] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    loadNutrition();
  }, []);

  async function loadNutrition() {
    setLoading(true);
    setError('');

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        setError('Please log in to view your nutrition plan.');
        return;
      }

      const { data: userProfile, error: profileError } =
        await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

      if (profileError) throw profileError;

      if (!userProfile) {
        setError('Please complete your profile first.');
        return;
      }

      setProfile(userProfile);

      const selectedGoal = normalizeGoal(userProfile.goal);

      const calculated = calculateNutrition(
        userProfile,
        selectedGoal
      );

      if (!calculated) {
        setError(
          'Please add your age, gender, weight and height to your profile. Height must be in centimetres.'
        );
        return;
      }

      setGoal(selectedGoal);
      setNutrition(calculated);

      const { data: savedPlans, error: plansError } =
        await supabase
          .from('nutrition_plans')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

      if (plansError) throw plansError;

      const savedPlan = savedPlans?.[0];

      if (savedPlan) {
        setPlanId(savedPlan.id);

        const savedWaterGoal =
          Number(savedPlan.water_goal) || 8;

        const savedWater = Math.max(
          0,
          Math.min(
            savedWaterGoal,
            Number(savedPlan.water_completed) || 0
          )
        );

        setWaterGoal(savedWaterGoal);
        setWaterCompleted(savedWater);

        const { error: syncError } = await supabase
          .from('nutrition_plans')
          .update({
            ...calculated,
            meals: MEAL_PLANS[selectedGoal],
            water_goal: savedWaterGoal,
          })
          .eq('id', savedPlan.id)
          .eq('user_id', user.id);

        if (syncError) throw syncError;
      } else {
        const { data: newPlan, error: insertError } =
          await supabase
            .from('nutrition_plans')
            .insert({
              user_id: user.id,
              ...calculated,
              meals: MEAL_PLANS[selectedGoal],
              water_goal: 8,
              water_completed: 0,
            })
            .select()
            .single();

        if (insertError) throw insertError;

        setPlanId(newPlan.id);
        setWaterGoal(8);
        setWaterCompleted(0);
      }
    } catch (err) {
      console.error('Nutrition load error:', err);
      setError(
        err.message || 'Could not load your nutrition plan.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function changeGoal(newGoal) {
    if (!profile || saving || newGoal === goal) return;

    const calculated = calculateNutrition(profile, newGoal);

    if (!calculated) {
      Alert.alert(
        'Profile incomplete',
        'Please update your age, gender, weight and height.'
      );
      return;
    }

    setSaving(true);
    setError('');

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) throw new Error('Please log in again.');

      const goalLabel = {
        lose: 'Weight Loss',
        gain: 'Weight Gain',
        maintain: 'Maintain Weight',
      }[newGoal];

      const { error: profileUpdateError } = await supabase
        .from('profiles')
        .update({ goal: goalLabel })
        .eq('id', user.id);

      if (profileUpdateError) throw profileUpdateError;

      const planData = {
        ...calculated,
        meals: MEAL_PLANS[newGoal],
        water_goal: waterGoal,
        water_completed: waterCompleted,
      };

      if (planId) {
        const { error: updateError } = await supabase
          .from('nutrition_plans')
          .update(planData)
          .eq('id', planId)
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      } else {
        const { data: newPlan, error: insertError } =
          await supabase
            .from('nutrition_plans')
            .insert({
              user_id: user.id,
              ...planData,
            })
            .select()
            .single();

        if (insertError) throw insertError;

        setPlanId(newPlan.id);
      }

      setGoal(newGoal);
      setNutrition(calculated);
      setProfile({ ...profile, goal: goalLabel });

      Alert.alert(
        'Plan Updated',
        'Your new diet plan has been saved.'
      );
    } catch (err) {
      console.error('Nutrition update error:', err);
      setError(err.message || 'Could not save your new plan.');
    } finally {
      setSaving(false);
    }
  }

  async function updateWater(amount) {
    if (waterSaving || saving || loading) return;

    if (!planId) {
      Alert.alert(
        'Plan Not Ready',
        'Your nutrition plan is not ready yet. Please try again.'
      );
      return;
    }

    const previous = waterCompleted;

    const nextValue = Math.max(
      0,
      Math.min(waterGoal, previous + amount)
    );

    if (nextValue === previous) return;

    setWaterCompleted(nextValue);
    setWaterSaving(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) throw new Error('Please log in again.');

      const { data, error: waterError } = await supabase
        .from('nutrition_plans')
        .update({ water_completed: nextValue })
        .eq('id', planId)
        .eq('user_id', user.id)
        .select('id, water_completed')
        .maybeSingle();

      if (waterError) throw waterError;

      if (!data) {
        throw new Error(
          'No row was updated. Check your plan ID and Supabase RLS policies.'
        );
      }

      setWaterCompleted(
        Math.max(
          0,
          Math.min(
            waterGoal,
            Number(data.water_completed) || 0
          )
        )
      );
    } catch (err) {
      console.error('Water tracking error:', err);

      setWaterCompleted(previous);

      Alert.alert(
        'Water Tracker Error',
        err.message ||
          'Could not save your water intake. Please try again.'
      );
    } finally {
      setWaterSaving(false);
    }
  }

  // Dashboard navigation
  function goToDashboard() {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else if (navigation?.navigate) {
      navigation.navigate('Dashboard');
    } else {
      Alert.alert(
        'Navigation Error',
        'Dashboard route is not available.'
      );
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={GREEN} />
        <Text style={styles.muted}>
          Preparing your nutrition plan...
        </Text>
      </View>
    );
  }

  if (error || !nutrition || !profile) {
    return (
      <View style={styles.center}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={goToDashboard}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>← Dashboard</Text>
        </TouchableOpacity>

        <Text style={styles.error}>
          {error || 'Nutrition data unavailable.'}
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={loadNutrition}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const meals = MEAL_PLANS[goal];

  const goalTitle = {
    lose: 'Weight Loss Plan',
    gain: 'Weight Gain Plan',
    maintain: 'Weight Maintenance Plan',
  }[goal];

  const waterProgress = Math.min(
    100,
    Math.max(0, (waterCompleted / waterGoal) * 100)
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header with Dashboard button */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.eyebrow}>ELITE-FIT</Text>
          <Text style={styles.heading}>Nutrition</Text>
          <Text style={styles.subtitle}>
            Your personalized food and nutrition guide
          </Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={goToDashboard}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>← Dashboard</Text>
        </TouchableOpacity>
      </View>

      {/* Nutrition summary */}
      <View style={styles.hero}>
        <Text style={styles.heroIcon}>🥗</Text>
        <Text style={styles.heroTitle}>{goalTitle}</Text>

        <Text style={styles.heroText}>
          Hello, {profile.name || 'Fitness Member'}!
        </Text>

        <Text style={styles.calories}>
          {nutrition.daily_calories.toLocaleString()}
        </Text>

        <Text style={styles.heroText}>
          estimated calories per day
        </Text>
      </View>

      {/* Goal selection */}
      <Text style={styles.sectionTitle}>Choose Your Goal</Text>

      <View style={styles.goalRow}>
        {GOALS.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.goalButton,
              goal === item.value && styles.goalSelected,
            ]}
            onPress={() => changeGoal(item.value)}
            disabled={saving || waterSaving}
            activeOpacity={0.7}
          >
            <Text style={styles.goalIcon}>{item.icon}</Text>

            <Text
              style={[
                styles.goalText,
                goal === item.value && styles.goalTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {saving && (
        <ActivityIndicator
          color={GREEN}
          style={styles.loader}
        />
      )}

      {/* Nutrition targets */}
      <Text style={styles.sectionTitle}>
        Daily Nutrition Targets
      </Text>

      <View style={styles.macroRow}>
        <View style={styles.macroCard}>
          <Text style={styles.macroIcon}>🥚</Text>
          <Text style={styles.macroValue}>
            {nutrition.protein_grams} g
          </Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>

        <View style={styles.macroCard}>
          <Text style={styles.macroIcon}>🍚</Text>
          <Text style={styles.macroValue}>
            {nutrition.carbs_grams} g
          </Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>

        <View style={styles.macroCard}>
          <Text style={styles.macroIcon}>🥑</Text>
          <Text style={styles.macroValue}>
            {nutrition.fats_grams} g
          </Text>
          <Text style={styles.macroLabel}>Fats</Text>
        </View>
      </View>

      {/* Daily meal plan */}
      <Text style={styles.sectionTitle}>
        Your Daily Meal Plan
      </Text>

      {meals.map((meal) => (
        <View key={meal.name} style={styles.mealCard}>
          <View style={styles.mealHeader}>
            <Text style={styles.mealIcon}>{meal.icon}</Text>

            <View style={styles.mealHeading}>
              <Text style={styles.mealName}>
                {meal.name}
              </Text>
              <Text style={styles.mealTime}>
                {meal.time}
              </Text>
            </View>

            <Text style={styles.mealCalories}>
              ~{Math.round(
                nutrition.daily_calories * meal.share
              )} kcal
            </Text>
          </View>

          <Text style={styles.foodText}>
            {meal.foods}
          </Text>
        </View>
      ))}

      {/* Water tracker */}
      <Text style={styles.sectionTitle}>Water Tracker</Text>

      <View style={styles.waterCard}>
        <Text style={styles.waterIcon}>💧</Text>

        <Text style={styles.waterCount}>
          {waterCompleted} / {waterGoal} glasses
        </Text>

        <Text style={styles.waterSubtitle}>
          {waterGoal - waterCompleted} glasses remaining
        </Text>

        <View style={styles.glassRow}>
          {Array.from({ length: waterGoal }, (_, index) => (
            <View
              key={index}
              style={[
                styles.glass,
                index < waterCompleted && styles.glassFilled,
              ]}
            >
              <Text style={styles.glassText}>
                {index < waterCompleted ? '💧' : '○'}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${waterProgress}%` },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {Math.round(waterProgress)}% of daily goal
        </Text>

        <View style={styles.waterButtons}>
          <TouchableOpacity
            style={[
              styles.secondaryButton,
              (waterCompleted === 0 || waterSaving) &&
                styles.disabledButton,
            ]}
            onPress={() => updateWater(-1)}
            disabled={
              waterCompleted === 0 ||
              waterSaving ||
              saving
            }
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>
              − Remove
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              (waterCompleted >= waterGoal || waterSaving) &&
                styles.disabledButton,
            ]}
            onPress={() => updateWater(1)}
            disabled={
              waterCompleted >= waterGoal ||
              waterSaving ||
              saving
            }
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>
              {waterSaving ? 'Saving...' : '+ Add Glass'}
            </Text>
          </TouchableOpacity>
        </View>

        {waterSaving && (
          <ActivityIndicator
            size="small"
            color={GREEN}
            style={styles.waterLoader}
          />
        )}

        {waterCompleted >= waterGoal && (
          <Text style={styles.waterSuccess}>
            🎉 Daily water goal completed!
          </Text>
        )}
      </View>

      {/* Important note */}
      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Important</Text>

        <Text style={styles.noteText}>
          Calorie and macro values are estimates. Actual meal
          calories depend on food types, quantities and preparation.
          These are sample menus, not medical prescriptions. Users
          who are pregnant or have diabetes, kidney disease, allergies
          or other medical conditions should seek advice from a
          qualified healthcare professional.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  content: {
    padding: 18,
    paddingBottom: 35,
  },

  center: {
    flex: 1,
    backgroundColor: BG,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  headerTextContainer: {
    flex: 1,
    paddingRight: 8,
  },

  eyebrow: {
    color: GREEN,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
  },

  heading: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#A5ADA8',
    fontSize: 13,
    marginTop: 6,
    marginBottom: 8,
  },

  backButton: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: GREEN,
    paddingVertical: 10,
    paddingHorizontal: 11,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: GREEN,
    fontSize: 12,
    fontWeight: '700',
  },

  // Nutrition summary
  hero: {
    backgroundColor: '#17231C',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#294333',
  },

  heroIcon: {
    fontSize: 38,
  },

  heroTitle: {
    color: GREEN,
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 8,
  },

  heroText: {
    color: '#CBD5CE',
    marginTop: 7,
    textAlign: 'center',
  },

  calories: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 12,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
  },

  // Goals
  goalRow: {
    flexDirection: 'row',
    gap: 8,
  },

  goalButton: {
    flex: 1,
    minHeight: 90,
    backgroundColor: CARD,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#29332D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },

  goalSelected: {
    borderColor: GREEN,
    backgroundColor: '#1C3326',
  },

  goalIcon: {
    fontSize: 24,
    marginBottom: 7,
  },

  goalText: {
    color: '#C3CCC6',
    fontSize: 12,
    textAlign: 'center',
  },

  goalTextSelected: {
    color: GREEN,
    fontWeight: 'bold',
  },

  // Macros
  macroRow: {
    flexDirection: 'row',
    gap: 10,
  },

  macroCard: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },

  macroIcon: {
    fontSize: 24,
  },

  macroValue: {
    color: GREEN,
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 8,
  },

  macroLabel: {
    color: '#C3CCC6',
    marginTop: 5,
    fontSize: 12,
  },

  // Meals
  mealCard: {
    backgroundColor: CARD,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#29332D',
  },

  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mealIcon: {
    fontSize: 28,
    marginRight: 10,
  },

  mealHeading: {
    flex: 1,
  },

  mealName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  mealTime: {
    color: '#9DAAA1',
    fontSize: 12,
    marginTop: 4,
  },

  mealCalories: {
    color: GREEN,
    fontSize: 12,
    fontWeight: 'bold',
  },

  foodText: {
    color: '#D1D8D3',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 13,
  },

  // Water tracker
  waterCard: {
    backgroundColor: CARD,
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#29332D',
  },

  waterIcon: {
    fontSize: 38,
  },

  waterCount: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },

  waterSubtitle: {
    color: '#A5ADA8',
    fontSize: 13,
    marginTop: 6,
  },

  glassRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 18,
  },

  glass: {
    width: 30,
    height: 38,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#3B5145',
    backgroundColor: '#202923',
    justifyContent: 'center',
    alignItems: 'center',
  },

  glassFilled: {
    backgroundColor: '#173C2B',
    borderColor: GREEN,
  },

  glassText: {
    color: GREEN,
    fontSize: 15,
  },

  progressBackground: {
    width: '100%',
    height: 9,
    backgroundColor: '#29332D',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },

  progressFill: {
    height: '100%',
    backgroundColor: GREEN,
    borderRadius: 10,
  },

  progressText: {
    color: '#A5ADA8',
    fontSize: 12,
    marginTop: 8,
  },

  waterButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },

  primaryButton: {
    backgroundColor: GREEN,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },

  secondaryButton: {
    backgroundColor: '#29332D',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },

  disabledButton: {
    opacity: 0.45,
  },

  buttonText: {
    color: '#07110B',
    fontWeight: 'bold',
  },

  waterLoader: {
    marginTop: 12,
  },

  waterSuccess: {
    color: GREEN,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },

  // Important note
  noteCard: {
    backgroundColor: CARD,
    borderRadius: 12,
    padding: 15,
    marginTop: 22,
  },

  noteTitle: {
    color: GREEN,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 7,
  },

  noteText: {
    color: '#ADB7B0',
    fontSize: 12,
    lineHeight: 19,
  },

  muted: {
    color: '#FFFFFF',
    marginTop: 12,
  },

  error: {
    color: '#FF8D8D',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 20,
  },

  loader: {
    marginTop: 12,
  },
});