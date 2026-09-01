import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

export default function SignupScreen({ navigation }) {
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

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
      />

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('ProfileSetup')}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.normalText}>
          Already have an account?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}> Login</Text>
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