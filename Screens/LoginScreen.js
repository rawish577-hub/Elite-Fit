import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ELITE-FIT</Text>

      <Text style={styles.title}>Welcome Back!</Text>

      <Text style={styles.subtitle}>
        Login to continue your fitness journey
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.normalText}>
          Don't have an account?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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