import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg" {...props}>
      <Text className="text-white text-center font-medium">{title}</Text>
    </TouchableOpacity>
  );
} 