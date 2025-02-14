import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Star } from "lucide-react-native";

const renderBarberInfo = (icon, text) => (
  <View className="flex-row items-center">
    {icon}
    <Text className="ml-2 text-gray-700 font-medium text-sm">{text}</Text>
  </View>
);

export const BarberCard = (barber) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      key={barber.id}
      onPress={() => router.push(`/(root)/${barber.id}`)}
      className="bg-white p-4 rounded-2xl  mb-3"
    >
      <View className="flex-row">
        <Image
          source={{ uri: barber.image }}
          className="w-32 h-32 rounded-2xl"
        />

        <View className="flex-1 ml-4 justify-between">
          <View>
            <Text className="text-xl font-bold text-indigo-900 tracking-tight">
              {barber.name}
            </Text>
            <View className="flex-row items-center mt-1 mb-2">
              <View className="bg-indigo-100 py-1.5 rounded-lg flex-row items-center">
                <Star size={16} color="#4F46E5" fill="#4F46E5" />
                <Text className="ml-1 font-bold text-indigo-700">
                  {barber.rating}
                </Text>
                <Text className="text-indigo-600 ml-1">({barber.reviews})</Text>
              </View>
            </View>
          </View>
          <View className="space-y-2">
            {renderBarberInfo(
              <Feather name="scissors" size={16} color="#4F46E5" />,
              barber.specialty
            )}
            {renderBarberInfo(
              <Feather name="map-pin" size={16} color="#4F46E5" />,
              barber.location
            )}
            {renderBarberInfo(
              <Feather name="clock" size={16} color="#4F46E5" />,
              `${barber.experience} Yıl Deneyim`
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
