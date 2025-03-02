import React from "react";
import { TouchableOpacity, View, Image, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Star } from "lucide-react-native";

const renderBarberInfo = (icon, text) => (
  <View className="flex-row items-center py-1">
    {icon}
    <Text
      className="ml-2 text-gray-600 font-medium text-[13px]"
      numberOfLines={2}
      ellipsizeMode="tail"
    >
      {text}
    </Text>
  </View>
);
export const BarberCard = (barber) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      key={barber.id}
      onPress={() => router.push(`/(root)/${barber.id}`)}
      className="bg-white p-4 rounded-2xl mb-2 mt-2"
    >
      <View className="flex-row">
        <Image
          source={{ uri: barber.image }}
          className="w-28 h-28 rounded-2xl"
        />

        <View className="flex-1 ml-4 justify-between pl-2">
          <View>
            <View className="flex-row items-center ">
              <Text className="text-xl font-semibold text-indigo-900 tracking-tight">
                {barber.name}
              </Text>
              <View className="py-1.5 rounded-lg flex-row items-center ml-2">
                <View className="flex-row items-center">
                  <Star fill="#4F46E5" color="#4F46E5" size={16} />
                  <Text className="ml-1 font-semibold color-[#4F46E5]">
                    {barber.rating}
                  </Text>
                </View>
                <Text className="text-indigo-600 ml-1">({barber.reviews})</Text>
              </View>
            </View>
            <View className="space-y-2">
              {renderBarberInfo(
                <Feather name="map-pin" size={16} color="#4F46E5" />,
                barber.location.district + ", " + barber.location.city
              )}
              {renderBarberInfo(
                <Feather name="clock" size={16} color="#4F46E5" />,
                `${barber.experience} Yıl Deneyim`
              )}
              {renderBarberInfo(
                <Feather name="scissors" size={16} color="#4F46E5" />,
                barber.specialty.map((s) => s).join(", ")
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
