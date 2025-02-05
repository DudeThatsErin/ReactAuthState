import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage/lib/module/AsyncStorage.js';

const STORAGE_KEY = 'counter_value'; // Key for AsyncStorage

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const { width } = Dimensions.get('window'); // Get screen width

  // Load stored count from AsyncStorage
  useEffect(() => {
    const loadCount = async () => {
      try {
        const savedCount = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedCount !== null) {
          setCount(parseInt(savedCount, 10));
        }
      } catch (error) {
        console.error('Failed to load count:', error);
      }
    };
    loadCount();
  }, []);

  // Save count to AsyncStorage whenever it updates
  useEffect(() => {
    const saveCount = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, count.toString());
      } catch (error) {
        console.error('Failed to save count:', error);
      }
    };
    saveCount();
  }, [count]);

  // Function to increment count
  const increment = (value: number) => {
    setCount((prev) => prev + value);
  };

  // Function to reset counter
  const resetCounter = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setCount(0);
    } catch (error) {
      console.error('Failed to reset count:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Count: {count}</Text>
      <View style={[styles.buttonContainer, { flexDirection: width > 600 ? 'row' : 'column' }]}>
        {[1, 2, 5, 10, 15, 20, 50, 100].map((value) => (
          <TouchableOpacity key={value} style={[styles.button, { width: width > 600 ? 80 : '80%' }]} onPress={() => increment(value)}>
            <Text style={styles.buttonText}>+{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetCounter}>
        <Text style={styles.resetButtonText}>Restart Counter</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  counterText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'center', // Center buttons on mobile
    flexWrap: 'wrap', // Wrap buttons on smaller screens
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;