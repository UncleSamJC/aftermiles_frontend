import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { PrimaryButton } from '../common/PrimaryButton';

interface VehicleInfo {
  year: number;
  make: string;
  model: string;
}

interface VehicleFormProps {
  onSave: (vehicleInfo: VehicleInfo) => void;
  initialData?: VehicleInfo;
}

const STORAGE_KEY = '@vehicle_info';

export const VehicleForm: React.FC<VehicleFormProps> = ({ onSave, initialData }) => {
  const [year, setYear] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData) as VehicleInfo;
        setYear(String(parsedData.year));
        setManufacturer(parsedData.make);
        setModel(parsedData.model);
      }
    } catch (error) {
      console.error('Error loading vehicle data:', error);
    }
  };

  const handleSave = async () => {
    if (year && manufacturer && model) {
      const vehicleInfo: VehicleInfo = {
        year: parseInt(year, 10),
        make: manufacturer,
        model: model
      };

      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(vehicleInfo));
        onSave(vehicleInfo);
      } catch (error) {
        console.error('Error saving vehicle data:', error);
      }
    }
  };

  return (
    <View className="p-6 bg-white">
      <Text className="text-xl font-bold mb-6 text-center">Add Vehicle Information</Text>
      
      <View className="mb-4">
        <Text className="text-base font-medium mb-2">Year</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          value={year}
          onChangeText={setYear}
          placeholder="Enter vehicle year"
          keyboardType="numeric"
        />
      </View>

      <View className="mb-4">
        <Text className="text-base font-medium mb-2">Manufacturer</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          value={manufacturer}
          onChangeText={setManufacturer}
          placeholder="Enter manufacturer (e.g., Toyota)"
        />
      </View>

      <View className="mb-6">
        <Text className="text-base font-medium mb-2">Model</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          value={model}
          onChangeText={setModel}
          placeholder="Enter model (e.g., Camry)"
        />
      </View>

      <PrimaryButton
        title="Save Vehicle Info"
        onPress={handleSave}
      />
    </View>
  );
};