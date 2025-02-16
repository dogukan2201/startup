import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { barbers } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

const Presentation = () => {
  const [barberData, setBarberData] = useState({
    name: "",
    image: "",
    experience: "",
    specialty: "",
    workingHours: "",
    location: "",
    phone: "",
    description: "",
    services: [],
    workDays: [],
    rating: 0,
    reviewCount: 0,
  });

  const [newService, setNewService] = useState({ name: "", price: "" });

  const InputField = ({
    label,
    value,
    onChangeText,
    multiline = false,
    icon,
  }) => (
    <View className="mb-6">
      <Text className="text-gray-700 text-base font-medium mb-2">{label}</Text>
      <View className="flex-row items-center border-2 border-gray-100 rounded-2xl bg-white overflow-hidden">
        <View className="p-4 bg-gray-50">
          <Ionicons name={icon} size={20} color="#4F46E5" />
        </View>
        <TextInput
          className="flex-1 p-4 text-base"
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          placeholderTextColor="#9CA3AF"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
          }}
        />
      </View>
    </View>
  );

  const handleSave = () => {
    console.log("Kaydedilen veriler:", barberData);
  };

  const addService = () => {
    if (newService.name && newService.price) {
      setBarberData((prev) => ({
        ...prev,
        services: [...prev.services, newService],
      }));
      setNewService({ name: "", price: "" });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1">
        <View className="relative h-[250px] bg-gradient-to-r from-[#4F46E5] to-[#6366F1]">
          <View className="absolute -bottom-24 w-full px-6">
            <View className="bg-white rounded-3xl p-8 shadow-xl">
              <View className="items-center">
                <View className="relative">
                  <Image
                    source={{
                      uri: barberData.image || "https://placeholder.com/150",
                    }}
                    className="w-28 h-28 rounded-full border-4 border-white mb-3"
                  />
                  <TouchableOpacity className="absolute bottom-2 right-0 bg-[#4F46E5] p-2 rounded-full">
                    <Ionicons name="camera" size={18} color="white" />
                  </TouchableOpacity>
                </View>
                <Text className="text-2xl font-bold text-gray-900 mt-2">
                  {barberData.name || "Berber Adı"}
                </Text>
                <View className="flex-row items-center mt-2 bg-gray-50 px-4 py-2 rounded-full">
                  <Ionicons name="star" size={18} color="#FFB800" />
                  <Text className="ml-1 text-gray-700 font-medium">
                    {barberData.rating} ({barberData.reviewCount} değerlendirme)
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-28 px-6">
          <View className="bg-white rounded-3xl p-6 border-gray-100 mb-6">
            <View className="flex-row items-center mb-6">
              <View className="w-1 h-6 bg-[#4F46E5] rounded-full mr-3" />
              <Text className="text-xl font-bold text-gray-900">
                Temel Bilgiler
              </Text>
            </View>
            <InputField
              label="İsim"
              value={barberData.name}
              onChangeText={(text) =>
                setBarberData((prev) => ({ ...prev, name: text }))
              }
              icon="person"
            />
            <InputField
              label="Deneyim"
              value={barberData.experience}
              onChangeText={(text) =>
                setBarberData((prev) => ({ ...prev, experience: text }))
              }
              icon="time"
            />
            <InputField
              label="Uzmanlık"
              value={barberData.specialty}
              onChangeText={(text) =>
                setBarberData((prev) => ({ ...prev, specialty: text }))
              }
              icon="ribbon"
            />
          </View>

          <View className="bg-white rounded-3xl p-6 border-gray-100 mb-6">
            <View className="flex-row items-center mb-6">
              <View className="w-1 h-6 bg-[#4F46E5] rounded-full mr-3" />
              <Text className="text-xl font-bold text-gray-900">
                İletişim Bilgileri
              </Text>
            </View>
            <InputField
              label="Çalışma Saatleri"
              value={barberData.workingHours}
              onChangeText={(text) =>
                setBarberData((prev) => ({ ...prev, workingHours: text }))
              }
              icon="time"
            />
            <InputField
              label="Konum"
              value={barberData.location}
              onChangeText={(text) =>
                setBarberData((prev) => ({ ...prev, location: text }))
              }
              icon="location"
            />
            <InputField
              label="Telefon"
              value={barberData.phone}
              onChangeText={(text) =>
                setBarberData((prev) => ({ ...prev, phone: text }))
              }
              icon="call"
            />
          </View>

          <View className="bg-white rounded-3xl p-6  mb-6">
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <View className="w-1 h-6 bg-[#4F46E5] rounded-full mr-3" />
                <Text className="text-xl font-bold text-gray-900">
                  Hizmetler ve Fiyatlar
                </Text>
              </View>
            </View>

            {barberData.services.map((service, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center py-4 border-b border-gray-100"
              >
                <View className="flex-row items-center">
                  <View className="w-2 h-2 rounded-full bg-[#4F46E5] mr-3" />
                  <Text className="text-base text-gray-800">
                    {service.name}
                  </Text>
                </View>
                <Text className="text-base font-semibold text-[#4F46E5]">
                  {service.price}₺
                </Text>
              </View>
            ))}

            <View className="flex-row mt-6">
              <TextInput
                className="flex-1 border-2 border-gray-100 rounded-2xl p-4 mr-2 bg-gray-50"
                placeholder="Hizmet Adı"
                value={newService.name}
                onChangeText={(text) =>
                  setNewService((prev) => ({ ...prev, name: text }))
                }
              />
              <TextInput
                className="w-32 border-2 border-gray-100 rounded-2xl p-4 mr-2 bg-gray-50"
                placeholder="Fiyat"
                value={newService.price}
                onChangeText={(text) =>
                  setNewService((prev) => ({ ...prev, price: text }))
                }
                keyboardType="numeric"
              />
              <TouchableOpacity
                onPress={addService}
                className="bg-[#4F46E5] p-4 rounded-2xl"
              >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] py-4 rounded-2xl mb-8 border-gray-100"
            onPress={handleSave}
          >
            <Text className="text-white text-center font-bold text-lg">
              Değişiklikleri Kaydet
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Presentation;
