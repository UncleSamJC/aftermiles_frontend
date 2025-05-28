import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="vehicle" />
      <Stack.Screen name="data-export" />
      <Stack.Screen name="refer" />
      <Stack.Screen name="hotspot" />
      <Stack.Screen name="places" />
      <Stack.Screen name="not-work" />
      <Stack.Screen name="transactions" />
      <Stack.Screen name="help" />
    </Stack>
  );
} 