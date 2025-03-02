import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const HomeHeader = ({ barberInfo }) => {
  return (
    <View className="bg-[#6C63FF] px-4 pt-14 pb-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center">
            <Ionicons name="person-outline" size={18} color="white" />
          </View>
          <View>
            <Text className="text-[#6C63FF] text-sm">Hoş Geldiniz,</Text>
            <Text className="text-[#6C63FF] text-lg font-semibold">
              {barberInfo?.name || "Misafir"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(root)/(barbers)/(tabs)/notifications")}
        >
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
