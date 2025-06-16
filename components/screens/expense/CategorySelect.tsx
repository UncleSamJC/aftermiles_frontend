import { db } from "@/services/supabasev2";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CategorySelectProps {
  onClose: () => void;
  onSelect: (category: string) => void;
}

interface Category {
  id: number;
  name: string;
  description: string | null;
  icon_name: string | null;
  color: string | null;
  is_default: boolean | null;
}

export default function CategorySelect({
  onClose,
  onSelect,
}: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const { data, error: dbError } = await db
        .from("expense_categories")
        .select("*")
        .order("id", { ascending: true });

      if (dbError) throw dbError;
      if (!data) throw new Error("No categories found");

      setCategories(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories"
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

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
              <Ionicons name="arrow-back" size={24} color="#0F766E" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold">Select Category</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Loading State */}
          {isLoading && (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#0F766E" />
              <Text className="mt-2 text-gray-600">Loading categories...</Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View className="flex-1 justify-center items-center p-4">
              <Text className="text-red-500 text-center">{error}</Text>
              <TouchableOpacity
                onPress={() => {
                  setError(null);
                  setIsLoading(true);
                  // 重新获取数据
                  fetchCategories();
                }}
                className="mt-4 p-3 bg-teal-500 rounded-lg"
              >
                <Text className="text-white">Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Categories List */}
          <View className="p-4">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => onSelect(category.name)}
                className="flex-row items-center py-4 border-b border-gray-100"
              >
                <Ionicons
                  name={category.icon_name as any}
                  size={24}
                  color="#0F766E"
                  className="mr-3"
                />
                <Text className="text-lg">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}
