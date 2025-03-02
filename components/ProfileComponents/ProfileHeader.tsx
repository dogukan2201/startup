import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "lucide-react-native";

const ProfileHeader = ({ user }) => {
  return (
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
  );
};

export default ProfileHeader;
