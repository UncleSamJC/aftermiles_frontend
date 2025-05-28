import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  id: string;
  // Add other user properties as needed
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log('Loading user data...');
        const [userJson, authToken] = await Promise.all([
          AsyncStorage.getItem('user'),
          AsyncStorage.getItem('authToken')
        ]);

        console.log('User data from storage:', userJson);
        console.log('Auth token exists:', !!authToken);

        if (userJson && authToken) {
          const userData = JSON.parse(userJson);
          console.log('Parsed user data:', userData);
          setUser(userData);
        } else {
          console.log('Missing data:', {
            hasUserJson: !!userJson,
            hasAuthToken: !!authToken
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      // Since authToken is not in User type, we should either:
      // 1. Add it to the User interface, or
      // 2. Pass it separately
      // For now, we'll just store the user data
      setUser(userData);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['user', 'authToken']);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return {
    user,
    loading,
    updateUser,
    logout,
  };
} 