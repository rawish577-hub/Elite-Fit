import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import LoginScreen from './app/Screens/LoginScreen';
import SignupScreen from './app/Screens/SignupScreen';
import ProfileSetupScreen from './app/Screens/ProfileSetupScreen';
import DashboardScreen from './app/Screens/DashboardScreen';
import WorkoutScreen from './app/Screens/WorkoutScreen';
import ExerciseScreen from './app/Screens/ExerciseScreen';
import WorkoutCompleteScreen from './app/Screens/WorkoutCompleteScreen';
import AITrainerScreen from './app/Screens/AITrainerScreen';
import NutritionScreen from './app/Screens/NutritionScreen';
import PostureDetectionScreen from './app/Screens/PostureDetectionScreen';
import ProfileScreen from './app/Screens/ProfileScreen';
import ProgressScreen from './app/Screens/ProgressScreen';
import HealthMonitoringScreen from './app/Screens/HealthMonitoringScreen';
import NotificationsScreen from './app/Screens/NotificationsScreen';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './app/redux/store';

const Stack = createNativeStackNavigator();

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.logo}>ELITE-FIT</Text>
        <Text style={styles.title}>
          Your Fitness Journey{'\n'}Starts Here
        </Text>
        <Text style={styles.subtitle}>
          AI-powered workouts, nutrition and fitness guidance
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButton}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const HomeNavigator = () => {
  const { user } = useSelector((state) => state.home);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Dashboard'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Workouts" component={WorkoutScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
        <Stack.Screen name="WorkoutComplete" component={WorkoutCompleteScreen} />
        <Stack.Screen name="AITrainer" component={AITrainerScreen} />
        <Stack.Screen name="Nutrition" component={NutritionScreen} />
        <Stack.Screen name="PostureDetection" component={PostureDetectionScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="HealthMonitoring" component={HealthMonitoringScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const StackNavigation = () => {
  const { user } = useSelector((state) => state.home);
  
  return user ? <HomeNavigator /> : <AuthNavigation />;
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigation />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#095859',
    letterSpacing: 3,
    marginBottom: 35,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 16,
    color: '#B8C0BC',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#095859',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#07100B',
    fontSize: 17,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',                                                                                  
  },
  loginText: {
    color: '#A9B0AC',
    fontSize: 14,
  },
  loginButton: {
    color: '#095859',
    fontSize: 14,
    fontWeight: 'bold',
  },
});