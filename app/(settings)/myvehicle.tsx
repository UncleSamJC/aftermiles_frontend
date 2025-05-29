import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

interface VehicleUpdateParams {
  make: string;
  model: string;
  year: string;
  license_plate: string;
}

interface InputRowProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  showInfo?: boolean;
  editable?: boolean;
}

const InputRow = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  showInfo = false,
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

export default function MyVehicleSettings() {
  const { user: authUser } = useAuth();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleSave = async () => {
    if (!isFormChanged || isSaving) return;
    
    setIsSaving(true);
    try {
      // TODO: Implement save functionality
      setIsFormChanged(false);
    } catch (error) {
      console.error('Error saving vehicle:', error);
      Alert.alert('Error', 'Failed to save vehicle information');
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
        <Text className="flex-1 text-xl">My Vehicle</Text>
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
            label="Make"
            value={make}
            onChangeText={(text) => handleInputChange(setMake, text)}
            placeholder="e.g., Toyota"
          />
          
          <InputRow
            label="Model"
            value={model}
            onChangeText={(text) => handleInputChange(setModel, text)}
            placeholder="e.g., Camry"
          />
          
          <InputRow
            label="Year"
            value={year}
            onChangeText={(text) => handleInputChange(setYear, text)}
            placeholder="e.g., 2024"
          />
          
          <InputRow
            label="License Plate"
            value={licensePlate}
            onChangeText={(text) => handleInputChange(setLicensePlate, text)}
            placeholder="Enter license plate number"
          />
        </View>
      </ScrollView>
    </View>
  );
}

