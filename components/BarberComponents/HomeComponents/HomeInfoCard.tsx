import React from "react";
import { View, Text } from "react-native";
import { Calendar, Users } from "lucide-react-native";

interface HomeInfoCardProps {
  todayAppointments?: number;
  totalCustomers?: number;
}

const HomeInfoCard: React.FC<HomeInfoCardProps> = ({
  todayAppointments,
  totalCustomers,
}) => {
  const isAppointmentCard = Boolean(todayAppointments);

  const getIcon = () => (
    <View className="bg-indigo-100 w-14 h-14 rounded-2xl items-center justify-center">
      {isAppointmentCard ? (
        <Calendar size={28} color="#4F46E5" />
      ) : (
        <Users size={28} color="#4F46E5" />
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-3">
        {getIcon()}
        <View className="flex-row items-baseline">
          <Text className="text-4xl font-bold text-[#4F46E5]">
            {isAppointmentCard ? todayAppointments : totalCustomers}
            <Text className="text-gray-700 text-sm font-medium ml-8 mr-2">
              Adet
            </Text>
          </Text>
        </View>
      </View>

      <Text className="text-gray-700 text-sm font-medium">
        {isAppointmentCard ? "Bugünkü Randevu" : "Toplam Müşteri"}
      </Text>
    </View>
  );
};

export default HomeInfoCard;
