import { VehicleInfo } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const storageService = {
  // 车辆信息本地存储 (用于未登录状态)
  async saveVehicleInfo(vehicleInfo: VehicleInfo) {
    try {
      await AsyncStorage.setItem('vehicleInfo', JSON.stringify(vehicleInfo));
    } catch (error) {
      console.error('Error saving vehicle info:', error);
    }
  },

  async getVehicleInfo(): Promise<VehicleInfo | null> {
    try {
      const data = await AsyncStorage.getItem('vehicleInfo');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting vehicle info:', error);
      return null;
    }
  },

  async clearVehicleInfo() {
    try {
      await AsyncStorage.removeItem('vehicleInfo');
    } catch (error) {
      console.error('Error clearing vehicle info:', error);
    }
  },

  // 用户首选项存储
  async saveUserPreferences(preferences: any) {
    try {
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  },

  async getUserPreferences() {
    try {
      const data = await AsyncStorage.getItem('userPreferences');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting preferences:', error);
      return null;
    }
  }
};