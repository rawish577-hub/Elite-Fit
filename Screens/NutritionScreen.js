import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

export default function NutritionScreen({ navigation }) {
  const meals = [
    {
      name: 'Breakfast',
      time: '8:00 AM',
      icon: '🍳',
      meal: 'Eggs, whole grain toast & banana',
      calories: '420 kcal',
      protein: '22g protein',
    },
    {
      name: 'Morning Snack',
      time: '11:00 AM',
      icon: '🍎',
      meal: 'Apple & mixed nuts',
      calories: '220 kcal',
      protein: '6g protein',
    },
    {
      name: 'Lunch',
      time: '1:30 PM',
      icon: '🍗',
      meal: 'Grilled chicken, rice & vegetables',
      calories: '550 kcal',
      protein: '38g protein',
    },
    {
      name: 'Evening Snack',
      time: '5:00 PM',
      icon: '🥛',
      meal: 'Greek yogurt & berries',
      calories: '180 kcal',
      protein: '12g protein',
    },
    {
      name: 'Dinner',
      time: '8:00 PM',
      icon: '🥗',
      meal: 'Chicken salad & sweet potato',
      calories: '480 kcal',
      protein: '32g protein',
    },
  ];

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

          <Text style={styles.headerTitle}>Nutrition</Text>

          <View style={styles.headerSpace} />
        </View>

        {/* Intro */}
        <Text style={styles.title}>Your Daily Nutrition</Text>

        <Text style={styles.subtitle}>
          Stay fueled with a balanced meal plan designed to support your fitness journey.
        </Text>

        {/* Calories Card */}
        <View style={styles.calorieCard}>
          <View>
            <Text style={styles.cardSmallTitle}>
              DAILY TARGET
            </Text>

            <Text style={styles.calorieNumber}>
              1,850
            </Text>

            <Text style={styles.calorieLabel}>
              calories
            </Text>
          </View>

          <View style={styles.macroContainer}>
            <View style={styles.macroItem}>
              <Text style={styles.macroNumber}>120g</Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>

            <View style={styles.macroItem}>
              <Text style={styles.macroNumber}>210g</Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>

            <View style={styles.macroItem}>
              <Text style={styles.macroNumber}>55g</Text>
              <Text style={styles.macroLabel}>Fats</Text>
            </View>
          </View>
        </View>

        {/* Meals */}
        <Text style={styles.sectionTitle}>
          Today's Meal Plan
        </Text>

        {meals.map((item, index) => (
          <View key={index} style={styles.mealCard}>
            <View style={styles.mealIconContainer}>
              <Text style={styles.mealIcon}>
                {item.icon}
              </Text>
            </View>

            <View style={styles.mealInfo}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealName}>
                  {item.name}
                </Text>

                <Text style={styles.mealTime}>
                  {item.time}
                </Text>
              </View>

              <Text style={styles.mealText}>
                {item.meal}
              </Text>

              <View style={styles.mealDetails}>
                <Text style={styles.detailText}>
                  {item.calories}
                </Text>

                <Text style={styles.detailText}>
                  {item.protein}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* Water */}
        <Text style={styles.sectionTitle}>
          Hydration
        </Text>

        <View style={styles.waterCard}>
          <View>
            <Text style={styles.waterTitle}>
              💧 Daily Water Goal
            </Text>

            <Text style={styles.waterText}>
              6 of 8 glasses completed
            </Text>
          </View>

          <Text style={styles.waterPercent}>
            75%
          </Text>
        </View>

        <View style={styles.waterProgressBackground}>
          <View style={styles.waterProgress} />
        </View>

        <TouchableOpacity style={styles.addWaterButton}>
          <Text style={styles.addWaterText}>
            + Add Glass of Water
          </Text>
        </TouchableOpacity>
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
          onPress={() => navigation.navigate('Workouts')}
        >
          <Text style={styles.navIcon}>🏋️</Text>
          <Text style={styles.navText}>Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('AITrainer')}
        >
          <Text style={styles.navIcon}>🤖</Text>
          <Text style={styles.navText}>AI Trainer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🥗</Text>
          <Text style={styles.activeNavText}>Nutrition</Text>
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
    paddingBottom: 100,
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
    marginBottom: 25,
  },

  calorieCard: {
    backgroundColor: '#17231D',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  cardSmallTitle: {
    color: '#39FF88',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  calorieNumber: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },

  calorieLabel: {
    color: '#89928D',
    fontSize: 12,
  },

  macroContainer: {
    justifyContent: 'center',
    gap: 10,
  },

  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  macroNumber: {
    color: '#39FF88',
    fontSize: 12,
    fontWeight: 'bold',
    width: 45,
  },

  macroLabel: {
    color: '#A9B0AC',
    fontSize: 11,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  mealCard: {
    flexDirection: 'row',
    backgroundColor: '#171D1A',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },

  mealIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#222B27',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  mealIcon: {
    fontSize: 26,
  },

  mealInfo: {
    flex: 1,
  },

  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  mealName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  mealTime: {
    color: '#39FF88',
    fontSize: 10,
  },

  mealText: {
    color: '#A9B0AC',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },

  mealDetails: {
    flexDirection: 'row',
    gap: 15,
  },

  detailText: {
    color: '#89928D',
    fontSize: 10,
  },

  waterCard: {
    backgroundColor: '#171D1A',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  waterTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  waterText: {
    color: '#89928D',
    fontSize: 12,
  },

  waterPercent: {
    color: '#39FF88',
    fontSize: 22,
    fontWeight: 'bold',
  },

  waterProgressBackground: {
    height: 7,
    backgroundColor: '#26302B',
    borderRadius: 4,
    marginTop: 12,
    marginBottom: 15,
  },

  waterProgress: {
    width: '75%',
    height: 7,
    borderRadius: 4,
    backgroundColor: '#39FF88',
  },

  addWaterButton: {
    height: 45,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#39FF88',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  addWaterText: {
    color: '#39FF88',
    fontSize: 13,
    fontWeight: 'bold',
  },

  bottomNav: {
    height: 72,
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
    fontSize: 10,
  },

  activeNavText: {
    color: '#39FF88',
    fontSize: 10,
    fontWeight: 'bold',
  },
});