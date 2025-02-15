import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { AlertCircle } from "lucide-react-native";

export const MenuButton = ({
  icon: Icon,
  title,
  onPress,
  color = "#4F46E5",
  danger = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center p-4 bg-white rounded-xl mb-2 `}
    activeOpacity={0.7}
  >
    <View className={`p-2 rounded-lg ${danger ? "bg-red-50" : "bg-blue-50"}`}>
      <Icon size={20} color={danger ? "#EF4444" : color} />
    </View>
    <Text
      className={`flex-1 ml-4 font-medium ${
        danger ? "text-red-600" : "text-gray-900"
      }`}
    >
      {title}
    </Text>
    <AlertCircle size={18} color="#9CA3AF" />
  </TouchableOpacity>
);
