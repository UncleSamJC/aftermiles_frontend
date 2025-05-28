import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from './supabasev2';

export const authService = {
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      console.log('Sign in response:', data);
      
      // 存储认证令牌
      if (data.session?.access_token) {
        await AsyncStorage.setItem('authToken', data.session.access_token);
        console.log('Auth token stored successfully');
      }

      // 确保有用户数据
      if (!data.user) {
        throw new Error('No user data in response');
      }

      // 直接存储基本用户信息
      const basicUserData = {
        id: data.user.id,
        email: data.user.email,
        email_confirmed_at: data.user.email_confirmed_at
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(basicUserData));
      console.log('Basic user data stored:', basicUserData);

      // 如果是已验证用户，获取或创建用户档案
      if (data.user.email_confirmed_at) {
        try {
          // 首先尝试获取现有档案
          let { data: profileData } = await db
            .from('user_profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          // 如果没有找到档案，创建新档案
          if (!profileData) {
            const { data: newProfile, error: profileError } = await db
              .from('user_profiles')
              .insert([{ 
                id: data.user.id, 
                email: data.user.email,
                avatar_url: null 
              }])
              .select()
              .single();

            if (profileError) throw profileError;
            profileData = newProfile;
          }

          // 更新存储的用户数据，包含档案信息
          if (profileData) {
            const fullUserData = {
              ...basicUserData,
              ...profileData
            };
            await AsyncStorage.setItem('user', JSON.stringify(fullUserData));
            console.log('Full user data stored:', fullUserData);
          }
        } catch (err) {
          console.error('Error handling user profile:', err);
          // 即使处理档案出错，也不影响登录，因为我们已经存储了基本用户信息
        }
      }
      
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
      // 清除本地存储的用户信息
      await AsyncStorage.multiRemove(['user', 'authToken']);
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
  }
}; 