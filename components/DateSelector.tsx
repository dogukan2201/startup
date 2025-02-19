import { View, Text, TouchableOpacity } from "react-native";
import { CalendarIcon, ChevronUp, ChevronDown } from "lucide-react-native";

export const DateSelector = ({
  selectedDate,
  showCalendar,
  toggleCalendar,
  formatDate,
}) => (
  <View className="p-4 flex-row space-x-4">
    <TouchableOpacity
      onPress={toggleCalendar}
      className="flex-1 flex-row items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-200"
    >
      <View className="flex-row items-center">
        <CalendarIcon size={24} color="#4F46E5" />
        <Text className="text-[#4F46E5] text-lg font-semibold ml-2">
          {formatDate(selectedDate)}
        </Text>
      </View>
      {showCalendar ? (
        <ChevronUp size={20} color="#4F46E5" />
      ) : (
        <ChevronDown size={20} color="#4F46E5" />
      )}
    </TouchableOpacity>
  </View>
);
