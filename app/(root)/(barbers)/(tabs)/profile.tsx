"use client";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import {
  Mail,
  User,
  Phone,
  LogOut,
  Settings,
  Camera,
  Shield,
  Bell,
  HelpCircle,
} from "lucide-react-native";
import { router } from "expo-router";
import { MenuButton } from "@/components/ProfileMenuButton";
import { ProfileInfoItem } from "@/components/ProfileInfoItem";

const ProfileScreen = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (err) {
      Alert.alert("Hata", "Çıkış yapılamadı");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSignOut = () => {
    Alert.alert(
      "Çıkış Yap",
      "Çıkış yapmak istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Çıkış Yap",
          onPress: handleSignOut,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="items-center mt-8 mb-6 ">
          <View className="relative">
            <Image
              source={{
                uri: user?.imageUrl || "https://via.placeholder.com/150",
              }}
              className="w-28 h-28 rounded-full shadow-lg border-2 border-[#4F46E5]"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg">
              <Camera color="#4F46E5" size={20} />
            </TouchableOpacity>
          </View>
          <Text className="mt-4 text-2xl font-bold text-gray-900">
            {user?.fullName || "Berber"}
          </Text>
          <Text className="text-gray-500 font-medium">
            {user?.emailAddresses[0].emailAddress}
          </Text>
        </View>

        <View className="px-6 py-4">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Profil Bilgileri
          </Text>
          <ProfileInfoItem icon={User} label="İsim" value={user?.fullName} />
          <ProfileInfoItem
            icon={Mail}
            label="E-posta"
            value={user?.emailAddresses[0]?.emailAddress}
          />
          <ProfileInfoItem
            icon={Phone}
            label="Telefon"
            value={user?.phoneNumbers[0]?.phoneNumber}
          />
          <ProfileInfoItem icon={Phone} label="Adres" value="Not available" />
        </View>

        <View className="px-6 pb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Hesap Ayarları
          </Text>

          <MenuButton
            icon={Bell}
            title="Bildirim Ayarları"
            onPress={() => {}}
          />
          <MenuButton
            icon={Shield}
            title="Güvenlik ve Gizlilik"
            onPress={() => {}}
          />
          <MenuButton
            icon={HelpCircle}
            title="Yardım ve Destek"
            onPress={() => {}}
          />
          <MenuButton
            icon={Settings}
            title="Genel Ayarlar"
            onPress={() => {}}
          />
          <MenuButton
            icon={LogOut}
            title="Çıkış Yap"
            onPress={confirmSignOut}
            danger
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
