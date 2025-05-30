import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './supabasev2';


export const authService = {
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } catch (err: any) {
      console.error('Sign in error:', err);
      throw new Error(err.message || 'Sign in failed');
    }
  },
  
  signOut: async () => {
    try {
      const { error } = await auth.signOut();
      if (error) throw error;
      return true;
    } catch (err: any) {
      throw new Error(err.message || 'Sign out failed');
    }
  },
  
  getCurrentUser: async () => {
    try {
      const { data, error } = await auth.getUser();
      if (error) throw error;
      return data;
    } catch (err: any) {
      throw new Error(err.message || 'Get user failed');
    }
  },

  signUpWithEmail: async (email: string, password: string) => {
    try {
      // 只进行注册，不创建档案
      const { data, error } = await auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('User registration failed');

      return { user: data.user };
    } catch (err: any) {
      throw new Error(err.message || 'Sign up failed');
    }
  },

  debugPrintAllStorage:async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
  
      result.forEach(([key, value]) => {
        console.log(`KEY: ${key}\nVALUE: ${value}\n`);
      });
    } catch (e) {
      console.error('Error reading AsyncStorage:', e);
    }
  }
}; 