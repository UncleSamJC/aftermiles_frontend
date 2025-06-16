import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import CategorySelect from "./CategorySelect";

interface AddExpenseProps {
  onClose: () => void;
}

export default function AddExpense({ onClose }: AddExpenseProps) {
  const [amount, setAmount] = useState('');
  const [vendor, setVendor] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showCategories, setShowCategories] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // 处理金额输入的函数
  const handleAmountChange = (text: string) => {
    // 移除非数字和小数点
    const cleanedText = text.replace(/[^0-9.]/g, '');
    
    // 确保只有一个小数点
    const parts = cleanedText.split('.');
    if (parts.length > 2) return;
    
    // 限制小数位数为2位
    if (parts[1] && parts[1].length > 2) return;
    
    // 更新金额
    setAmount(cleanedText);
  };

  // 一个简单的日期格式化函数
  const formatDateString = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <View className="flex-1 mt-20 bg-white rounded-t-3xl">
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-teal-500 text-lg">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-xl font-semibold">Add Expense</Text>
            <View style={{ width: 60 }} />
          </View>

          {/* Form */}
          <View className="p-4">
            {/* Amount */}
            <View className="items-center mb-6">
              <View className="flex-row items-center">
                <Text className="text-4xl font-light">$</Text>
                <TextInput
                  className="text-4xl font-light"
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={handleAmountChange}

                  style={{ minWidth: 150 }}
                  placeholder="0.00"
                />
              </View>
              <TouchableOpacity className="mt-4 p-3 rounded-lg border border-dashed border-gray-300">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="camera-outline" size={24} color="#666" />
                  <Text className="text-gray-600">Add receipt</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Vendor */}
            <View className="flex-row items-center mb-4 border-b border-gray-200 py-3">
              <Ionicons
                name="business-outline"
                size={24}
                color="#666"
                className="mr-3"
              />
              <TextInput
                placeholder="Vendor"
                value={vendor}
                onChangeText={setVendor}
                className="flex-1 text-lg"
              />
            </View>

            {/* Date */}
            <TouchableOpacity
              onPress={() => setShowCalendar(true)}
              className="flex-row items-center mb-4 border-b border-gray-200 py-3"
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color="#666"
                className="mr-3"
              />
              <Text className="flex-1 text-lg">
                {formatDateString(date)}
              </Text>
            </TouchableOpacity>

            {/* Calendar Modal */}
            <Modal
              transparent={true}
              visible={showCalendar}
              animationType="fade"
              onRequestClose={() => setShowCalendar(false)}
            >
              <View className="flex-1 bg-black/50 justify-center">
                <View className="bg-white mx-4 rounded-xl p-4">
                  <Calendar
                    onDayPress={(day) => {
                      setDate(day.dateString); // day.dateString 格式为 'YYYY-MM-DD'
                      setShowCalendar(false);
                    }}
                    style={{ width: 340 }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowCalendar(false)}
                    className="mt-4"
                  >
                    <Text className="text-center text-teal-500 text-lg">
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Categories */}
            <Pressable
              onPress={() => setShowCategories(true)}
              className="flex-row items-center mb-4 border-b border-gray-200 py-3"
            >
              <Ionicons
                name="folder-outline"
                size={24}
                color="#666"
                className="mr-3"
              />
              <Text className="flex-1 text-lg text-gray-500">
                {selectedCategory || "Categories"}
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </Pressable>

            {/* Notes */}
            <View className="flex-row items-center mb-4 border-b border-gray-200 py-3">
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#666"
                className="mr-3"
              />
              <TextInput placeholder="Notes" className="flex-1 text-lg" />
            </View>

            {/* Tags */}
            <View className="flex-row items-center mb-4 border-b border-gray-200 py-3">
              <Ionicons
                name="pricetag-outline"
                size={24}
                color="#666"
                className="mr-3"
              />
              <TextInput placeholder="Tags" className="flex-1 text-lg" />
            </View>
          </View>

          {/* Save Button */}
          <View className="p-4">
            <PrimaryButton title="Save" />
          </View>
        </View>

        {/* Categories Modal */}
        {showCategories && (
          <CategorySelect
            onClose={() => setShowCategories(false)}
            onSelect={(category) => {
              setSelectedCategory(category);
              setShowCategories(false);
            }}
          />
        )}
      </View>
    </Modal>
  );
}
