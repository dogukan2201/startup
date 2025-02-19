import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-native-calendars";
import { Plus } from "lucide-react-native";
import { APPOINTMENTS } from "@/constants";
import AppointmentFilterModal from "@/components/AppointmentCalendar";
import { renderEmptyState } from "@/components/EmptyState";
import { renderFilterButton } from "@/components/RenderFilterButton";
import { renderAppointmentCard } from "@/components/RenderAppointmentCard";

//Bileşen importları
import { AppointmentHeader } from "@/components/AppointmentHeader";
import { AppointmentSearch } from "@/components/AppointmentSearch";
import { DateSelector } from "@/components/DateSelector";
import { StatusFilter } from "@/components/StatusFilter";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [appointments, setAppointments] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [timeFilter, setTimeFilter] = useState("Tümü");
  const [priceFilter, setPriceFilter] = useState("Tümü");
  const [serviceFilter, setServiceFilter] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const calendarHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadAppointments();
  }, []);

  const toggleCalendar = () => {
    const toValue = showCalendar ? 0 : 350;
    Animated.timing(calendarHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setShowCalendar(!showCalendar);
  };

  const loadAppointments = () => {
    const formattedAppointments = APPOINTMENTS.reduce((acc, appointment) => {
      const { date } = appointment;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(appointment);
      return acc;
    }, {});
    setAppointments(formattedAppointments);
  };

  const filterAppointments = (appointments) => {
    return appointments.filter((app) => {
      const isTimeMatch =
        timeFilter === "Tümü" ||
        (timeFilter === "Öğleden Önce"
          ? parseInt(app.time) < 12
          : parseInt(app.time) >= 12);

      const price = parseInt(app.price);
      const isPriceMatch =
        priceFilter === "Tümü" ||
        (priceFilter === "0-100₺"
          ? price <= 100
          : priceFilter === "100-200₺"
          ? price > 100 && price <= 200
          : price > 200);

      const isServiceMatch =
        serviceFilter === "Tümü" || app.service.includes(serviceFilter);

      const isSearchMatch =
        !searchQuery ||
        app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.customerPhone.includes(searchQuery) ||
        app.service.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return isTimeMatch && isPriceMatch && isServiceMatch && isSearchMatch;
    });
  };

  const renderAppointments = () => {
    const dayAppointments = appointments[selectedDate] || [];

    let filteredAppointments =
      selectedStatus === "Tümü"
        ? dayAppointments
        : dayAppointments.filter((app) => app.status === selectedStatus);

    filteredAppointments = filterAppointments(filteredAppointments);

    if (dayAppointments.length === 0) {
      return renderEmptyState(
        "Randevu Bulunamadı",
        "Bu tarih için planlanmış randevu bulunmuyor. Yeni randevu eklemek için aşağıdaki butonu kullanabilirsiniz.",
        true
      );
    }

    if (filteredAppointments.length === 0) {
      return renderEmptyState(
        "Seçili Kriterlerde Randevu Yok",
        "Seçili filtreler için randevu bulunmuyor. Farklı filtreler seçerek diğer randevuları görüntüleyebilirsiniz."
      );
    }

    return (
      <View className="px-4">
        {filteredAppointments.map(renderAppointmentCard)}
      </View>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Bugün";
    if (date.toDateString() === tomorrow.toDateString()) return "Yarın";

    return date.toLocaleDateString("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View>
        <AppointmentHeader onFilterPress={() => setShowFilterModal(true)} />

        <AppointmentSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <DateSelector
          selectedDate={selectedDate}
          showCalendar={showCalendar}
          toggleCalendar={toggleCalendar}
          formatDate={formatDate}
        />

        <StatusFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </View>

      <Animated.View style={{ height: calendarHeight, overflow: "hidden" }}>
        <Calendar
          current={selectedDate}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            toggleCalendar();
          }}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#4F46E5" },
            ...Object.keys(appointments).reduce(
              (acc, date) => ({
                ...acc,
                [date]: { marked: true, dotColor: "#4F46E5" },
              }),
              {}
            ),
          }}
          theme={{
            todayTextColor: "#4F46E5",
            arrowColor: "#4F46E5",
            textDayFontFamily: "System",
            textMonthFontFamily: "System",
            textDayHeaderFontFamily: "System",
            selectedDayBackgroundColor: "#4F46E5",
            selectedDayTextColor: "#ffffff",
          }}
        />
      </Animated.View>

      <ScrollView className="flex-1">{renderAppointments()}</ScrollView>

      <TouchableOpacity className="absolute bottom-6 right-6 bg-[#4F46E5] w-14 h-14 rounded-full items-center justify-center">
        <Plus color="white" size={32} />
      </TouchableOpacity>

      <AppointmentFilterModal
        visible={showFilterModal}
        onDismiss={() => setShowFilterModal(false)}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
      />
    </SafeAreaView>
  );
};

export default Appointment;
