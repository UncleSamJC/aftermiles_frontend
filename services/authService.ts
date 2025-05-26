import { supabase } from './supabase';

export const authService = {
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  
  getCurrentUser: async () => {
    return await supabase.auth.getUser();
  },

  signUpWithEmail: async (email: string, password: string) => {
    // 1. Sign up the user with Supabase auth
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;
    if (!user) throw new Error('User registration failed');

    // 2. Create the user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: user.id,
          email: email,
          avatar_url: null,
        }
      ]);

    if (profileError) throw profileError;

    return { user };
  }
}; 