import { TouchableOpacity, Text } from "react-native";

export const CategoryButton = ({ category, isSelected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`mr-4 px-6 py-3 rounded-full ${
      isSelected ? "bg-indigo-600" : "bg-gray-200"
    }`}
  >
    <Text
      className={`font-semibold ${isSelected ? "text-white" : "text-gray-700"}`}
    >
      {category.name}
    </Text>
  </TouchableOpacity>
);
