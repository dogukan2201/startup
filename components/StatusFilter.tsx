import { TouchableOpacity, Text } from "react-native";
import { ScrollView } from "react-native";
import { STATUS_OPTIONS } from "@/constants";

export const StatusFilter = ({ selectedStatus, setSelectedStatus }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="px-4 pb-4"
  >
    {STATUS_OPTIONS.map((status) => (
      <TouchableOpacity
        key={status}
        onPress={() => setSelectedStatus(status)}
        className={`px-4 py-2 rounded-full border mr-2 ${
          selectedStatus === status
            ? "bg-indigo-600 border-indigo-600"
            : "bg-white border-gray-200"
        }`}
      >
        <Text
          className={`text-sm font-medium ${
            selectedStatus === status ? "text-white" : "text-gray-700"
          }`}
        >
          {status}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);
