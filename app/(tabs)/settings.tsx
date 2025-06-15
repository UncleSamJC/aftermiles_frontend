import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../services/supabasev2';

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
  const { signOut } = useAuth();
  const [useKilometers, setUseKilometers] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const navigateToSettings = (path: string) => {
    router.push(`/(settings)/${path}` as any);
  };

  // 加载用户的单位设置
  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      // TODO: 从后端加载用户设置
      // 这里先模拟从后端加载数据
      const response = await db
        .from('user_settings')
        .select('use_kilometers')
        .single();
      
      if (response.data) {
        setUseKilometers(response.data.use_kilometers);
      }
    } catch (error) {
      console.error('Error loading user settings:', error);
    }
  };

  const handleUnitToggle = async (value: boolean) => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      setUseKilometers(value);
      
      // TODO: 更新后端数据
      // 这里先模拟API调用
      console.log('Updating user settings:', { use_kilometers: value });
      await new Promise(resolve => setTimeout(resolve, 500)); // 模拟网络延迟
      
      // 实际实现时替换为：
      /*
      const { error } = await db
        .from('user_settings')
        .upsert({
          use_kilometers: value,
          updated_at: new Date()
        });

      if (error) throw error;
      */

    } catch (error) {
      console.error('Error updating unit settings:', error);
      Alert.alert('Error', 'Failed to update settings');
      // 如果失败，恢复之前的状态
      setUseKilometers(!value);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      // 清空本地存储的用户id 和 email
     // await AsyncStorage.multiRemove(['id', 'email']);
      await signOut();
      // 退出成功后重定向到登录页面
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-2 bg-gray-50">
        <Text className="text-gray-500 text-2xl text-center">Version 1.0.0</Text>
      </View>
      {/* ==================GENERAL Section ================== */}
      <SectionTitle title="GENERAL" />
      <SettingItem
        icon={<Ionicons name="settings-outline" size={24} color="#4B9CFF" />}
        title="My Profile"
        onPress={() => navigateToSettings('myprofile')}
        rightContent={<Ionicons name="chevron-forward" size={20} color="#C5C5C5" />}
      />
          
      <SettingItem
        icon={<Ionicons name="car-outline" size={24} color="#4BE8C5" />}
        title="My Vehicle"
        onPress={() => navigateToSettings('myvehicle')}
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
        onPress={() => navigateToSettings('refer-friend')}
        rightContent={<Ionicons name="chevron-forward" size={20} color="#C5C5C5" />}
      />

      {/* ==================TRIPS Section ================== */}
      <SectionTitle title="TRIPS" />
      <SettingItem
        icon={<Ionicons name="navigate-outline" size={24} color="#4B9CFF" />}
        title="Use Metric Units(KM)"
        rightContent={
          <Switch
            value={useKilometers}
            onValueChange={handleUnitToggle}
            trackColor={{ false: '#D1D5DB', true: '#10B981' }}
            disabled={isUpdating}
          />
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

      {/* ==================EXPENSES Section ================== */}
      <SectionTitle title="EXPENSES" />
      <SettingItem
        icon="wallet-outline"
        title="EXPENSES settings"
        onPress={() => navigateToSettings('expenses')}
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
      <TouchableOpacity 
        className="mt-6 mb-8 mx-4"
        onPress={handleSignOut}
      >
        <Text className="text-center text-pink-500 text-base">Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
} 