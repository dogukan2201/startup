import { Animated } from "react-native";
import { APPOINTMENTS } from "@/constants"; // Veri kaynağınızın yolunu düzeltmeniz gerekebilir

export const toggleCalendar = (
  calendarHeight: Animated.Value,
  showCalendar: boolean,
  setShowCalendar: (show: boolean) => void
) => {
  const toValue = showCalendar ? 0 : 350;
  Animated.timing(calendarHeight, {
    toValue,
    duration: 300,
    useNativeDriver: false,
  }).start();
  setShowCalendar(!showCalendar);
};

export const loadAppointments = (
  setAppointments: (appointments: any) => void
) => {
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

export const filterAppointments = (
  appointments: any[],
  timeFilter: string,
  priceFilter: string,
  serviceFilter: string,
  searchQuery: string
) => {
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

export const formatDate = (dateString: string) => {
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
