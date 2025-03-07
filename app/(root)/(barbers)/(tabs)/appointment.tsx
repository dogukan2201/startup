import React, { useState, useEffect, useRef } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
  StatusBar,
} from "react-native";
import CreateAppointment from "@/components/BarberComponents/AppointmentsComponents/CreateAppointment";
import { Calendar } from "react-native-calendars";
import { Plus } from "lucide-react-native";
import AppointmentFilterModal from "@/components/BarberComponents/AppointmentsComponents/AppointmentCalendar";
import { renderEmptyState } from "@/components/BarberComponents/AppointmentsComponents/EmptyState";
import { renderAppointmentCard } from "@/components/BarberComponents/AppointmentsComponents/RenderAppointmentCard";
import { AppointmentHeader } from "@/components/BarberComponents/AppointmentsComponents/AppointmentHeader";
import { AppointmentSearch } from "@/components/BarberComponents/AppointmentsComponents/AppointmentSearch";
import { DateSelector } from "@/components/BarberComponents/AppointmentsComponents/DateSelector";
import { StatusFilter } from "@/components/BarberComponents/AppointmentsComponents/StatusFilter";
import {
  toggleCalendar,
  loadAppointments,
  filterAppointments,
  formatDate,
} from "@/components/BarberComponents/AppointmentsComponents/Helpers";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appointments, setAppointments] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [filters, setFilters] = useState({
    time: "Tümü",
    price: "Tümü",
    service: "Tümü",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const calendarHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadAppointments(setAppointments);
  }, []);

  const renderAppointments = () => {
    const dayAppointments = appointments[selectedDate] || [];

    let filteredAppointments =
      selectedStatus === "Tümü"
        ? dayAppointments
        : dayAppointments.filter((app) => app.status === selectedStatus);

    filteredAppointments = filterAppointments(
      filteredAppointments,
      filters.time,
      filters.price,
      filters.service,
      searchQuery
    );

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
          toggleCalendar={() =>
            toggleCalendar(calendarHeight, showCalendar, setShowCalendar)
          }
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
            toggleCalendar(calendarHeight, showCalendar, setShowCalendar);
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

      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="absolute bottom-6 right-6 bg-[#4F46E5] w-14 h-14 rounded-full items-center justify-center"
      >
        <Plus color="white" size={32} />
      </TouchableOpacity>
      <CreateAppointment
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <AppointmentFilterModal
        visible={showFilterModal}
        onDismiss={() => setShowFilterModal(false)}
        timeFilter={filters.time}
        setTimeFilter={(time) => setFilters((prev) => ({ ...prev, time }))}
        priceFilter={filters.price}
        setPriceFilter={(price) => setFilters((prev) => ({ ...prev, price }))}
        serviceFilter={filters.service}
        setServiceFilter={(service) =>
          setFilters((prev) => ({ ...prev, service }))
        }
      />
    </SafeAreaView>
  );
};

export default Appointment;
