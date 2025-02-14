import { View, Text } from "react-native";

export const ProfileInfoItem = ({ icon: Icon, label, value }) => (
  <View className="flex-row items-center mb-4 bg-white p-4 rounded-xl">
    <View className="bg-blue-50 p-2 rounded-lg">
      <Icon size={20} color="#4F46E5" />
    </View>
    <View className="ml-4 flex-1">
      <Text className="text-sm text-gray-500 font-medium">{label}</Text>
      <Text className="text-base text-gray-900 font-semibold mt-1">
        {value || "N/A"}
      </Text>
    </View>
  </View>
);
