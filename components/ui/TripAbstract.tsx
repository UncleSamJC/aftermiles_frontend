import { MapPin } from 'lucide-react-native';
import { Image, Text, View } from 'react-native';

interface TripAbstractProps {
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  mapThumbnail?: string;
}

export default function TripAbstract({
  startLocation,
  endLocation,
  startTime,
  endTime,
  mapThumbnail
}: TripAbstractProps) {
  return (
    <View className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
      {/* Map Thumbnail */}
      <View className="h-32 bg-gray-100">
        {mapThumbnail ? (
          <Image 
            source={{ uri: mapThumbnail }} 
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Text className="text-gray-400">Map preview not available</Text>
          </View>
        )}
      </View>
      
      {/* Trip Details */}
      <View className="p-4">
        <View className="flex-row items-center mb-2">
          <MapPin size={16} color="#666" />
          <Text className="ml-2 text-gray-700">{startLocation}</Text>
        </View>
        <View className="flex-row items-center">
          <MapPin size={16} color="#666" />
          <Text className="ml-2 text-gray-700">{endLocation}</Text>
        </View>
        <Text className="text-sm text-gray-500 mt-2">
          {startTime} - {endTime}
        </Text>
      </View>
    </View>
  );
} 