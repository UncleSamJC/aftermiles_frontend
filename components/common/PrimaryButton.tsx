import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

export function PrimaryButton({ 
  title, 
  variant = 'primary',
  className = '',
  loading = false,
  disabled,
  ...props 
}: PrimaryButtonProps) {
  const baseStyle = "w-full rounded-1xl py-4 px-6";
  const variantStyle = variant === 'primary' 
    ? "bg-teal-500" 
    : "bg-white border border-gray-200";
  const textStyle = variant === 'primary'
    ? "text-white"
    : "text-gray-900";

  return (
    <TouchableOpacity 
      className={`${baseStyle} ${variantStyle} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#10B981'} />
      ) : (
        <Text className={`${textStyle} text-center text-lg font-semibold`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
} 