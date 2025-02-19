import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Star, Calendar, Users, Clock, Plus } from "lucide-react-native";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { recentCustomers, barberInfo, todaysAppointments } from "@/constants";

const getStatusColor = (status: string) => {
  if (status === "Tamamlandı") return "#10B981";
  if (status === "Devam Ediyor") return "#3B82F6";
  if (status === "Yaklaşan") return "#F59E0B";
  return "#6B7280";
};

const BarberDashboard = () => {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-[#4F46E5]">
      <ScrollView className="flex-1">
        <View className="bg-white">
          <View className="bg-[#4F46E5] px-6 pt-8 pb-12">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/(root)/(barbers)/(tabs)/profile",
                    });
                  }}
                  className="relative"
                >
                  <Image
                    source={{
                      uri: user?.imageUrl || "https://via.placeholder.com/150",
                    }}
                    className="w-24 h-24 rounded-full shadow-lg border-2 border-white"
                  />
                </TouchableOpacity>
                <View className="ml-4">
                  <View>
                    <Text className="text-3xl font-bold text-white mb-2">
                      Hoş Geldiniz,
                    </Text>
                    <Text className="text-xl text-white/90 mb-3">
                      {barberInfo.name}
                    </Text>
                  </View>
                  <View className="flex-row items-center space-x-3">
                    <View className="flex-row items-center bg-white/20 px-3 py-1.5 rounded-full">
                      <Star fill="white" color="white" size={16} />
                      <Text className="ml-1.5 font-semibold text-white">
                        {barberInfo.rating}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Stats Cards */}
          <View className="px-6 -mt-6">
            <View className="flex-row justify-between gap-4">
              <View className="flex-1 bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="bg-indigo-100 w-14 h-14 rounded-2xl items-center justify-center">
                    <Calendar size={28} color="#4F46E5" />
                  </View>
                  <View className="flex-row items-baseline">
                    <Text className="text-4xl font-bold text-[#4F46E5]">
                      {barberInfo.todayAppointments}
                    </Text>
                    <Text className="text-gray-700 text-sm font-medium ml-1">
                      Adet
                    </Text>
                  </View>
                </View>

                <Text className="text-gray-700 text-sm font-medium">
                  Bugünkü Randevu
                </Text>
              </View>
              <View className="flex-1 bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="bg-indigo-100 w-14 h-14 rounded-2xl items-center justify-center">
                    <Users size={28} color="#4F46E5" />
                  </View>
                  <View className="flex-row items-baseline">
                    <Text className="text-4xl font-bold text-[#4F46E5]">
                      {barberInfo.totalCustomers}
                    </Text>
                    <Text className="text-gray-700 text-sm font-medium ml-1">
                      Adet
                    </Text>
                  </View>
                </View>
                <Text className="text-gray-700 text-sm font-medium">
                  Toplam Müşteri
                </Text>
              </View>
            </View>
          </View>

          {/* Appointments Section */}
          <View className="px-6 mt-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-md font-bold text-[#4F46E5] bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
                Günün Programı
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(root)/(barbers)/(tabs)/appointment")
                }
              >
                <Text className="text-indigo-600 font-semibold">
                  Tümünü Gör
                </Text>
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
                      backgroundColor: `${getStatusColor(
                        appointment.status
                      )}20`,
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
          </View>

          {/* Recent Customers Section */}
          <View className="px-6 mt-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-md font-bold text-[#4F46E5] bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
                Son Müşteriler
              </Text>
              <TouchableOpacity>
                <Text className="text-indigo-600 font-semibold">
                  Tümünü Gör
                </Text>
              </TouchableOpacity>
            </View>
            <View className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
              {recentCustomers.map((customer, index) => (
                <TouchableOpacity
                  key={index}
                  className="p-4 flex-row items-center"
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: customer.image }}
                    className="w-12 h-12 rounded-full bg-gray-200"
                  />
                  <View className="ml-4 flex-1">
                    <Text className="font-semibold text-gray-900">
                      {customer.name}
                    </Text>
                    <Text className="text-indigo-600 text-sm">
                      {customer.visits} ziyaret
                    </Text>
                  </View>
                  <Text className="text-gray-500 text-sm">
                    {customer.lastVisit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View className="px-6 py-8 space-y-3">
            <TouchableOpacity
              onPress={() =>
                router.push("/(root)/(barbers)/(tabs)/appointment")
              }
              className="bg-indigo-600 py-4 px-6 rounded-xl flex-row items-center justify-center"
            >
              <Calendar size={20} color="white" className="mr-2" />
              <Text className="text-white font-semibold ml-2">
                Programı Görüntüle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white border border-indigo-600 py-4 px-6 rounded-xl flex-row items-center justify-center mt-2">
              <Plus size={20} color="#4F46E5" className="mr-2" />
              <Text className="text-indigo-600 font-semibold ml-2">
                Yeni Müşteri Ekle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BarberDashboard;
