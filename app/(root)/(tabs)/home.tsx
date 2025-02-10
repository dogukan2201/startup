import { SignedIn, useUser } from "@clerk/clerk-expo";
import { SafeAreaView, Text, View, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const { user } = useUser();
  const services = ["Saç Kesimi", "Sakal Tıraşı", "Saç Boyama", "Cilt Bakımı"];
  const popularBarbers = ["Sergen", "Osman", "Mehmet"];
  return (
    <SafeAreaView className="flex-1 bg-white">
      <SignedIn>
        <ScrollView className="flex-1">
          <View className="px-4 py-6">
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-col ">
                <View>
                  <Image
                    source={{
                      uri: user?.imageUrl || "https://via.placeholder.com/150",
                    }}
                    className="w-14 h-14 rounded-full "
                  />
                </View>
                <Text className="text-2xl font-bold text-gray-900">
                  Merhaba,
                </Text>
                <Text className="text-lg text-gray-600">
                  {user?.emailAddresses[0].emailAddress}
                </Text>
              </View>
            </View>
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
              <Text className="text-lg font-semibold mb-2">
                Yaklaşan Randevunuz
              </Text>
              <View className="flex-row items-center space-x-3">
                <Ionicons name="calendar-outline" size={20} color="#4B5563" />
                <Text className="text-gray-600 font-medium pl-1">
                  Randevunuz Bulunmamaktadır
                </Text>
              </View>
            </View>
            <Text className="text-lg font-semibold mb-4">
              Popüler Berberler
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              className="mb-6"
            >
              {popularBarbers.map((item) => (
                <View key={item} className="mr-4 w-40">
                  <View className="bg-gray-200 h-40 rounded-lg mb-2" />
                  <Text className="font-medium">Berber {item}</Text>
                  <Text className="text-gray-500">4.5 ★</Text>
                </View>
              ))}
            </ScrollView>

            <Text className="text-lg font-semibold mb-4">Hizmetlerimiz</Text>
            <View className="flex-row flex-wrap justify-between">
              {services.map((service) => (
                <View
                  key={service}
                  className="w-[48%] bg-gray-50 rounded-lg p-4 mb-4"
                >
                  <Text className="font-medium">{service}</Text>
                  <Text className="text-gray-500">Detaylar için tıklayın</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SignedIn>
    </SafeAreaView>
  );
}
