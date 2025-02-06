import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'counter_value'; // Key for AsyncStorage

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => increment(1)}>
          <Text style={styles.buttonText}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => increment(2)}>
          <Text style={styles.buttonText}>+2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => increment(5)}>
          <Text style={styles.buttonText}>+5</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
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
