import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import type { Service, AppointmentProps } from "../types/type";

const DEFAULT_WORKING_HOURS = {
  start: "09:00",
  end: "22:30",
};

const Appointment = ({ isVisible, onClose, barber = {} }: AppointmentProps) => {
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const formatDate = (date: dayjs.Dayjs | null) => {
    if (!date) return "Tarih seçmek için tıklayın";
    return date.format("DD/MM/YYYY");
  };

  const resetForm = () => {
    setSelectedDateTime(dayjs());
    setSelectedServices([]);
    setSelectedTime(null);
  };

  const handleServiceSelection = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime((prev) => (prev === time ? null : time));
  };

  const handleAppointmentConfirmation = () => {
    Alert.alert(
      "Randevu Onayı",
      `Randevu bilgileriniz:
      
Seçilen Hizmetler: ${selectedServices.join(", ")}
Tarih: ${formatDate(selectedDateTime)}
Saat: ${selectedTime}

Onaylıyor musunuz?`,
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Onayla",
          onPress: () => {
            Alert.alert("Başarılı", "Randevu talebiniz başarıyla oluşturuldu!");
            resetForm();
            onClose();
          },
        },
      ]
    );
  };

  const generateTimeSlots = () => {
    const slots: string[] = [];
    const {
      start = DEFAULT_WORKING_HOURS.start,
      end = DEFAULT_WORKING_HOURS.end,
    } = barber?.workingHours || {};

    let currentTime = dayjs(`2025-01-01 ${start}`);
    const endTime = dayjs(`2025-01-01 ${end}`);

    while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
      slots.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(30, "minute");
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  const isAppointmentValid =
    selectedDateTime && selectedTime && selectedServices.length > 0;

  const renderServiceItem = (service: Service, index: number) => {
    const isSelected = selectedServices.includes(service.name);
    return (
      <TouchableOpacity
        key={index}
        className={`p-4 mb-4 border rounded-xl ${
          isSelected ? "bg-[#4F46E5] border-gray-200" : "border-gray-200"
        }`}
        onPress={() => handleServiceSelection(service.name)}
      >
        <View className="flex-row justify-between items-center">
          <Text
            className={`text-base font-medium ${
              isSelected ? "text-white" : "text-gray-800"
            }`}
          >
            {service.name}
          </Text>
          <Text
            className={`text-base font-medium ${
              isSelected ? "text-white" : "text-gray-800"
            }`}
          >
            {service.price}₺
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTimeSlot = (time: string, index: number) => {
    const isSelected = selectedTime === time;
    return (
      <TouchableOpacity
        key={index}
        className={`w-[48%] px-2 py-3 border rounded-xl mb-2 border-gray-200 ${
          isSelected && "bg-[#4F46E5]"
        }`}
        onPress={() => handleTimeSelection(time)}
      >
        <Text
          className={`text-center text-base font-medium ${
            isSelected ? "text-white" : "text-gray-800"
          }`}
        >
          {time}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <SafeAreaView className="flex-1 bg-black/50 justify-center">
        <View className="bg-white rounded-t-4xl p-6 h-full">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-800">
              Randevu Bilgileri
            </Text>
            <TouchableOpacity
              onPress={() => {
                onClose();
                resetForm();
              }}
            >
              <Ionicons name="close" size={24} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={true}>
            <View className="space-y-6">
              <View>
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                  Hizmet Seçin
                </Text>
                <View className="space-y-2">
                  {barber?.services?.map(renderServiceItem)}
                </View>
              </View>

              <View>
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                  Tarih Seçin
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="p-4 mb-4 border rounded-xl flex-row items-center justify-between border-gray-200"
                >
                  <View className="flex-row items-center space-x-3">
                    <View className="w-10 h-10 bg-[#4F46E5]/10 rounded-full items-center justify-center">
                      <Ionicons name="calendar" size={20} color="#4F46E5" />
                    </View>
                    <Text
                      className={`text-base ${
                        selectedDateTime
                          ? "text-[#4F46E5] font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {formatDate(selectedDateTime)}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={selectedDateTime ? "#4F46E5" : "#9CA3AF"}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                  Saat Seçin
                </Text>
                <View className="flex-row flex-wrap justify-between ">
                  {timeSlots.map(renderTimeSlot)}
                </View>
              </View>
            </View>
          </ScrollView>

          <View className="flex-row justify-between border-t-4 border-gray-900">
            <TouchableOpacity
              className={`py-4 rounded-xl mt-4 w-[48%] self-center ${
                isAppointmentValid ? "bg-[#4F46E5]" : "bg-gray-300 opacity-50"
              }`}
              onPress={handleAppointmentConfirmation}
              disabled={!isAppointmentValid}
            >
              <Text
                className={`text-center font-bold text-lg ${
                  isAppointmentValid ? "text-white" : "text-gray-500"
                }`}
              >
                Randevuyu Onayla
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-4 rounded-xl mt-4"
              onPress={resetForm}
            >
              <Text className="text-center font-bold text-lg text-[#4F46E5]">
                Temizle
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={showDatePicker}
            animationType="slide"
            transparent={true}
          >
            <View className="flex-1 bg-black/50 justify-end items-center mb-8">
              <View className="bg-white p-4 w-full">
                <DateTimePicker
                  mode="single"
                  date={selectedDateTime.toDate()}
                  onChange={(params) => setSelectedDateTime(dayjs(params.date))}
                  minDate={dayjs().subtract(1, "day").toDate()}
                  selectedItemColor="#4F46E5"
                  selectedTextStyle={{ color: "white" }}
                  calendarTextStyle={{ color: "#374151" }}
                  headerTextStyle={{ color: "#4F46E5" }}
                  headerButtonColor="#4F46E5"
                  locale="tr"
                  todayTextStyle={{ color: "black" }}
                />
                <TouchableOpacity
                  className="mt-4 bg-[#4F46E5] py-4 rounded-xl"
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text className="text-white text-center font-bold text-lg">
                    Kapat
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Appointment;
