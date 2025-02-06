// HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
  route: HomeScreenRouteProp;
}

const HomeScreen: React.FC<Props> = ({ route }) => {
  const { message } = route.params; // Retrieve the message passed from RegisterScreen

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'green', // Green color for success message
  },
});

export default HomeScreen;
