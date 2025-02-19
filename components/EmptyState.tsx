import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "lucide-react-native";

export const renderEmptyState = (
  title: string,
  description: string,
  showButton = false
) => (
  <View className="flex-1 items-center justify-center p-8">
    <View className="p-8 w-full items-center">
      <Calendar size={64} color="#9CA3AF" />
      <Text className="text-gray-800 text-xl font-semibold mt-6 text-center">
        {title}
      </Text>
      <Text className="text-gray-500 text-center mt-2 leading-5">
        {description}
      </Text>
      {showButton && (
        <TouchableOpacity className="mt-6 bg-indigo-600 px-6 py-3 rounded-xl">
          <Text className="text-white font-medium">Yeni Randevu Ekle</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);
