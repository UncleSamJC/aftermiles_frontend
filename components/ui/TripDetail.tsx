// components/ui/TripDetail.tsx
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function TripDetail({ tripId, onClose }: { tripId: string, onClose: () => void }) {
  // 这里可以根据 tripId 获取详情数据
  return (
    <View style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#f5f5f5",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      height: "85%", // 80% 高度
      minHeight: 300,
      width: "100%",
      padding: 20,
    }}>
      <TouchableOpacity onPress={onClose} className="items-end"> 
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Trip Detail for ID: {tripId}</Text>
      {/* 这里展示更多详情 */}
    </View>
  );
}