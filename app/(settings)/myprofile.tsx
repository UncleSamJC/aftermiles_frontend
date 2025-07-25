import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../services/supabasev2';

interface ProfileUpdateParams {
  first_name: string;
  last_name: string;
  phone: string;
}

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

export default function MyProfileSettings() {
  const { user: authUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [ratePerMile, setRatePerMile] = useState('0.7');
  const [useKilometers, setUseKilometers] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authUser) getProfile()
  }, [authUser])

  async function getProfile() {
    try {
      setLoading(true);
      if (!authUser) {
        console.log('No user in auth');
        throw new Error('No user available!');
      }

      // Set email immediately since we have it in auth
      setEmail(authUser.email || '');

      const { data, error, status } = await db
        .from('user_profiles')
        .select(`first_name, last_name, phone, email`)
        .eq('id', authUser.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        const profile = data as UserProfile;
        setFirstName(profile.first_name || '');
        setLastName(profile.last_name || '');
        setMobile(profile.phone || '');
        setEmail(profile.email || '');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', 'Failed to load profile data. Please try again.');
      }
      console.error('Error in getProfile:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ first_name, last_name, phone }: ProfileUpdateParams) {
    if (!authUser) {
      Alert.alert('Error', 'No user available!');
      return;
    }

    try {
      console.log('Updating function is called...');
      setIsSaving(true);
      const updates: Partial<UserProfile> = {
        id: authUser.id,
        first_name,
        last_name,
        phone,
        updated_at: new Date(),
      };

      const { error } = await db.from('user_profiles').upsert(updates);
      
      if (error) throw error;

      Alert.alert('Success', 'Profile updated successfully');
      setIsFormChanged(false);
      
      await getProfile();

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
      console.error('Error in updateProfile:', error);
    } finally {
      setIsSaving(false);
    }
  }

  const handleBack = () => {
    router.back();
  };

  const handleSave = async () => {
    if (!isFormChanged || isSaving) return;
    
    setIsSaving(true);
    try {
      await updateProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: mobile.trim()
      });
      setIsFormChanged(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (setter: (value: string) => void, value: string) => {
    setter(value);
    if (!isFormChanged) {
      setIsFormChanged(true);
    }
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
    handleInputChange(setMobile, formatPhoneNumber(text));
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
        <TouchableOpacity 
          className="px-4" 
          onPress={handleSave}
          disabled={!isFormChanged || isSaving}
        >
          <Text className={`text-base ${isFormChanged ? 'text-green-500' : 'text-gray-400'}`}>
            {isSaving ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1">
        <View className="p-4">

        <InputRow
            label="Email"
            value={email}
            editable={false}
          />

          <InputRow
            label="First Name"
            value={firstName}
            onChangeText={(text) => handleInputChange(setFirstName, text)}
            placeholder="first name"
          />
          
          <InputRow
            label="Last Name"
            value={lastName}
            onChangeText={(text) => handleInputChange(setLastName, text)}
            placeholder="last name"
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