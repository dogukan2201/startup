import { router, Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomerLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(customer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Berber Bilgileri",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back-circle-outline"
                size={36}
                color="#4F46E5"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
