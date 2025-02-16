import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Clock,
  User,
  Scissors,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import { MONTHS, APPOINTMENTS, APPOINTMENTS_FILTERS } from "@/constants";
const WEEK_DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

const STATUS_COLORS: { [key: string]: string } = {
  Tamamlandı: "#10B981",
  "Devam Ediyor": "#3B82F6",
  Yaklaşan: "#F59E0B",
  DEFAULT: "#6B7280",
};

const AppointmentSystem = () => {
  const [selectedDate, setSelectedDate] = useState("12 Mart 2024");
  const [selectedFilter, setSelectedFilter] = useState("Tümü");
  const [currentMonth, setCurrentMonth] = useState("Mart 2024");
  const [currentWeekStart, setCurrentWeekStart] = useState(11);

  const getStatusColor = useCallback((status) => {
    return STATUS_COLORS[status] || STATUS_COLORS.DEFAULT;
  }, []);

  const handlePrevMonth = useCallback(() => {
    const [month, year] = currentMonth.split(" ");
    const monthIndex = MONTHS.indexOf(month);

    if (monthIndex === 0) {
      setCurrentMonth(`${MONTHS[11]} ${parseInt(year) - 1}`);
    } else {
      setCurrentMonth(`${MONTHS[monthIndex - 1]} ${year}`);
    }
    setCurrentWeekStart(1);
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    const [month, year] = currentMonth.split(" ");
    const monthIndex = MONTHS.indexOf(month);

    if (monthIndex === 11) {
      setCurrentMonth(`${MONTHS[0]} ${parseInt(year) + 1}`);
    } else {
      setCurrentMonth(`${MONTHS[monthIndex + 1]} ${year}`);
    }
    setCurrentWeekStart(1);
  }, [currentMonth]);

  const handleDateSelect = useCallback(
    (day) => {
      const [month, year] = currentMonth.split(" ");
      setSelectedDate(`${day} ${month} ${year}`);
    },
    [currentMonth]
  );

  const handleAppointmentPress = useCallback((appointment) => {
    Alert.alert(
      "Randevu Detayları",
      `${appointment.customerName}\n${appointment.time} - ${appointment.service}`,
      [
        { text: "Kapat" },
        {
          text: "Düzenle",
          onPress: () => console.log("Edit appointment", appointment.id),
        },
      ]
    );
  }, []);

  const filteredAppointments = useMemo(() => {
    return APPOINTMENTS.filter((appointment) => {
      if (selectedFilter === "Tümü") return appointment.date === selectedDate;
      return (
        appointment.status === selectedFilter &&
        appointment.date === selectedDate
      );
    });
  }, [selectedDate, selectedFilter]);

  const renderAppointmentCard = useCallback(
    ({ appointment }) => (
      <TouchableOpacity
        key={appointment.id}
        onPress={() => handleAppointmentPress(appointment)}
        activeOpacity={0.7}
        className="bg-white mx-4 my-3 rounded-2xl p-5 border border-gray-100"
      >
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Clock size={18} color="#4B5563" />
            <Text className="text-lg font-semibold text-gray-900 ml-2">
              {appointment.time}
            </Text>
          </View>
          <View
            className="px-4 py-2 rounded-full"
            style={{
              backgroundColor: `${getStatusColor(appointment.status)}20`,
            }}
          >
            <Text
              style={{ color: getStatusColor(appointment.status) }}
              className="font-medium"
            >
              {appointment.status}
            </Text>
          </View>
        </View>

        <View className="space-y-3 border-t border-gray-100 pt-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <User size={16} color="#6B7280" />
              <Text className="text-gray-700 ml-2 text-base font-medium">
                {appointment.customerName}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Phone size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2 text-sm">
                {appointment.customerPhone}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Scissors size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2 text-base">
                {appointment.service}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-600 ml-2 text-base font-medium">
                {appointment.price}
              </Text>
            </View>
          </View>

          <View className="bg-gray-50 p-3 rounded-lg">
            <Text className="text-gray-500 text-sm">
              Not: {appointment.notes}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [handleAppointmentPress, getStatusColor]
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 py-6 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Günlük Randevular
        </Text>

        <View className="flex-row items-center justify-between mt-4">
          <TouchableOpacity onPress={handlePrevMonth}>
            <ChevronLeft size={24} color="#4B5563" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-700">
            {currentMonth}
          </Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <ChevronRight size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mt-4">
          {WEEK_DAYS.map((day, index) => (
            <View key={index} className="items-center">
              <Text className="text-gray-500 text-sm mb-2">{day}</Text>
              <TouchableOpacity
                onPress={() => handleDateSelect(currentWeekStart + index)}
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  selectedDate.startsWith((currentWeekStart + index).toString())
                    ? "bg-indigo-600"
                    : "bg-gray-100"
                }`}
              >
                <Text
                  className={`${
                    selectedDate.startsWith(
                      (currentWeekStart + index).toString()
                    )
                      ? "text-white"
                      : "text-gray-700"
                  } font-medium`}
                >
                  {currentWeekStart + index}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 -mb-2"
        >
          {APPOINTMENTS_FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              className={`mr-2 px-4 py-2 rounded-full ${
                selectedFilter === filter ? "bg-indigo-600" : "bg-gray-100"
              }`}
            >
              <Text
                className={`${
                  selectedFilter === filter ? "text-white" : "text-gray-700"
                } font-medium`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1">
        {filteredAppointments.map((appointment) =>
          renderAppointmentCard({ appointment })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentSystem;
