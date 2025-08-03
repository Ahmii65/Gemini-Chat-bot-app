import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ animation: "slide_from_left" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="Chat"
        options={{
          headerShown: true,
          title: "Chat with Gemini",
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 15,
          },
        }}
      />
    </Stack>
  );
}
