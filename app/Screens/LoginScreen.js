import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { supabase } from '../supabase';

import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/HomeDataSlice.js';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('rawish577@gmail.com');
  const [password, setPassword] = useState('1@2@3@4@5@');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch(); // Redux dispatch function

  // =========================
  // SUPABASE LOGIN
  // =========================
  const handleLogin = async () => {
    // Check empty fields
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter your email and password.'
      );
      return;
    }

    try {
      setLoading(true);

      console.log('LOGIN STARTED');
      console.log('EMAIL:', email.trim());

      // Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      console.log('LOGIN DATA:', data);
      console.log('LOGIN ERROR:', error);

      // Supabase error
      if (error) {
        Alert.alert(
          'Login Failed',
          error.message || 'Invalid email or password.'
        );
        return;
      }

      // Successful login
      if (data?.user) {
        console.log('LOGIN SUCCESS');
        console.log('USER ID:', data.user.id);
        console.log('USER EMAIL:', data.user.email);


        dispatch(setUser(data.user)); // Update Redux state with user info
        // dispatch(setUser({})); 

        Alert.alert(
          'Login Successful',
          'Welcome back to Elite-Fit!',
          [
            {
              text: 'Continue',
              onPress: () => {
                navigation.replace('Dashboard');
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Login Error',
          'User information was not received.'
        );
      }

    } catch (error) {
      console.log('LOGIN CATCH ERROR:', error);

      Alert.alert(
        'Connection Error',
        error?.message || 'Unable to connect to Supabase.'
      );

    } finally {
      console.log('LOGIN FINISHED');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <Text style={styles.logo}>ELITE-FIT</Text>

      {/* TITLE */}
      <Text style={styles.title}>Welcome Back!</Text>

      <Text style={styles.subtitle}>
        Login to continue your fitness journey
      </Text>

      {/* EMAIL */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />

      {/* PASSWORD */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={[
          styles.button,
          loading && styles.disabledButton,
        ]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="small"
              color="#07100B"
            />

            <Text style={styles.loadingText}>
              Logging in...
            </Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>
            Login
          </Text>
        )}
      </TouchableOpacity>

      {/* SIGN UP */}
      <View style={styles.signupContainer}>

        <Text style={styles.normalText}>
          Don't have an account?
        </Text>

        <TouchableOpacity
          disabled={loading}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupText}>
            {' '}Sign Up
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

// =========================
// STYLES
// =========================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#39FF88',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: '#A9B0AC',
    textAlign: 'center',
    marginBottom: 35,
  },

  input: {
    height: 55,
    backgroundColor: '#171D1A',
    borderRadius: 12,
    paddingHorizontal: 18,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#242B27',
  },

  button: {
    height: 55,
    backgroundColor: '#39FF88',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  disabledButton: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#07100B',
    fontSize: 17,
    fontWeight: 'bold',
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    color: '#07100B',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  normalText: {
    color: '#A9B0AC',
    fontSize: 14,
  },

  signupText: {
    color: '#39FF88',
    fontSize: 14,
    fontWeight: 'bold',
  },
});