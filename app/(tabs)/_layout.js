import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="index" options={{}} />
    </Stack>
  );
}
