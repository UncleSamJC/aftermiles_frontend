import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="myprofile" />
      <Stack.Screen name="myvehicle" />
      <Stack.Screen name="data-export" />
      <Stack.Screen name="refer-friend" />
      <Stack.Screen name="hotspot" />
      <Stack.Screen name="places" />
      <Stack.Screen name="not-work" />
      <Stack.Screen name="expenses" />
      <Stack.Screen name="help" />
    </Stack>
  );
} 