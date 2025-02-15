import { View, Text } from "react-native";

export const QuickAccessCard = ({ icon: Icon, title, subtitle }) => (
  <View className="bg-white p-4 rounded-xl w-[48%] border border-gray-100">
    <Icon size={24} color="#4F46E5" className="mb-2" />
    <Text className="font-semibold">{title}</Text>
    <Text className="text-gray-500 text-sm">{subtitle}</Text>
  </View>
);
