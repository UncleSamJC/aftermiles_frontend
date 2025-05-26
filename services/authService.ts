import { auth, db } from './supabasev2';

export const authService = {
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // 如果是首次登录，创建用户档案
      if (data.user && data.user.email_confirmed_at) {
        try {
          await db
            .from('user_profiles')
            .insert([{ 
              id: data.user.id, 
              email: data.user.email,
              avatar_url: null 
            }])
            .select()
            .single();
        } catch (err) {
          // 如果档案已存在，忽略错误
          console.log('Profile might already exist:', err);
        }
      }
      
      return data;
    } catch (err: any) {
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
  }
}; 