import { useEffect, useState } from 'react';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  // Add other user properties as needed
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Here you would typically fetch the user data from your authentication service
    // For now, we'll use mock data
    setUser({
      email: 'dezhiwang5633@gmail.com',
      firstName: '',
      lastName: '',
    });
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    setUser,
  };
} 