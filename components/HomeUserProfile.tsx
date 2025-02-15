import { router } from "expo-router";
import { TouchableOpacity, View, Image, Text } from "react-native";

export const UserProfile = ({ user }) => {
  const onProfilePress = () => {
    router.replace("/(root)/(tabs)/profile");
  };
  return (
    <View className="flex-row items-center space-x-4">
      <TouchableOpacity onPress={onProfilePress} className="relative">
        <Image
          source={{
            uri: user?.imageUrl || "https://via.placeholder.com/150",
          }}
          className="rounded-full"
          width={64}
          height={64}
        />
        <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      </TouchableOpacity>

      <View className="ml-2">
        <Text className="text-2xl font-bold text-gray-900">Merhaba,</Text>
        <Text className="text-base text-gray-600">
          {user?.emailAddresses[0].emailAddress}
        </Text>
      </View>
    </View>
  );
};
