import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { authService } from '../../services/authService';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSignupWithEmail = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await authService.signUpWithEmail(email, password);

      Alert.alert(
        'Success',
        'Registration successful! Please check your email for verification.',
        [{ text: 'OK', onPress: () => router.push('/login') }]
      );

    } catch (error: any) {
      console.error('Error during signup:', error.message);
      Alert.alert('Error', error.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white p-6">
        {/* Header */}
        <View className="flex-row items-center mb-12 mt-10">
          <Link href="/login" replace asChild>
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
          <Text className="text-2xl text-gray-700 mb-12">
            Create your account
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
            />
          </View>

          <View className="space-y-2 mb-6">
            <Text className="text-base font-medium text-gray-900">Password</Text>
            <TextInput
              className="w-full h-14 px-4 rounded-2xl bg-gray-50 text-gray-900 text-base"
              placeholder="Create a strong password"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              autoComplete="password-new"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View className="space-y-2 mb-6">
            <Text className="text-base font-medium text-gray-900">Confirm Password</Text>
            <TextInput
              className="w-full h-14 px-4 rounded-2xl bg-gray-50 text-gray-900 text-base"
              placeholder="Enter your password again"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              autoComplete="password-new"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <PrimaryButton 
            title="Create Account"
            onPress={handleSignupWithEmail}
            loading={loading}
          />

          {/* Login link */}
          <View className="mt-6">
            <Text className="text-gray-600 text-center text-base">
              Already have an account?{' '}
              <Link href="/login" replace asChild>
                <Text className="text-teal-500 font-medium">
                  Log in here
                </Text>
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}