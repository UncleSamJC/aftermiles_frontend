import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUser } from '../hooks/useUser';

interface InputRowProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  showInfo?: boolean;
  prefix?: string;
  editable?: boolean;
}

const InputRow = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  showInfo = false,
  prefix,
  editable = true
}: InputRowProps) => (
  <View className="border-b border-gray-200 py-3">
    <View className="flex-row items-center mb-1">
      <Text className="text-gray-600 text-base">{label}</Text>
      {showInfo && (
        <TouchableOpacity className="ml-2">
          <Ionicons name="information-circle-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
    <View className="flex-row items-center">
      {prefix && (
        <Text className="text-gray-400 text-lg mr-1">{prefix}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#D1D5DB"
        className="flex-1 text-lg text-gray-700"
        editable={editable}
      />
    </View>
  </View>
);

export default function ProfileSettings() {
  const { user, loading } = useUser();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [ratePerMile, setRatePerMile] = useState('0.7');
  const [useKilometers, setUseKilometers] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleBack = () => {
    router.back();
  };

  const formatPhoneNumber = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    // Format as (123) 456-7890
    if (cleaned.length >= 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    return text;
  };

  const handlePhoneChange = (text: string) => {
    setMobile(formatPhoneNumber(text));
  };

  const handleDeleteAccount = () => {
    // Implement delete account logic
    console.log('Delete account pressed');
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Custom Header */}
      <View className="flex-row items-center px-2 my-5 h-14 border-b border-gray-200">
        <TouchableOpacity 
          onPress={handleBack} 
          className="w-10 h-full justify-center"
        >
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text className="flex-1 text-xl">My Profile</Text>
        <TouchableOpacity className="px-4">
          <Text className="text-gray-400 text-base">Save</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1">
        <View className="p-4">
          <InputRow
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="first name"
          />
          
          <InputRow
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholder="last name"
          />
          
          <InputRow
            label="Email"
            value={email}
            editable={false}
          />
          
          <InputRow
            label="Mobile"
            value={mobile}
            onChangeText={handlePhoneChange}
            placeholder="(123) 456-7890"
          />
          
          <InputRow
            label="Rate Per Work Mile"
            value={ratePerMile}
            onChangeText={setRatePerMile}
            showInfo={true}
            prefix="$"
          />

          <View className="border-b border-gray-200 py-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-gray-600 text-base">Use Kilometers</Text>
                <TouchableOpacity className="ml-2">
                  <Ionicons name="information-circle-outline" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
              <Switch
                value={useKilometers}
                onValueChange={setUseKilometers}
                trackColor={{ false: '#D1D5DB', true: '#10B981' }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Delete Account Button */}
      <View className="border-t border-gray-200">
        <TouchableOpacity 
          className="p-4 flex-row items-center justify-between"
          onPress={handleDeleteAccount}
        >
          <Text className="text-red-700 text-base">Delete Account</Text>
          <Ionicons name="chevron-forward" size={20} color="#C5C5C5" />
        </TouchableOpacity>
      </View>
    </View>
  );
} 