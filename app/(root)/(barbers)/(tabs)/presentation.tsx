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
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const InputField = ({
  label,
  value,
  onChangeText,
  multiline = false,
  icon,
  placeholder,
  type,
}) => {
  const baseInputStyle = "flex-1 p-4 text-base text-gray-800 bg-gray-50";
  const baseIconContainerStyle =
    "p-4 bg-gray-100 rounded-l-xl border-r border-gray-200";

  const renderInput = () => {
    const commonProps = {
      className: baseInputStyle,
      value,
      placeholder,
      placeholderTextColor: "#9CA3AF",
    };

    if (type === "time") {
      return (
        <TextInput
          {...commonProps}
          onChangeText={onChangeText}
          maxLength={11}
          keyboardType="numbers-and-punctuation"
        />
      );
    }

    if (type === "phone") {
      return (
        <TextInput
          {...commonProps}
          onChangeText={(text) => {
            const numbersOnly = text.replace(/[^0-9]/g, "");
            let formattedNumber = numbersOnly;
            if (numbersOnly.length >= 3) {
              formattedNumber = `${numbersOnly.slice(0, 3)} ${numbersOnly.slice(
                3
              )}`;
            }
            if (numbersOnly.length >= 6) {
              formattedNumber = `${formattedNumber.slice(
                0,
                7
              )} ${numbersOnly.slice(6)}`;
            }
            onChangeText(formattedNumber);
          }}
          maxLength={12}
          keyboardType="phone-pad"
        />
      );
    }

    return (
      <TextInput
        {...commonProps}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    );
  };

  return (
    <View className="mb-6">
      <Text className="text-gray-800 text-base font-semibold mb-2">
        {label}
      </Text>
      <View className="flex-row items-center border border-gray-200 rounded-xl bg-white shadow-sm">
        <View className={baseIconContainerStyle}>
          <Ionicons name={icon} size={22} color="#4F46E5" />
        </View>
        {renderInput()}
      </View>
    </View>
  );
};

const ServiceItem = ({ name, price, onDelete }) => (
  <View className="flex-row justify-between items-center py-4 border-b border-gray-100">
    <View className="flex-row items-center flex-1">
      <View className="w-2.5 h-2.5 rounded-full bg-indigo-600 mr-3" />
      <Text className="text-base text-gray-800 font-medium">{name}</Text>
    </View>
    <Text className="text-base font-semibold text-indigo-600 mr-4">
      {price}₺
    </Text>
    <TouchableOpacity
      onPress={onDelete}
      className="p-2.5 bg-gray-50 rounded-lg"
      activeOpacity={0.7}
    >
      <Ionicons name="trash-outline" size={20} color="#4F46E5" />
    </TouchableOpacity>
  </View>
);

const Presentation = () => {
  const [barberData, setBarberData] = useState({
    name: "Ahmet Berber",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    experience: "15 yıl",
    specialty: "Saç & Sakal Kesimi",
    workingHours: "09:00 - 21:00",
    location: "İstanbul, Kadıköy",
    phone: "0532 123 45 67",
    description: "Profesyonel berber hizmeti",
    services: [
      { name: "Saç Kesimi", price: "100" },
      { name: "Sakal Kesimi", price: "50" },
      { name: "Saç & Sakal", price: "140" },
      { name: "Çocuk Saç Kesimi", price: "70" },
    ],
    workDays: [
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],
    rating: 4.8,
    reviewCount: 127,
  });

  const [newService, setNewService] = useState({ name: "", price: "" });

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

  const deleteService = (index) => {
    setBarberData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const updateBarberData = (field, value) => {
    setBarberData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1">
        <View className="h-[240px] bg-gradient-to-r from-indigo-700 to-indigo-500">
          <View className="absolute -bottom-24 w-full px-5">
            <View className="bg-white rounded-2xl p-7 shadow-xl">
              <View className="items-center">
                <View className="relative">
                  <Image
                    source={{ uri: barberData.image }}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  <TouchableOpacity
                    className="absolute bottom-1 right-1 bg-indigo-600 p-3 rounded-full shadow-lg"
                    activeOpacity={0.8}
                  >
                    <Ionicons name="camera" size={20} color="white" />
                  </TouchableOpacity>
                </View>
                <Text className="text-2xl font-bold text-gray-900 mt-4">
                  {barberData.name}
                </Text>
                <View className="flex-row items-center mt-3 bg-gray-50 px-5 py-2 rounded-full shadow-sm">
                  <Ionicons name="star" size={20} color="#FFB800" />
                  <Text className="ml-2 text-base font-medium text-gray-700">
                    {barberData.rating} ({barberData.reviewCount} değerlendirme)
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-28 px-5 space-y-6">
          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <View className="flex-row items-center mb-6">
              <View className="w-1 h-7 bg-indigo-600 rounded-full mr-3" />
              <Text className="text-xl font-bold text-gray-900">
                Temel Bilgiler
              </Text>
            </View>
            <InputField
              label="İsim"
              value={barberData.name}
              onChangeText={(text) => updateBarberData("name", text)}
              icon="person"
              placeholder="Berber adını giriniz"
              type="text"
            />
            <InputField
              label="Deneyim"
              value={barberData.experience}
              onChangeText={(text) => updateBarberData("experience", text)}
              icon="time"
              placeholder="Deneyim süresini giriniz"
              type="text"
            />
            <InputField
              label="Uzmanlık"
              value={barberData.specialty}
              onChangeText={(text) => updateBarberData("specialty", text)}
              icon="ribbon"
              placeholder="Uzmanlık alanını giriniz"
              type="text"
            />
          </View>

          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <View className="flex-row items-center mb-6">
              <View className="w-1 h-7 bg-indigo-600 rounded-full mr-3" />
              <Text className="text-xl font-bold text-gray-900">
                İletişim Bilgileri
              </Text>
            </View>
            <InputField
              label="Çalışma Saatleri"
              value={barberData.workingHours}
              onChangeText={(text) => updateBarberData("workingHours", text)}
              icon="time"
              placeholder="Örn: 09:00 - 21:00"
              type="time"
            />
            <InputField
              label="Konum"
              value={barberData.location}
              onChangeText={(text) => updateBarberData("location", text)}
              icon="location"
              placeholder="Adres bilgilerini giriniz"
              type="text"
            />
            <InputField
              label="Telefon"
              value={barberData.phone}
              onChangeText={(text) => updateBarberData("phone", text)}
              icon="call"
              placeholder="Telefon numaranızı giriniz"
              type="phone"
            />
          </View>

          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <View className="w-1 h-7 bg-indigo-600 rounded-full mr-3" />
                <Text className="text-xl font-bold text-gray-900">
                  Hizmetler ve Fiyatlar
                </Text>
              </View>
            </View>

            {barberData.services.map((service, index) => (
              <ServiceItem
                key={index}
                {...service}
                onDelete={() => deleteService(index)}
              />
            ))}

            <View className="flex-row mt-5 mb-4">
              <TextInput
                className="flex-1 border border-gray-200 rounded-xl p-4 mr-2 bg-gray-50 text-base"
                placeholder="Hizmet Adı"
                value={newService.name}
                onChangeText={(text) =>
                  setNewService((prev) => ({ ...prev, name: text }))
                }
              />
              <TextInput
                className="w-36 border border-gray-200 rounded-xl p-4 mr-2 bg-gray-50 text-base"
                placeholder="Fiyat"
                value={newService.price}
                onChangeText={(text) =>
                  setNewService((prev) => ({ ...prev, price: text }))
                }
                keyboardType="numeric"
              />
              <TouchableOpacity
                onPress={addService}
                className="bg-indigo-600 p-4 rounded-xl items-center justify-center shadow-sm"
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="bg-indigo-600 py-4 rounded-xl mb-8 mt-4"
            onPress={handleSave}
            activeOpacity={0.8}
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
