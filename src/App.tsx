import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import storage from './utils/storage';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AccountScreen from './screens/AccountScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { AuthProvider } from './context/AuthContext';

export type RootStackParamList = {
  Login: { message?: string } | undefined;
  Register: undefined;
  Account: { username: string };
  ForgotPassword: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await storage.getItem('userToken');
      if (token) {
        setUserToken(token);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await storage.removeItem('userToken');
    setUserToken(null);
  };

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            gestureEnabled: false,
          }}
        >
          {!userToken ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="Account" component={AccountScreen} />
            </>
          ) : (
            <Stack.Screen 
              name="Account" 
              component={AccountScreen}
              options={{
                headerLeft: () => null,
                headerRight: () => (
                  <TouchableOpacity 
                    onPress={handleLogout}
                    style={{ marginRight: 15 }}
                  >
                    <Text style={{ color: '#007AFF' }}>Logout</Text>
                  </TouchableOpacity>
                )
              }}
            />
          )}
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
