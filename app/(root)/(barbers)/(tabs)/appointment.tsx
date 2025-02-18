import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
  StatusBar,
  TextInput,
  Modal,
  Linking,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-native-calendars";
import {
  Clock,
  Phone,
  Banknote,
  FileText,
  ChevronDown,
  ChevronUp,
  Calendar as CalendarIcon,
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Plus,
} from "lucide-react-native";
import { APPOINTMENTS } from "@/constants";

const STATUS_COLORS = {
  Tamamlandı: "#10B981",
  "Devam Ediyor": "#3B82F6",
  Yaklaşan: "#F59E0B",
  default: "#6B7280",
};

const STATUS_OPTIONS = ["Tümü", "Yaklaşan", "Devam Ediyor", "Tamamlandı"];
const TIME_FILTERS = ["Tümü", "Öğleden Önce", "Öğleden Sonra"];
const PRICE_FILTERS = ["Tümü", "0-100₺", "100-200₺", "200₺+"];
const SERVICE_FILTERS = [
  "Tümü",
  "Saç Kesimi",
  "Sakal Tıraşı",
  "Saç Boyama",
  "Cilt Bakımı",
];

const getStatusColor = (status: string) => {
  return STATUS_COLORS[status] || STATUS_COLORS.default;
};

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

  const saveAppointment = (newAppointment) => {
    setAppointments((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newAppointment],
    }));
  };

  const updateAppointmentStatus = (date, id, newStatus) => {
    setAppointments((prev) => {
      const updatedAppointments = { ...prev };
      const appointmentIndex = updatedAppointments[date].findIndex(
        (app) => app.id === id
      );
      if (appointmentIndex !== -1) {
        updatedAppointments[date][appointmentIndex].status = newStatus;
      }
      return updatedAppointments;
    });
  };

  const filterAppointments = (appointments) => {
    return appointments.filter((app) => {
      if (timeFilter !== "Tümü") {
        const hour = parseInt(app.time.split(":")[0]);
        if (timeFilter === "Öğleden Önce" && hour >= 12) return false;
        if (timeFilter === "Öğleden Sonra" && hour < 12) return false;
      }

      if (priceFilter !== "Tümü") {
        const price = parseInt(app.price);
        if (priceFilter === "0-100₺" && price > 100) return false;
        if (priceFilter === "100-200₺" && (price <= 100 || price > 200))
          return false;
        if (priceFilter === "200₺+" && price <= 200) return false;
      }

      if (serviceFilter !== "Tümü" && !app.service.includes(serviceFilter)) {
        return false;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          app.customerName.toLowerCase().includes(query) ||
          app.customerPhone.includes(query) ||
          app.service.some((s) => s.toLowerCase().includes(query))
        );
      }

      return true;
    });
  };

  const renderEmptyState = (
    title: string,
    description: string,
    showButton = false
  ) => (
    <View className="flex-1 items-center justify-center p-8">
      <View className="bg-gray-50 rounded-2xl p-8 w-full items-center">
        <CalendarIcon size={64} color="#9CA3AF" />
        <Text className="text-gray-800 text-xl font-semibold mt-6 text-center">
          {title}
        </Text>
        <Text className="text-gray-500 text-center mt-2 leading-5">
          {description}
        </Text>
        {showButton && (
          <TouchableOpacity className="mt-6 bg-indigo-600 px-6 py-3 rounded-xl">
            <Text className="text-white font-medium">Yeni Randevu Ekle</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderAppointmentCard = (item) => (
    <TouchableOpacity
      key={item.id}
      className="bg-white rounded-2xl shadow-sm p-5 mb-4 border border-gray-100"
      onLongPress={() => {
        const newStatus =
          item.status === "Yaklaşan" ? "Tamamlandı" : "Yaklaşan";
        updateAppointmentStatus(selectedDate, item.id, newStatus);
      }}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center space-x-2">
          <View className="bg-indigo-50 p-2 rounded-lg">
            <Clock size={20} color="#4F46E5" />
          </View>
          <Text className="text-gray-900 font-semibold pl-2 text-lg">
            {item.time}
          </Text>
        </View>
        <View
          style={{ backgroundColor: `${getStatusColor(item.status)}15` }}
          className="px-4 py-2 rounded-full"
        >
          <Text
            style={{ color: getStatusColor(item.status) }}
            className="text-sm font-medium"
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View className="border-b border-gray-100 pb-3">
        <Text className="text-gray-900 font-bold text-lg mb-1">
          {item.customerName}
        </Text>
        <View className="flex-row items-center">
          <Phone size={14} color="#6B7280" />
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${item.customerPhone}`)}
          >
            <Text className="text-gray-600 ml-2">{item.customerPhone}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="pt-3">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-gray-800 font-medium">
            {item.service.join(" + ")}
          </Text>
          <View className="flex-row items-center bg-emerald-50 px-3 py-1.5 rounded-lg">
            <Banknote size={14} color="#059669" />
            <Text className="text-emerald-700 font-semibold ml-1.5">
              {item.price}₺
            </Text>
          </View>
        </View>

        {item.notes && (
          <View className="bg-gray-50 p-3 rounded-xl">
            <View className="flex-row items-center mb-1">
              <FileText size={14} color="#4B5563" />
              <Text className="text-gray-700 font-medium ml-2">Notlar</Text>
            </View>
            <Text className="text-gray-600 ml-6">{item.notes}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

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

  const resetFilters = () => {
    setTimeFilter("Tümü");
    setPriceFilter("Tümü");
    setServiceFilter("Tümü");
  };

  const renderFilterButton = (
    filter: string,
    selectedFilter: string,
    onPress: () => void
  ) => (
    <TouchableOpacity
      key={filter}
      onPress={onPress}
      className={`py-2 px-4 rounded-full border ${
        selectedFilter === filter
          ? "bg-indigo-600 border-indigo-600"
          : "border-gray-200"
      }`}
    >
      <Text
        className={selectedFilter === filter ? "text-white" : "text-gray-700"}
      >
        {filter}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="bg-white">
        <View className="p-6 flex-row items-center justify-between bg-white ">
          <View>
            <Text className="text-4xl font-semibold text-[#4F46E5]">
              Randevular
            </Text>
            <Text className="text-gray-600 mt-1 text-sm font-semibold">
              Günlük randevu takibi
            </Text>
          </View>
          <TouchableOpacity
            className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm "
            onPress={() => setShowFilterModal(true)}
          >
            <View className="flex-row items-center space-x-2">
              <SlidersHorizontal size={22} color="#4F46E5" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="px-4">
          <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
            <Search size={24} color="#4F46E5" />
            <TextInput
              placeholder="Müşteri adı, telefon veya hizmet ara..."
              className="flex-1 ml-2 text-gray-900"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View className="p-4 flex-row space-x-4">
          <TouchableOpacity
            onPress={toggleCalendar}
            className="flex-1 flex-row items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-200"
          >
            <View className="flex-row items-center">
              <CalendarIcon size={24} color="#4F46E5" />
              <Text className="text-[#4F46E5] text-lg font-semibold ml-2">
                {formatDate(selectedDate)}
              </Text>
            </View>
            {showCalendar ? (
              <ChevronUp size={20} color="#4F46E5" />
            ) : (
              <ChevronDown size={20} color="#4F46E5" />
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 pb-4"
        >
          {STATUS_OPTIONS.map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setSelectedStatus(status)}
              className={`px-5 py-2.5 rounded-xl border mr-3 ${
                selectedStatus === status
                  ? "bg-indigo-600 border-indigo-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedStatus === status ? "text-white" : "text-gray-700"
                }`}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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

      <TouchableOpacity className="absolute bottom-6 right-6 bg-[#4F46E5] w-14 h-14 rounded-full items-center justify-center ">
        <Plus color="#fff" size={32} />
      </TouchableOpacity>

      <Modal visible={showFilterModal} transparent={true} animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white rounded-2xl w-11/12 max-h-[80%]">
            <View className="p-4 border-b border-gray-100 flex-row justify-between items-center">
              <Text className="text-3xl font-bold text-[#4F46E5]">
                Filtrele
              </Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <X size={24} color="#4F46E5" />
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              <View className="space-y-4">
                <View>
                  <Text className="text-gray-700 font-medium mb-2">Zaman</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {TIME_FILTERS.map((filter) =>
                      renderFilterButton(filter, timeFilter, () =>
                        setTimeFilter(filter)
                      )
                    )}
                  </View>
                </View>

                <View>
                  <Text className="text-gray-700 font-medium mb-2 mt-2">
                    Fiyat
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {PRICE_FILTERS.map((filter) =>
                      renderFilterButton(filter, priceFilter, () =>
                        setPriceFilter(filter)
                      )
                    )}
                  </View>
                </View>

                <View>
                  <Text className="text-gray-700 font-medium mb-2 mt-2">
                    Hizmet
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {SERVICE_FILTERS.map((filter) =>
                      renderFilterButton(filter, serviceFilter, () =>
                        setServiceFilter(filter)
                      )
                    )}
                  </View>
                </View>
              </View>

              <View className="flex-col space-x-4 mt-6">
                <TouchableOpacity
                  onPress={() => setShowFilterModal(false)}
                  className="flex-1 p-3 rounded-xl bg-[#4F46E5]"
                >
                  <Text className="text-white text-center font-medium">
                    Uygula
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={resetFilters}
                  className="flex-1 p-3 rounded-xl border-[#4F46E5] mt-2"
                >
                  <Text className="text-[#4F46E5] font-bold text-center">
                    Sıfırla
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Appointment;
