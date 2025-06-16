import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { authService } from '../../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      console.log('Attempting login with email:', email);
      const { user } = await authService.signIn(email, password);
      
      console.log('Login successful, user:', user);
      await authService.debugPrintAllStorage();
      
      if (!user?.email_confirmed_at) {
        Alert.alert(
          'Email Not Verified',
          'Please check your email and verify your account before logging in.',
          [{ text: 'OK' }]
        );
        return;
      }

      // 验证用户数据是否已存储
      const storedUser = await AsyncStorage.getItem('user');
      const authToken = await AsyncStorage.getItem('authToken');
      console.log('Stored user data:', storedUser);
      console.log('Auth token exists:', !!authToken);

      router.push('/(tabs)/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error.message || 'An error occurred during login'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white p-6">
        {/* Header */}
        <View className="flex-row items-center mb-12 mt-10">
          <Link href="/" replace asChild>
            <TouchableOpacity 
              className="flex-row items-center py-3 px-2 -mx-2" 
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Ionicons 
                name="chevron-back" 
                size={24} 
                color="#64D2B9"
                style={{ marginRight: 8 }}
              />
              <Text className="text-teal-500 text-lg">Back</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="text-2xl text-gray-700 mb-7">
            Please enter your email and password
          </Text>

          <View className="space-y-2 mb-6">
            <Text className="text-base font-medium text-gray-900">Email</Text>
            <TextInput
              className="w-full h-14 px-4 rounded-2xl bg-gray-50 text-gray-900 text-base"
              placeholder="name@email.com"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
          </View>

          <View className="space-y-2 mb-6">
            <Text className="text-base font-medium text-gray-900">Password</Text>
            <TextInput
              className="w-full h-14 px-4 rounded-2xl bg-gray-50 text-gray-900 text-base"
              placeholder="********"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              autoComplete="password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
          </View>

          <PrimaryButton 
            title="Continue"
            onPress={handleLogin}
            loading={loading}
          />

          {/* Sign up link */}
          <View className="mt-6">
            <Text className="text-gray-600 text-center text-base">
              Not a user yet?{' '}
              <Link href="/signup" replace asChild>
                <Text className="text-teal-500 font-medium">
                  Sign up here
                </Text>
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
} 