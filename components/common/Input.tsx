import { TextInput, TextInputProps } from 'react-native';

export function Input(props: TextInputProps) {
  return (
    <TextInput
      className="border border-gray-300 rounded-lg px-4 py-2"
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
} 