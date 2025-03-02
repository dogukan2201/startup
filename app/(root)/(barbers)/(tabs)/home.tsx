import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { barberInfo } from "@/constants";
import HomeInfoCard from "@/components/BarberComponents/HomeComponents/HomeInfoCard";
import DailyProgram from "@/components/BarberComponents/HomeComponents/DailyProgram";
import HomeHeader from "@/components/BarberComponents/HomeComponents/HomeHeader";
import HomeActionButtons from "@/components/BarberComponents/HomeComponents/HomeActionButtons";

const BarberDashboard = () => {
  const { user } = useUser();
  const todayAppointments = barberInfo.todayAppointments;
  const totalCustomers = barberInfo.totalCustomers;
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View>
          <HomeHeader barberInfo={barberInfo} />

          <View className="px-6 mt-8">
            <View className="flex-row justify-between gap-4">
              <HomeInfoCard todayAppointments={todayAppointments} />
              <HomeInfoCard totalCustomers={totalCustomers} />
            </View>
          </View>

          <View className="px-6 mt-8">
            <DailyProgram />
          </View>

          <View className="px-6 py-8 space-y-3">
            <HomeActionButtons />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BarberDashboard;
