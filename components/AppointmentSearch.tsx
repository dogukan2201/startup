import { View, TextInput } from "react-native";
import { Search } from "lucide-react-native";

export const AppointmentSearch = ({ searchQuery, setSearchQuery }) => (
  <View className="px-4">
    <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
      <Search size={24} color="#4F46E5" />
      <TextInput
        placeholder="Müşteri adı, telefon veya hizmet ara..."
        className="flex-1 ml-2 text-gray-900"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  </View>
);
