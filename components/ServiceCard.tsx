import { TouchableOpacity, View, Text } from "react-native";
import { Scissors } from "lucide-react-native";

export const ServiceCard = ({ service }) => (
  <TouchableOpacity
    key={service}
    className="w-[48%] bg-white rounded-xl p-5 mb-4 border border-gray-100"
  >
    <View className="bg-indigo-100 w-10 h-10 rounded-full mb-3 items-center justify-center">
      <Scissors size={20} color="#4F46E5" />
    </View>
    <Text className="font-semibold text-base mb-1">{service}</Text>
    <Text className="text-gray-500 text-sm">Detaylar için tıklayın</Text>
  </TouchableOpacity>
);
