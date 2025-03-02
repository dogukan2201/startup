"use client";
import { View, SafeAreaView, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import {
  Mail,
  User,
  Phone,
  LogOut,
  Settings,
  Shield,
  Bell,
  HelpCircle,
} from "lucide-react-native";
import { router } from "expo-router";
import { MenuButton } from "@/components/ProfileComponents/ProfileMenuButton";
import { ProfileInfoItem } from "@/components/ProfileComponents/ProfileInfoItem";
import ProfileHeader from "@/components/ProfileComponents/ProfileHeader";
import Title from "@/components/Tittle";

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
        <ProfileHeader user={user} />

        <View className="px-6 py-4">
          <Title title="Profil Bilgileri" />
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
        </View>

        <View className="px-6 pb-8">
          <Title title="Hesap Ayarları" />
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
