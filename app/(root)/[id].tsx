import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { barbers } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Star } from "lucide-react-native";
import Appointment from "@/components/Appointment";
import { days } from "@/constants";
const BarberShowInfo = () => {
  const { id } = useLocalSearchParams();
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const barber = barbers.find((b) => b.id === Number(id));

  const Info = ({ attribute, description, icon }) => (
    <View className="flex-row items-center">
      <Ionicons name={icon} size={24} color="#4F46E5" />
      <View className="ml-3">
        <Text className="text-base font-semibold text-gray-800">
          {description}
        </Text>
        <Text className="text-gray-600">{barber?.[attribute]?.toString()}</Text>
      </View>
    </View>
  );

  if (!barber) {
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
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="relative">
          <Image source={{ uri: barber.image }} className="w-full h-[350px]" />
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        </View>

        <View className="bg-white rounded-t-3xl -mt-6 p-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-3xl font-bold text-gray-800">
              {barber.name}
            </Text>
            <View className="bg-[#4F46E5]/10 px-3 py-1 rounded-full">
              <Text className="text-[#4F46E5] font-medium">Müsait</Text>
            </View>
          </View>
          <View className="flex-row items-center mt-4">
            <Star size={20} color="#4F46E5" fill={"#4F46E5"} />
            <Text className="font-semibold text-[#4F46E5] text-xl  ml-1">
              {barber.rating}
            </Text>
            <Text className="text-gray-500 ml-1">
              ({barber.reviews} değerlendirme)
            </Text>
          </View>

          <TouchableOpacity
            className="bg-[#4F46E5] py-4 rounded-xl mt-4"
            onPress={() => setShowAppointmentModal(true)}
          >
            <Text className="text-white text-center font-bold text-lg">
              Randevu Al
            </Text>
          </TouchableOpacity>

          <View className="mt-6 space-y-4">
            <Info
              attribute="experience"
              description="Deneyim"
              icon="time-outline"
            />
            <Info
              attribute="specialty"
              description="Uzmanlık"
              icon="medal-outline"
            />
            <Info
              attribute="workingHours"
              description="Çalışma Saatleri"
              icon="calendar-outline"
            />
            <Info
              attribute="location"
              description="Konum"
              icon="location-outline"
            />

            <View className="flex-row items-center">
              <Ionicons name="call-outline" size={24} color="#4F46E5" />
              <TouchableOpacity
                className="ml-3"
                onPress={() => Linking.openURL(`tel:${barber.phone}`)}
              >
                <Text className="text-base font-semibold text-gray-800">
                  İletişim
                </Text>
                <Text className="text-gray-600">{barber.phone}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Hakkında
            </Text>
            <Text className="text-base text-gray-700 leading-6">
              {barber.description}
            </Text>
          </View>

          <View className="mt-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Hizmetler ve Fiyatlar
            </Text>
            {barber.services?.map((service, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center py-3 border-b border-gray-100"
              >
                <Text className="text-base text-gray-800">{service.name}</Text>
                <Text className="text-base font-medium text-indigo-600">
                  {service.price}₺
                </Text>
              </View>
            ))}
          </View>

          <View className="mt-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Çalışma Günleri
            </Text>
            {days.map((day, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <Ionicons
                  name={
                    barber.workDays?.includes(day)
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  size={20}
                  color={barber.workDays?.includes(day) ? "#4F46E5" : "#9CA3AF"}
                />
                <Text className="text-base text-gray-700 ml-2">{day}</Text>
              </View>
            ))}
          </View>
        </View>
        <Appointment
          isVisible={showAppointmentModal}
          onClose={() => setShowAppointmentModal(false)}
          barber={barber}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BarberShowInfo;
