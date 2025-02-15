import { router } from "expo-router";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { Star, MapPin, Clock, Scissors } from "lucide-react-native";

export const PopulerBarberCard = ({ barber }) => (
  <TouchableOpacity
    key={barber.id}
    onPress={() => router.push(`/(root)/${barber.id}`)}
    style={{ marginRight: 16 }}
    activeOpacity={0.7}
  >
    <View>
      <View className="rounded-xl overflow-hidden border border-gray-100">
        <View className="relative">
          <Image
            source={{ uri: barber.image }}
            className="rounded-2xl"
            width={120}
            height={120}
            resizeMode="cover"
          />
        </View>
      </View>

      <View className="p-3">
        <Text className="font-bold text-base text-gray-900 mb-1">
          {barber.name}
        </Text>

        <View className="flex-row items-center mb-1">
          <MapPin size={12} color="#6B7280" />
          <Text className="ml-1 text-xs text-gray-500">
            {barber.location.city}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Star size={12} color="#4F46E5" fill="#4F46E5" />
          <Text className="ml-1 font-semibold text-[#4F46E5]">
            {barber.rating}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
