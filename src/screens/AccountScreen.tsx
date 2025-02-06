import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import storage from '../utils/storage';

type Props = {
  route: RouteProp<RootStackParamList, 'Account'>;
  navigation: StackNavigationProp<RootStackParamList, 'Account'>;
};

const AccountScreen: React.FC<Props> = ({ route, navigation }) => {
  const [currentUsername, setCurrentUsername] = useState(route.params?.username || '');
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUsername = async () => {
    try {
      if (!newUsername) {
        setErrorMessage('Please enter a new username');
        return;
      }

      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const requestBody = {
        currentUsername: currentUsername,
        newUsername: newUsername
      };

      console.log('Sending request:', requestBody);

      const response = await fetch('https://erinskidds.com/reactauthstatedemo/api/update_username.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      console.log('Username update response:', data);

      if (data.message === 'Username updated successfully') {
        setCurrentUsername(newUsername);
        setNewUsername('');
        setSuccessMessage('Username updated successfully');
        navigation.setParams({ username: newUsername });
      } else {
        setErrorMessage(data.error || 'Failed to update username');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const response = await fetch('https://erinskidds.com/reactauthstatedemo/api/update_password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: currentUsername,
          currentPassword,
          newPassword
        })
      });

      const data = await response.json();
      console.log('Password update response:', data);

      if (data.success) {
        setCurrentPassword('');
        setNewPassword('');
        setSuccessMessage('Password updated successfully');
      } else {
        setErrorMessage(data.error || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      console.log('Proceeding to delete account...');
      setIsLoading(true);

      const response = await fetch('https://erinskidds.com/reactauthstatedemo/api/delete_account.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: currentUsername
        })
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Delete response:', data);

      if (data.success) {
        await storage.removeItem('userToken');
        navigation.reset({
          index: 0,
          routes: [{
            name: 'Login',
            params: { message: 'Account successfully deleted' }
          }]
        });
      } else {
        setErrorMessage(data.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setErrorMessage('An error occurred while deleting account');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          <Text style={styles.header}>Account Settings</Text>
          
          <Text style={styles.label}>Current Username:</Text>
          <Text style={styles.username}>{currentUsername}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Change Username</Text>
            <TextInput
              style={styles.input}
              placeholder="New Username"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleChangeUsername}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Updating...' : 'Update Username'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleChangePassword}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Updating...' : 'Update Password'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.deleteButton, isLoading && styles.buttonDisabled]}
            onPress={handleDeleteAccount}
            disabled={isLoading}
          >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  username: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  error: {
    color: '#FF3B30',
    marginTop: 10,
    textAlign: 'center',
  },
  success: {
    color: '#34C759',
    marginTop: 10,
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  buttonDisabled: {
    opacity: 0.5
  }
});

export default AccountScreen;
