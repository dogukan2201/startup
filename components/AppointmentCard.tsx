import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Clock } from "lucide-react-native";

export const AppointmentCard = () => (
  <View className="bg-white rounded-2xl p-6 mb-8 border border-gray-100">
    <Text className="text-xl font-semibold mb-3">Yaklaşan Randevunuz</Text>
    <View className="flex-row items-center space-x-3 mb-2">
      <Clock size={20} color="#4B5563" />
      <Text className="text-gray-600 text-base pl-2">
        Randevunuz Bulunmamaktadır
      </Text>
    </View>
    <TouchableOpacity
      className="mt-3 bg-indigo-600 py-4 px-4 rounded-xl"
      onPress={() => router.push("/(root)/(tabs)/barbers")}
      activeOpacity={0.7}
    >
      <Text className="text-white text-center font-semibold">
        Hemen Randevu Al
      </Text>
    </TouchableOpacity>
  </View>
);
