import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Star, Calendar, Users, Clock, Plus } from "lucide-react-native";
import { useUser } from "@clerk/clerk-expo";

import { router } from "expo-router";

const barberInfo = {
  name: "Ahmet Yılmaz",
  rating: 4.8,
  totalCustomers: 128,
  todayAppointments: 8,
  imageUrl: "https://via.placeholder.com/150",
};

const todaysAppointments = [
  {
    time: "09:00",
    customerName: "Mehmet Kaya",
    service: "Saç Kesimi + Sakal",
    status: "Tamamlandı",
  },
  {
    time: "10:00",
    customerName: "Ali Demir",
    service: "Saç Kesimi",
    status: "Tamamlandı",
  },
  {
    time: "11:30",
    customerName: "Mustafa Çelik",
    service: "Sakal Düzeltme",
    status: "Devam Ediyor",
  },
  {
    time: "14:00",
    customerName: "Kerem Can",
    service: "Sıcak Havlu Tıraşı",
    status: "Yaklaşan",
  },
];

const recentCustomers = [
  {
    name: "Mehmet Kaya",
    visits: 12,
    lastVisit: "2 gün önce",
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Ali Demir",
    visits: 8,
    lastVisit: "1 hafta önce",
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Mustafa Çelik",
    visits: 5,
    lastVisit: "2 hafta önce",
    image: "https://via.placeholder.com/50",
  },
];

const getStatusColor = (status: string) => {
  if (status === "Tamamlandı") return "#10B981";
  if (status === "Devam Ediyor") return "#3B82F6";
  if (status === "Yaklaşan") return "#F59E0B";
  return "#6B7280";
};

const BarberDashboard = () => {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="bg-[#4F46E5] px-6 pt-8 pb-12">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => router.push("/(root)/(barbers)/profile")}
                className="relative"
              >
                <Image
                  source={{
                    uri: user?.imageUrl || "https://via.placeholder.com/150",
                  }}
                  className="w-20 h-20 rounded-full shadow-lg border-2 border-white"
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
            <View className="flex-1 bg-white p-4 rounded-2xl shadow-sm">
              <View className="bg-indigo-50 w-10 h-10 rounded-full items-center justify-center mb-2">
                <Calendar size={20} color="#4F46E5" />
              </View>
              <Text className="text-2xl font-bold">
                {barberInfo.todayAppointments}
              </Text>
              <Text className="text-gray-600 text-sm">Bugünkü Randevu</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-2xl shadow-sm">
              <View className="bg-indigo-50 w-10 h-10 rounded-full items-center justify-center mb-2">
                <Users size={20} color="#4F46E5" />
              </View>
              <Text className="text-2xl font-bold">
                {barberInfo.totalCustomers}
              </Text>
              <Text className="text-gray-600 text-sm">Toplam Müşteri</Text>
            </View>
          </View>
        </View>

        {/* Appointments Section */}
        <View className="px-6 mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Günün Programı
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push("/(root)/(barbers)/(tabs)/appointment")
              }
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
        </View>

        {/* Recent Customers Section */}
        <View className="px-6 mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Son Müşteriler
            </Text>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-semibold">Tümünü Gör</Text>
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
            onPress={() => router.push("/(root)/(barbers)/(tabs)/appointment")}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default BarberDashboard;
