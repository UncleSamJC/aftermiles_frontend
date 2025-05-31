import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";



// CardHeader 组件
interface CardHeaderProps {
     title: string;
     bgColor?: string;
     onClose?: () => void;
     rightContent?: React.ReactNode;
     titleClassName?: string;
   }
   
   const CardHeader = ({ title, bgColor = "bg-purple-200", onClose, rightContent, titleClassName = "" }: CardHeaderProps) => (
     <View className={`${bgColor} px-4 py-3 rounded-t-xl border-b border-purple-100 flex-row justify-between items-center`}>
       <Text className={`text-lg font-semibold text-white ${titleClassName}`}>
         {title}
       </Text>
       {rightContent || (onClose && (
         <Pressable onPress={onClose} className="p-1">
           <Ionicons name="close" size={20} color="#fff" />
         </Pressable>
       ))}
     </View>
   );

   export default CardHeader; 