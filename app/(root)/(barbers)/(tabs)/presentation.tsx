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
import { Star } from "lucide-react-native";
import DatePicker from "react-native-modal-datetime-picker";

const InputField = ({
  label,
  value,
  onChangeText,
  multiline = false,
  icon,
  placeholder,
  type,
  onPress = () => {},
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
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <View className={baseInputStyle}>
            <Text className="text-gray-800">{value || placeholder}</Text>
          </View>
        </TouchableOpacity>
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

    if (type === "number") {
      return (
        <TextInput
          {...commonProps}
          onChangeText={(text) => {
            const numbersOnly = text.replace(/[^0-9]/g, "");
            onChangeText(numbersOnly);
          }}
          keyboardType="numeric"
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
    <View className="mb-4">
      <Text className="text-gray-800 text-sm font-medium mb-1.5">{label}</Text>
      <View className="flex-row items-center border border-gray-200 rounded-xl bg-white">
        <View className={baseIconContainerStyle}>
          <Ionicons name={icon} size={20} color="#4F46E5" />
        </View>
        {renderInput()}
      </View>
    </View>
  );
};

const ServiceItem = ({ name, price, onDelete }) => (
  <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
    <View className="flex-row items-center flex-1">
      <View className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mr-3" />
      <Text className="text-base text-gray-800 font-medium">{name}</Text>
    </View>
    <Text className="text-base font-semibold text-[#4F46E5] mr-3">
      {price}₺
    </Text>
    <TouchableOpacity onPress={onDelete} className="p-2" activeOpacity={0.7}>
      <Ionicons name="trash-outline" size={18} color="#4F46E5" />
    </TouchableOpacity>
  </View>
);

const Presentation = () => {
  const [barberData, setBarberData] = useState({
    name: "Ahmet Berber",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    experience: "15",
    specialty: "Saç & Sakal Kesimi",
    workingHoursStart: "09:00",
    workingHoursEnd: "21:00",
    city: "İstanbul",
    district: "Kadıköy",
    address: "Caferağa Mah. Moda Cad. No:123",
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

  const days = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];

  const [newService, setNewService] = useState({ name: "", price: "" });
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const handleSave = () => {
    console.log("Kaydedilen veriler:", barberData);
  };

  const addService = () => {
    if (newService.name && newService.price) {
      if (barberData.services.find((s) => s.name === newService.name)) {
        alert("Bu hizmet zaten ekli.");
        setNewService({ name: "", price: "" });
        return;
      }
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

  const toggleWorkDay = (day) => {
    setBarberData((prev) => {
      const newWorkDays = prev.workDays.includes(day)
        ? prev.workDays.filter((d) => d !== day)
        : [...prev.workDays, day];
      return { ...prev, workDays: newWorkDays };
    });
  };

  const updateBarberData = (field, value) => {
    setBarberData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStartTimeConfirm = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    updateBarberData("workingHoursStart", `${hours}:${minutes}`);
    setStartTimePickerVisible(false);
  };

  const handleEndTimeConfirm = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    updateBarberData("workingHoursEnd", `${hours}:${minutes}`);
    setEndTimePickerVisible(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" />
      <ScrollView className="flex-1">
        <View className="h-[220px] bg-[#4F46E5]">
          <View className="absolute mt-8 w-full px-4">
            <View className="bg-white p-6  rounded-2xl">
              <View className="items-center">
                <View className="relative">
                  <Image
                    source={{ uri: barberData.image }}
                    className="w-32 h-32 rounded-full border-4 border-white "
                  />
                  <TouchableOpacity
                    className="absolute bottom-1 right-1 bg-[#4F46E5] p-2.5 rounded-full "
                    activeOpacity={0.8}
                    onPress={() => console.log("Select image from your album")}
                  >
                    <Ionicons name="camera" size={18} color="white" />
                  </TouchableOpacity>
                </View>
                <Text className="text-xl font-bold text-gray-900 mt-3">
                  {barberData.name}
                </Text>
                <View className="flex-row items-center mt-2 bg-gray-50 px-4 py-1.5 rounded-full">
                  <Star size={20} color="#4F46E5" fill="#4F46E5" />
                  <Text className="ml-1.5 text-sm font-medium text-gray-700">
                    {barberData.rating} ({barberData.reviewCount} Değerlendirme)
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-8 px-4 space-y-4">
          <View className=" p-5 rounded-xl  mt-4">
            <View className="flex-row items-center mb-4">
              <Text className="text-xl font-bold text-[#4F46E5]">
                Temel Bilgiler
              </Text>
            </View>

            <InputField
              label="İşletme ya da Şahsi İsim"
              value={barberData.name}
              onChangeText={(text) => updateBarberData("name", text)}
              icon="person"
              placeholder="Dükkan ya da şahsi isminizi giriniz"
              type="text"
            />
            <InputField
              label="Deneyim (Yıl)"
              value={barberData.experience}
              onChangeText={(text) => updateBarberData("experience", text)}
              icon="time"
              placeholder="Deneyim yılını giriniz"
              type="number"
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

          <View className="p-5 rounded-xl">
            <View className="flex-row items-center mb-4">
              <Text className="text-xl font-bold text-[#4F46E5]">
                Çalışma Günleri
              </Text>
            </View>
            <View className="flex-row flex-wrap justify-between">
              {days.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleWorkDay(day)}
                  className={`w-[48%] mb-3 p-3 rounded-xl border ${
                    barberData.workDays?.includes(day)
                      ? "bg-indigo-50 border-indigo-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <View className="flex-row items-center justify-between">
                    <Text
                      className={`text-base ${
                        barberData.workDays?.includes(day)
                          ? "text-[#4F46E5] font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {day}
                    </Text>
                    <Ionicons
                      name={
                        barberData.workDays?.includes(day)
                          ? "checkmark-circle"
                          : "close-circle"
                      }
                      size={20}
                      color={
                        barberData.workDays?.includes(day)
                          ? "#4F46E5"
                          : "#9CA3AF"
                      }
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="p-5">
            <View className="flex-row items-center mb-4">
              <Text className="text-xl font-bold text-[#4F46E5]">
                İletişim Bilgileri
              </Text>
            </View>
            <View className="flex-row gap-2">
              <View className="flex-1">
                <InputField
                  label="Başlangıç Saati"
                  value={barberData.workingHoursStart}
                  onPress={() => setStartTimePickerVisible(true)}
                  icon="time"
                  placeholder="09:00"
                  type="time"
                  onChangeText={() => {}}
                />
                <DatePicker
                  isVisible={isStartTimePickerVisible}
                  mode="time"
                  onConfirm={handleStartTimeConfirm}
                  onCancel={() => setStartTimePickerVisible(false)}
                  locale="tr"
                />
              </View>
              <View className="flex-1">
                <InputField
                  label="Bitiş Saati"
                  value={barberData.workingHoursEnd}
                  onPress={() => setEndTimePickerVisible(true)}
                  icon="time"
                  placeholder="21:00"
                  type="time"
                  onChangeText={() => {}}
                />
                <DatePicker
                  isVisible={isEndTimePickerVisible}
                  mode="time"
                  onConfirm={handleEndTimeConfirm}
                  onCancel={() => setEndTimePickerVisible(false)}
                  locale="tr"
                />
              </View>
            </View>
            <InputField
              label="Şehir"
              value={barberData.city}
              onChangeText={(text) => updateBarberData("city", text)}
              icon="location"
              placeholder="Şehir giriniz"
              type="text"
            />
            <InputField
              label="İlçe"
              value={barberData.district}
              onChangeText={(text) => updateBarberData("district", text)}
              icon="location"
              placeholder="İlçe giriniz"
              type="text"
            />
            <InputField
              label="Adres"
              value={barberData.address}
              onChangeText={(text) => updateBarberData("address", text)}
              icon="location"
              placeholder="Açık adres giriniz"
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

          <View className="p-5">
            <View className="flex-row items-center mb-4">
              <Text className="text-xl font-bold text-[#4F46E5]">
                Hizmetler ve Fiyatlar
              </Text>
            </View>
            <View>
              {barberData.services.map((service, index) => (
                <ServiceItem
                  key={index}
                  {...service}
                  onDelete={() => deleteService(index)}
                />
              ))}
            </View>

            <View className="flex-row mt-4">
              <TextInput
                className="flex-1 border border-gray-200 rounded-xl p-3 mr-2 bg-gray-50 text-sm"
                placeholder="Hizmet Adı"
                value={newService.name}
                onChangeText={(text) =>
                  setNewService((prev) => ({ ...prev, name: text }))
                }
              />
              <TextInput
                className="w-28 border border-gray-200 rounded-xl p-3 mr-2 bg-gray-50 text-sm"
                placeholder="Fiyat"
                value={newService.price}
                onChangeText={(text) =>
                  setNewService((prev) => ({ ...prev, price: text }))
                }
                keyboardType="numeric"
              />
              <TouchableOpacity
                onPress={addService}
                className="bg-[#4F46E5] p-3 rounded-full items-center justify-center"
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="bg-[#4F46E5] py-4 rounded-xl mb-4 mt-2"
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text className="text-white text-center font-semibold text-base">
              Değişiklikleri Kaydet
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Presentation;
