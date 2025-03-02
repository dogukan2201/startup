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
        className={`px-3 py-1 rounded-full  mr-2 ${
          selectedStatus === status ? "bg-indigo-600 " : "bg-white "
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
