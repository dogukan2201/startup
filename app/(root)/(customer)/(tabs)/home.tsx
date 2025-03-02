import { useState } from "react";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { barbers, SERVICES } from "@/constants";
import { MapPin, Scissors } from "lucide-react-native";
import { AppointmentCard } from "@/components/CustomerComponents/AppointmentCard";
import { ServiceCard } from "@/components/CustomerComponents/ServiceCard";
import { PopulerBarberCard } from "@/components/CustomerComponents/PopulerBarberCard";
import { UserProfile } from "@/components/CustomerComponents/HomeUserProfile";
import { QuickAccessCard } from "@/components/CustomerComponents/QuickAccessCard";

export default function Home() {
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <SignedIn>
        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="px-6 py-8">
            <View className="flex-row items-center justify-between mb-8">
              <UserProfile user={user} />
              <TouchableOpacity className="p-2 bg-indigo-100 rounded-full">
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#4F46E5"
                />
              </TouchableOpacity>
            </View>

            <AppointmentCard />

            <View className="flex-row justify-between mb-8">
              <QuickAccessCard
                icon={MapPin}
                title="Konumumuz"
                subtitle="En yakın şube"
              />
              <QuickAccessCard
                icon={Scissors}
                title="Kampanyalar"
                subtitle="Fırsatları kaçırma"
              />
            </View>

            <Text className="text-2xl font-semibold mb-4">Popülerler</Text>
            <ScrollView horizontal className="mb-8">
              <View className="flex-row">
                {barbers.map((barber) => (
                  <PopulerBarberCard key={barber.id} barber={barber} />
                ))}
              </View>
            </ScrollView>

            <Text className="text-2xl font-semibold mb-4">Hizmetlerimiz</Text>
            <View className="flex-row flex-wrap justify-between">
              {SERVICES.map((service) => (
                <ServiceCard key={service} service={service} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SignedIn>
    </SafeAreaView>
  );
}
