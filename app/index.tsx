import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheet } from "../components/ui/BottomSheet";
import { VehicleForm } from "../components/VehicleForm";
import { VehicleInfo } from "../types";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Index() {
  const [showVehicleForm, setShowVehicleForm] = useState(false);

  const handleSaveVehicle = (vehicleInfo: VehicleInfo) => {
    console.log('Vehicle info:', vehicleInfo);
    setShowVehicleForm(false);
    // TODO: Save vehicle info to backend
  };

  const handleLogin = (type: 'email' | 'apple' | 'google') => {
    if (type === 'email') {
      router.push('/login');
    } else {
      // TODO: Implement social login
      console.log(`Login with ${type}`);
      
    }
  };

  return (
    <View className="flex-1">
      {/* Background Image */}
      <Image
        source="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1470&auto=format&fit=crop"
        placeholder={blurhash}
        contentFit="cover"
        className="absolute w-full h-full"
      />
      
      {/* Overlay */}
      <View className="absolute w-full h-full bg-black/50" />
      
      {/* Content */}
      <View className="flex-1 justify-between p-8">
        {/* Top Section */}
        <View className="mt-12">
          <TouchableOpacity 
            className="w-12 h-12 bg-emerald-400 rounded-xl items-center justify-center mb-8"
            onPress={() => setShowVehicleForm(true)}
          >
            <Ionicons name="navigate" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-5xl font-bold mb-4">
            MilesTracker
          </Text>
          <Text className="text-green-300 text-4xl font-bold mb-4">
            for Uber Driver and DoorDasher
          </Text>
        </View>

        {/* Bottom Section */}
        <View className="space-y-4">
          {/* Login Buttons */}
          <TouchableOpacity 
            className="w-full bg-teal-500 p-4 rounded-full mb-4"
            onPress={() => handleLogin('email')}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Continue with Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-full bg-white p-4 rounded-full flex-row items-center justify-center space-x-2 mb-4"
            onPress={() => handleLogin('apple')}
          >
            <Ionicons name="logo-apple" size={24} color="black" />
            <Text className="text-black text-lg font-semibold">
              Continue with Apple
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-full bg-white p-4 rounded-full flex-row items-center justify-center space-x-2"
            onPress={() => handleLogin('google')}
          >
            <Ionicons name="logo-google" size={24} color="black" />
            <Text className="text-black text-lg font-semibold">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Terms Text */}
          <Text className="text-white/80 text-center text-sm mt-4">
            By signing up, you agree to our{" "}
            <Text className="underline">Terms and Conditions</Text> AND{"\n"}
            acknowledge that you have read our{" "}
            <Text className="underline">Privacy Policy</Text>
          </Text>
        </View>
      </View>

      {/* Vehicle Form Bottom Sheet */}
      <BottomSheet
        visible={showVehicleForm}
        onClose={() => setShowVehicleForm(false)}
      >
        <VehicleForm onSave={handleSaveVehicle} />
      </BottomSheet>
    </View>
  );
}
