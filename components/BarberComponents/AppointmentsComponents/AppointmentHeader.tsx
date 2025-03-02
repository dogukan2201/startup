import { View, Text, TouchableOpacity } from "react-native";
import { SlidersHorizontal } from "lucide-react-native";

export const AppointmentHeader = ({ onFilterPress }) => (
  <View className="p-6 flex-row items-center justify-between bg-white">
    <View>
      <Text className="text-4xl font-bold text-[#4F46E5]">Randevular</Text>
      <Text className="text-gray-600 mt-1 text-sm font-semibold">
        Günlük randevu takibi
      </Text>
    </View>
    <TouchableOpacity onPress={onFilterPress}>
      <View className="flex-row items-center space-x-2">
        <SlidersHorizontal size={28} color="#4F46E5" />
      </View>
    </TouchableOpacity>
  </View>
);
