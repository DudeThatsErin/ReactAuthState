import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import storage from '../utils/storage';
import { useAuth } from '../context/AuthContext';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
  route: RouteProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>((route.params && (route.params as { message?: string })?.message) || '');
  const { setUserToken } = useAuth();

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await fetch('https://erinskidds.com/reactauthstatedemo/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.success) {
        await storage.setItem('userToken', data.token || '');
        setUserToken(data.token || '');
        navigation.navigate('Account', { username });
      } else if (data.error === 'User not found') {
        setErrorMessage('You are not registered yet. Register now?');
      } else if (data.error === 'Invalid password') {
        setErrorMessage('Invalid password. Forgot your password?');
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {successMessage ? (
            <Text style={styles.successMessage}>{successMessage}</Text>
          ) : null}
          <View style={styles.loginCard}>
            <Text style={styles.header}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {errorMessage ? (
              <View style={styles.errorContainer}>
                {errorMessage === 'You are not registered yet. Register now?' ? (
                  <Text style={styles.errorText}>
                    You are not registered yet.{' '}
                    <Text style={styles.registerLink} onPress={handleRegister}>
                      Register now?
                    </Text>
                  </Text>
                ) : errorMessage === 'Invalid password. Forgot your password?' ? (
                  <Text style={styles.errorText}>
                    Invalid password.{' '}
                    <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
                      Forgot your password?
                    </Text>
                  </Text>
                ) : (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                )}
              </View>
            ) : null}
            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inner: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginCard: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  registerButton: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  forgotPassword: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  successMessage: {
    color: 'green',
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  registerLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});

export default LoginScreen;
