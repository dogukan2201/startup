import { TouchableOpacity, Text } from "react-native";

export const renderFilterButton = (
  filter: string,
  selectedFilter: string,
  onPress: () => void
) => (
  <TouchableOpacity
    key={filter}
    onPress={onPress}
    className={`py-2 px-4 mr-2 mb-2 rounded-full border ${
      selectedFilter === filter
        ? "bg-indigo-600 border-indigo-600"
        : "border-gray-200"
    }`}
  >
    <Text
      className={selectedFilter === filter ? "text-white" : "text-gray-700"}
    >
      {filter}
    </Text>
  </TouchableOpacity>
);
