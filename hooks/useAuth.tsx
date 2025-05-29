import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { auth } from '../services/supabasev2';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    // 监听认证状态变化
    const { data: { subscription } } = auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.user) {
        setUser(response.user);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signIn: authService.signIn,
    signOut: authService.signOut,
  };
} 