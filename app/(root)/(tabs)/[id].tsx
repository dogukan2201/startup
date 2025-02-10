import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { barbers } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

type ParamList = {
  id: string;
};

const BarberShowInfo = () => {
  const { id } = useLocalSearchParams<ParamList>();
  const berber = barbers.find((b) => b.id === Number(id));

  if (!berber) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Ionicons name="alert-circle" size={64} color="#FF3B30" />
        <Text className="text-xl font-semibold mt-4">Berber Bulunamadı</Text>
        <Text className="text-gray-500 mt-2">
          Lütfen daha sonra tekrar deneyin
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="relative">
          <Image source={{ uri: berber.image }} className="w-full h-[350px]" />
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        </View>

        <View className="bg-white rounded-t-3xl -mt-6 p-6 shadow-sm">
          <View className="flex-row justify-between items-center">
            <Text className="text-3xl font-bold text-gray-800">
              {berber.name}
            </Text>
            <View className="bg-[#4F46E5]/10 px-3 py-1 rounded-full">
              <Text className="text-[#4F46E5] font-medium">Müsait</Text>
            </View>
          </View>

          <View className="flex-row items-center mt-4">
            <Ionicons name="star" size={20} color="#4F46E5" />
            <Text className="text-base font-semibold ml-1">
              {berber.rating}
            </Text>
            <Text className="text-gray-500 ml-1">
              ({berber.reviews} değerlendirme)
            </Text>
          </View>

          <View className="mt-6 space-y-4">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={24} color="#4F46E5" />
              <View className="ml-3">
                <Text className="text-base font-semibold text-gray-800">
                  Deneyim
                </Text>
                <Text className="text-gray-600">{berber.experience} yıl</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="medal-outline" size={24} color="#4F46E5" />
              <View className="ml-3">
                <Text className="text-base font-semibold text-gray-800">
                  Uzmanlık
                </Text>
                <Text className="text-gray-600">{berber.specialty}</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={24} color="#4F46E5" />
              <View className="ml-3">
                <Text className="text-base font-semibold text-gray-800">
                  Çalışma Saatleri
                </Text>
                <Text className="text-gray-600">
                  {berber.workingHours.start} - {berber.workingHours.end}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={24} color="#4F46E5" />
              <View className="ml-3">
                <Text className="text-base font-semibold text-gray-800">
                  Konum
                </Text>
                <Text className="text-gray-600">{berber.location}</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="call-outline" size={24} color="#4F46E5" />
              <TouchableOpacity
                className="ml-3"
                onPress={() => Linking.openURL(`tel:${berber.phone}`)}
              >
                <Text className="text-base font-semibold text-gray-800">
                  İletişim
                </Text>
                <Text className="text-gray-600">{berber.phone}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Hakkında
            </Text>
            <Text className="text-base text-gray-700 leading-6">
              {berber.description}
            </Text>
          </View>

          <View className="mt-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Hizmetler ve Fiyatlar
            </Text>
            {berber.services?.map((service, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center mb-3"
              >
                <Text className="text-base font-semibold text-[#4F46E5]">
                  {service.name} - {service.price}₺
                </Text>
              </View>
            ))}
          </View>

          <View className="mt-6 mb-24">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Çalışma Günleri
            </Text>
            {berber.workDays?.map((day, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                <Text className="text-base text-gray-700 ml-2">{day}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <TouchableOpacity className="bg-[#4F46E5] py-4 rounded-xl">
            <Text className="text-white text-center font-bold text-lg">
              Randevu Al
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default BarberShowInfo;
