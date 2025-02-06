interface StorageInterface {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
}

const storage: StorageInterface = {
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      const isWindowDefined = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
      if (isWindowDefined) {
        localStorage.setItem(key, value);
      } else {
        throw new Error('localStorage is not available');
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw error;
    }
  },

  getItem: async (key: string): Promise<string | null> => {
    try {
      const isWindowDefined = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
      if (isWindowDefined) {
        return localStorage.getItem(key);
      }
      throw new Error('localStorage is not available');
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      const isWindowDefined = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
      if (isWindowDefined) {
        localStorage.removeItem(key);
      } else {
        throw new Error('localStorage is not available');
      }
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      throw error;
    }
  }
};

export default storage;