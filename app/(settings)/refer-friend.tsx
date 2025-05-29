import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';

export default function ReferFriend() {
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleShare = async () => {
    try {
      setLoading(true);
      const result = await Share.share({
        message: 'Track your mileage and expenses with AfterMiles! Download now: [App Store Link]',
        title: 'Share AfterMiles',
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share the app');
      console.error('Error sharing:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <Text className="flex-1 text-xl">Refer a Friend</Text>
      </View>

      {/* Content */}
      <ScrollView className="flex-1">
        <View className="p-6">
          <View className="items-center mb-8">
            <Ionicons name="gift-outline" size={80} color="#10B981" />
          </View>

          <Text className="text-2xl font-semibold text-center mb-4">
            Share AfterMiles
          </Text>
          
          <Text className="text-gray-600 text-center mb-8">
            Invite your friends to join AfterMiles and help them track their mileage and expenses efficiently.
          </Text>

          <TouchableOpacity
            onPress={handleShare}
            disabled={loading}
            className="bg-teal-500 py-4 px-6 rounded-full"
          >
            <Text className="text-white text-center text-lg font-semibold">
              {loading ? 'Sharing...' : 'Share with Friends'}
            </Text>
          </TouchableOpacity>

          <View className="mt-8 p-4 bg-gray-50 rounded-xl">
            <Text className="text-gray-700 font-medium mb-2">How it works:</Text>
            <View className="space-y-2">
              <Text className="text-gray-600">1. Share the app with your friends</Text>
              <Text className="text-gray-600">2. They download and sign up</Text>
              <Text className="text-gray-600">3. Both of you get rewards!</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 