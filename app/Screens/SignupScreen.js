
import React, { useState } from 'react';
import { supabase } from '../supabase';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

export default function SignupScreen({ navigation }) {

  // Input fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Signup function
  const handleSignup = async () => {

    // Check empty fields
    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    // Check password
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Password length
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {

      // 1. Create account in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      // Auth error
      if (error) {
        alert(error.message);
        return;
      }

      // Check user
      const user = data?.user;

      if (!user) {
        alert('Account could not be created.');
        return;
      }

      // 2. Save user profile in profile table
      const { error: profileError } = await supabase
        .from('profile')
        .insert([
          {
            user_id: user.id,
            full_name: fullName.trim(),
          },
        ]);

      // Profile error
      if (profileError) {
        console.log('Profile Error:', profileError);
        alert('Account created, but profile could not be saved.');
        return;
      }

      // Success
      alert('Account created successfully!');

      // Go to Login
      navigation.navigate('Login');

    } catch (error) {
      console.log('Signup Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.logo}>ELITE-FIT</Text>

      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.subtitle}>
        Start your personalized fitness journey
      </Text>

      {/* Full Name */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Confirm Password */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>
          Create Account
        </Text>
      </TouchableOpacity>

      {/* Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.normalText}>
          Already have an account?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>
            {' '}Login
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0B0F0E',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#39FF88',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 25,
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
    marginBottom: 30,
  },

  input: {
    height: 55,
    backgroundColor: '#171D1A',
    borderRadius: 12,
    paddingHorizontal: 18,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 15,
  },

  button: {
    height: 55,
    backgroundColor: '#39FF88',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#07100B',
    fontSize: 17,
    fontWeight: 'bold',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  normalText: {
    color: '#A9B0AC',
    fontSize: 14,
  },

  loginText: {
    color: '#39FF88',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

