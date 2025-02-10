"use client";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import {
  Mail,
  User,
  Phone,
  MapPin,
  LogOut,
  AlertCircle,
  Settings,
  Camera,
  Shield,
  Bell,
  HelpCircle,
} from "lucide-react-native";
import { router } from "expo-router";

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

  const ProfileInfoItem = ({ icon: Icon, label, value }) => (
    <View className="flex-row items-center mb-4 bg-white p-4 rounded-xl ">
      <View className="bg-blue-50 p-2 rounded-lg">
        <Icon size={20} color="#4F46E5" />
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-sm text-gray-500 font-medium">{label}</Text>
        <Text className="text-base text-gray-900 font-semibold mt-1">
          {value || "N/A"}
        </Text>
      </View>
    </View>
  );

  const MenuButton = ({
    icon: Icon,
    title,
    onPress,
    color = "#4F46E5",
    danger = false,
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center p-4 bg-white rounded-xl  mb-3`}
      activeOpacity={0.7}
    >
      <View className={`p-2 rounded-lg ${danger ? "bg-red-50" : "bg-blue-50"}`}>
        <Icon size={20} color={danger ? "#EF4444" : color} />
      </View>
      <Text
        className={`flex-1 ml-4 font-medium ${
          danger ? "text-red-600" : "text-gray-900"
        }`}
      >
        {title}
      </Text>
      <AlertCircle size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );

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
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="items-center mt-8 mb-6">
          <View className="relative">
            <Image
              source={{
                uri: user?.imageUrl || "https://via.placeholder.com/150",
              }}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg"
              activeOpacity={0.8}
            >
              <Camera color="#4F46E5" />
            </TouchableOpacity>
          </View>
          <Text className="mt-4 text-2xl font-bold text-gray-900">
            {user?.fullName || "Kullanıcı"}
          </Text>
          <Text className="text-gray-500 font-medium">
            {user?.primaryEmailAddress?.emailAddress}
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
            value={user?.primaryEmailAddress?.emailAddress}
          />
          <ProfileInfoItem
            icon={Phone}
            label="Telefon"
            value={user?.primaryPhoneNumber?.phoneNumber}
          />
          <ProfileInfoItem
            icon={MapPin}
            label="Adres"
            value={user?.publicMetadata?.address || "N/A"}
          />
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

          {isLoading && (
            <View className="mt-4 items-center">
              <ActivityIndicator size="large" color="#4F46E5" />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
