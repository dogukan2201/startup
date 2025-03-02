import { Clock } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { todaysAppointments } from "@/constants";
import { router } from "expo-router";
import Tittle from "../../Tittle";

const getStatusColor = (status: string) => {
  const statusColors: { [key: string]: string } = {
    Tamamlandı: "#10B981",
    "Devam Ediyor": "#3B82F6",
    Yaklaşan: "#F59E0B",
  };
  return statusColors[status] || "#6B7280";
};

const DailyProgram = () => {
  return (
    <>
      <View className="flex-row items-center justify-between mb-4">
        <Tittle title="Günün Programı" />
        <TouchableOpacity
          onPress={() => router.push("/(root)/(barbers)/(tabs)/appointment")}
        >
          <Text className="text-indigo-600 font-semibold">Tümünü Gör</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
        {todaysAppointments.map((appointment, index) => (
          <View
            key={index}
            className="p-4 flex-row items-center justify-between"
          >
            <View className="flex-row items-center flex-1">
              <View className="bg-indigo-50 w-10 h-10 rounded-full items-center justify-center">
                <Clock size={18} color="#4F46E5" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-semibold text-gray-900">
                  {appointment.customerName}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {appointment.time} • {appointment.service}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: `${getStatusColor(appointment.status)}20`,
              }}
              className="px-3 py-1 rounded-full"
            >
              <Text
                style={{ color: getStatusColor(appointment.status) }}
                className="text-sm font-medium"
              >
                {appointment.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

export default DailyProgram;
