import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Calendar, Plus } from "lucide-react-native";
import { router } from "expo-router";

const ActionButton = ({ onPress, style, icon: Icon, iconColor, text }) => (
  <TouchableOpacity onPress={onPress} className={style}>
    <Icon size={20} color={iconColor} className="mr-2" />
    <Text className="font-semibold ml-2">{text}</Text>
  </TouchableOpacity>
);

const HomeActionButtons = () => {
  return (
    <View>
      <ActionButton
        onPress={() => router.push("/(root)/(barbers)/(tabs)/appointment")}
        style="bg-indigo-600 py-4 px-6 rounded-xl flex-row items-center justify-center"
        icon={Calendar}
        iconColor="white"
        text={<Text className="text-white">Programı Görüntüle</Text>}
      />
      <ActionButton
        onPress={() => router.push("/(root)/(barbers)/(tabs)/add-customer")}
        style="bg-white border border-gray-300 py-4 px-6 rounded-xl flex-row items-center justify-center mt-2"
        icon={Plus}
        iconColor="#4F46E5"
        text={<Text className="text-[#4F46E5]">Yeni Müşteri Ekle</Text>}
      />
    </View>
  );
};

export default HomeActionButtons;
