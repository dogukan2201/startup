import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Clock, Phone } from "lucide-react-native";
import { STATUS_COLORS } from "@/constants";

const getStatusColor = (status: string) => {
  return STATUS_COLORS[status] || STATUS_COLORS.default;
};

export const renderAppointmentCard = (item) => (
  <TouchableOpacity
    key={item.id}
    className="bg-white rounded-2xl  p-4 mb-4 mt-2 border border-gray-300  "
  >
    <View className="flex-row items-center justify-between mb-3">
      <View className="flex-row items-center space-x-2">
        <View className="bg-indigo-50 p-2 flex-row items-center rounded-xl">
          <Clock size={20} color="#4F46E5" />
          <Text className="text-[#4F46E5] font-semibold text-xl pl-2">
            {item.time}
          </Text>
        </View>
      </View>
      <View
        style={{ backgroundColor: `${getStatusColor(item.status)}15` }}
        className="px-4 py-2 rounded-full"
      >
        <Text
          style={{ color: getStatusColor(item.status) }}
          className="text-xs font-medium"
        >
          {item.status}
        </Text>
      </View>
    </View>

    <View className="pb-3">
      <Text className="text-gray-900 text-xl mb-1 ">{item.customerName}</Text>
    </View>
    <View className="flex-row items-center mb-3">
      <Text className="text-gray-700 text-sm flex-1">
        {item.service.join(" + ")}
      </Text>
    </View>
    <View className="flex-row items-center mb-3 border-b border-gray-200 pb-3"></View>
    <View className="pt-3 flex-row items-center justify-between ">
      <TouchableOpacity
        onPress={() => Linking.openURL(`tel:${item.customerPhone}`)}
        className="flex-row items-center"
      >
        <Phone size={20} color="#4F46E5" />
        <Text className="text-[#4F46E5] ml-2 text-lg font-semibold">
          {item.customerPhone}
        </Text>
      </TouchableOpacity>
      <Text className="text-[#4F46E5] font-bold text-lg">{item.price}₺</Text>
    </View>
  </TouchableOpacity>
);
