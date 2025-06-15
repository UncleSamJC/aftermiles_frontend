import { Ionicons } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface CategorySelectProps {
  onClose: () => void;
  onSelect: (category: string) => void;
}

const CATEGORIES = [
  { id: "fuel", name: "Fuel", icon: "card" },
  { id: "maintenance", name: "Maintenance and Repairs", icon: "hardware-chip-outline" },
  { id: "wash", name: "Car Wash", icon: "water" },
  { id: "parking", name: "Parking Fees", icon: "move-outline" },
  { id: "insurance", name: "Car Insurance", icon: "sparkles" },
  { id: "tolls", name: "Tolls Fees", icon: "diamond" },
  { id: "other", name: "Other Related Expenses", icon: "attach-sharp" },
];

export default function CategorySelect({
  onClose,
  onSelect,
}: CategorySelectProps) {
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

          {/* Categories List */}
          <View className="p-4">
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => onSelect(category.name)}
                className="flex-row items-center py-4 border-b border-gray-100"
              >
                <Ionicons
                  name={category.icon as any}
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
