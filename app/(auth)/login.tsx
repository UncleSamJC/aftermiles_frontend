import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 暂时不验证用户名和密码
    console.log('Continue without verification');
    router.push('/(tabs)/dashboard');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white p-6">
        {/* Header */}
        <View className="flex-row items-center mb-12 mt-10">
          <Link href="/" asChild>
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
            />
          </View>

          <PrimaryButton 
            title="Continue"
            onPress={handleLogin}
          />

          {/* Sign up link */}
          <View className="mt-6">
            <Text className="text-gray-600 text-center text-base">
              Not a user yet?{' '}
              <Link href="/signup" asChild>
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