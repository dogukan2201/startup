import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Providers = ({ navigation }: { navigation: any }) => {
  return (
    <View className="mt-8 mx-6">
      <View className="flex-row items-center justify-center mb-8">
        <Text className="mx-4 text-gray-500 text-md font-medium">
          ────── Or Continue With ──────
        </Text>
      </View>
      <View className="flex-row justify-center space-x-6">
        <TouchableOpacity className="w-[64] h-[64] rounded-[16] bg-white items-center justify-center elevation-1">
          <View className="items-center justify-center">
            <Ionicons name="logo-google" size={32} color="#EA4335" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="w-[64] h-[64] rounded-[16] bg-white items-center justify-center elevation-1">
          <View className="items-center justify-center">
            <Ionicons name="logo-facebook" size={32} color="#1877F2" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Providers;
