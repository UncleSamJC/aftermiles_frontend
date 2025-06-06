import { MapPin } from "lucide-react-native";
import { Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

interface TripAbstractProps {
  id: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  startCoords?: { latitude: number; longitude: number };
  endCoords?: { latitude: number; longitude: number };
  routeCoords?: { latitude: number; longitude: number }[]; // 新增
}

export default function TripAbstract({
  id,
  startLocation,
  endLocation,
  startTime,
  endTime,
  startCoords,
  endCoords,
  routeCoords,
}: TripAbstractProps) {
  // 计算地图显示区域
  let initialRegion = undefined;
  if (startCoords && endCoords) {
    const latitude = (startCoords.latitude + endCoords.latitude) / 2;
    const longitude = (startCoords.longitude + endCoords.longitude) / 2;
    const latitudeDelta =
      Math.abs(startCoords.latitude - endCoords.latitude) + 0.01;
    const longitudeDelta =
      Math.abs(startCoords.longitude - endCoords.longitude) + 0.01;
    initialRegion = {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  }

  return (
    <View className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
      <View className="p-2">
        <Text className="text-gray-700">Trip ID:{id}</Text>
      </View>
      {/* Map Thumbnail */}
      <View className="h-32 bg-gray-100">
        {startCoords && endCoords && initialRegion ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={initialRegion}
            pointerEvents="none"
            zoomEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
          >
            <Marker coordinate={startCoords} pinColor="#14b8a6" />
            <Marker coordinate={endCoords} pinColor="#f472b6" />
            {routeCoords && routeCoords.length > 1 && (
              <Polyline
                coordinates={routeCoords}
                strokeColor="#3b82f6" // 蓝色
                strokeWidth={4}
              />
            )}
          </MapView>
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Text className="text-gray-400">Map preview not available</Text>
          </View>
        )}
      </View>

      {/* Trip text info */}
      <View className="p-4">
        <View className="flex-row items-center mb-2">
          <MapPin size={16} color="#14b8a6" />
          <Text className="ml-2 text-gray-700">{startLocation}</Text>
          <Text className="ml-auto text-xs text-gray-500">{startTime}</Text>
        </View>
        <View className="flex-row items-center">
          <MapPin size={16} color="#f472b6" />
          <Text className="ml-2 text-gray-700">{endLocation}</Text>
          <Text className="ml-auto text-xs text-gray-500">{endTime}</Text>
        </View>
      </View>
    </View>
  );
}
