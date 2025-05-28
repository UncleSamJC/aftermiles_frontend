import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// 定义设置项组件
interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  rightContent?: React.ReactNode;
  onPress?: () => void;
  badge?: number;
}

const SettingItem = ({ icon, title, rightContent, onPress, badge }: SettingItemProps) => (
  <TouchableOpacity 
    onPress={onPress}
    className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100"
  >
    <View className="w-8">{icon}</View>
    <Text className="flex-1 text-gray-700 text-base ml-3">{title}</Text>
    <View className="flex-row items-center">
      {badge && (
        <View className="bg-red-500 rounded-full w-5 h-5 items-center justify-center mr-2">
          <Text className="text-white text-xs">{badge}</Text>
        </View>
      )}
      {rightContent}
    </View>
  </TouchableOpacity>
);

// 定义分类标题组件
const SectionTitle = ({ title }: { title: string }) => (
  <View className="px-4 py-2 bg-gray-50">
    <Text className="text-gray-500 text-sm">{title}</Text>
  </View>
);

export default function Settings() {
  const navigateToSettings = (path: string) => {
    router.push(`/(settings)/${path}` as any);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-2 bg-gray-50">
        <Text className="text-gray-500 text-2xl text-center">Version 1.0.0</Text>
      </View>
      {/* ==================ACCOUNT Section ================== */}
      <SectionTitle title="ACCOUNT" />
      <SettingItem
        icon={<Ionicons name="settings-outline" size={24} color="#4B9CFF" />}
        title="My Profile"
        onPress={() => navigateToSettings('profile')}
        rightContent={<Ionicons name="chevron-forward" size={20} color="#C5C5C5" />}
      />
          

          <SettingItem
        icon={<Ionicons name="car-outline" size={24} color="#4BE8C5" />}
        title="My Vehicle"
        onPress={() => navigateToSettings('vehicle')}
        rightContent={
        <>
        <Ionicons name="star" size={16} color="#FFB156" className="mr-2" />
        <Ionicons name="chevron-forward" size={20} color="#C5C5C5" />
        </>
        }
      />
      
      <SettingItem
        icon={<Ionicons name="document-outline" size={24} color="#4BE8C5" />}
        title="Data Export"
        onPress={() => navigateToSettings('data-export')}
        rightContent={<Ionicons name="chevron-forward" size={20} color="#C5C5C5" />}
      />

<SettingItem
        icon={<Ionicons name="heart-outline" size={24} color="#4B9CFF" />}
        title="Refer Friends"
        onPress={() => navigateToSettings('refer')}
        rightContent={<Ionicons name="chevron-forward" size={20} color="#C5C5C5" />}
      />

      {/* ==================TRIPS Section ================== */}
      <SectionTitle title="TRIPS" />
      <SettingItem
        icon={<Ionicons name="navigate-outline" size={24} color="#4B9CFF" />}
        title="Use Metric Units(KM)"
        rightContent={
          <Text className="text-gray-500">ON/OFF</Text>
        }
      />
      <SettingItem
        icon={<Ionicons name="heart-outline" size={24} color="#FFB156" />}
        title="Hot Spot"
        onPress={() => navigateToSettings('hotspot')}
        rightContent={<Ionicons name="chevron-forward" size={20} color="#C5C5C5" />}
      />
      <SettingItem
        icon={<Ionicons name="bookmark-outline" size={24} color="#4BE8C5" />}
        title="Favorite Places"
        onPress={() => navigateToSettings('places')}
        rightContent={<Ionicons name="chevron-forward" size={20} color="#C5C5C5" />}
      />

      <SettingItem
        icon={<Ionicons name="time-outline" size={24} color="#4BE8C5" />}
        title="NotWork Hours"
        onPress={() => navigateToSettings('not-work')}
        rightContent={<Ionicons name="chevron-forward" size={20} color="#C5C5C5" />}
      />

      {/* ==================TRANSACTIONS Section ================== */}
      <SectionTitle title="TRANSACTIONS" />
      <SettingItem
        icon={<Ionicons name="card-outline" size={24} color="#4B9CFF" />}
        title="TRANSACTIONS settings"
        onPress={() => navigateToSettings('transactions')}
        rightContent={<Ionicons name="chevron-forward" size={20} color="#C5C5C5" />}
      />



      {/* ==================HELP Section ================== */}
      <SectionTitle title="HELP" />
      <SettingItem
        icon={<Ionicons name="help-circle-outline" size={24} color="#FFB156" />}
        title="Help"
        onPress={() => navigateToSettings('help')}
        rightContent={<Ionicons name="chevron-forward" size={20} color="#C5C5C5" />}
      />

      {/* ==================Sign Out Button ================== */}
      <TouchableOpacity className="mt-6 mb-8 mx-4">
        <Text className="text-center text-pink-500 text-base">Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
} 