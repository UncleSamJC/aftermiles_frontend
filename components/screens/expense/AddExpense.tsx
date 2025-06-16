import { PrimaryButton } from "@/components/common/PrimaryButton";
import { authService } from "@/services/authService";
import { db } from "@/services/supabasev2";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
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
  const [amount, setAmount] = useState("");
  const [vendor, setVendor] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showCategories, setShowCategories] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 处理金额输入的函数
  const handleAmountChange = (text: string) => {
    // 移除非数字和小数点
    const cleanedText = text.replace(/[^0-9.]/g, "");

    // 确保只有一个小数点
    const parts = cleanedText.split(".");
    if (parts.length > 2) return;

    // 限制小数位数为2位
    if (parts[1] && parts[1].length > 2) return;

    // 更新金额
    setAmount(cleanedText);
  };

  // 一个简单的日期格式化函数
  const formatDateString = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleSave = async () => {
    try {
      // 基本验证
      if (!amount || parseFloat(amount) <= 0) {
        Alert.alert("Error", "Please enter a valid amount");
        return;
      }
      if (!selectedCategory) {
        Alert.alert("Error", "Please select a category");
        return;
      }

      setIsSubmitting(true);

      // 获取当前用户
      const currentUser = await authService.getCurrentUser();
      console.log(currentUser);

      if (!currentUser?.user?.id) {
        Alert.alert("Error", "Please login first");
        return;
      }

      // 获取类别ID
      const { data: categoryData, error: categoryError } = await db
        .from("expense_categories")
        .select("id")
        .eq("name", selectedCategory.toLowerCase())
        .single();

      if (categoryError || !categoryData) {
        Alert.alert("Error", "Invalid category selected");
        return;
      }

      // 准备要插入的数据
      const expenseData = {
        date,
        user_id: currentUser.user.id,
        amount: parseFloat(amount),
        vendor: vendor || null,
        description: description || null,
        category: categoryData.id,
        updated_at: new Date().toISOString(),
      };

      const { error: insertError } = await db
        .from("expenses")
        .insert([expenseData]);

      if (insertError) {
        throw insertError;
      }

      Alert.alert("Success", "Expense saved successfully");
      onClose();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to save expense"
      );
    } finally {
      setIsSubmitting(false);
    }
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
                  className="text-4xl font-light text-gray-700"
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={handleAmountChange}
                  style={{ minWidth: 150 }}
                  placeholder="0.00"
                  placeholderTextColor="#6B7280"
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
                placeholderTextColor="#6B7280"
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
              <Text className="flex-1 text-lg">{formatDateString(date)}</Text>
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

            {/* Description */}
            <View className="flex-row items-center mb-4 border-b border-gray-200 py-3">
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#666"
                className="mr-3"
              />
              <TextInput
                placeholder="Description"
                placeholderTextColor="#6B7280"
                value={description}
                onChangeText={setDescription}
                className="flex-1 text-lg"
              />
            </View>

            {/* Tags */}
            <View className="flex-row items-center mb-4 border-b border-gray-200 py-3">
              <Ionicons
                name="pricetag-outline"
                size={24}
                color="#666"
                className="mr-3"
              />
              <TextInput placeholder="Tags" placeholderTextColor="#6B7280" className="flex-1 text-lg" />
            </View>
          </View>

          {/* Save Button */}
          <View className="p-4">
            <PrimaryButton
              title={isSubmitting ? "Saving..." : "Save"}
              onPress={handleSave}
              disabled={isSubmitting}
            />
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
