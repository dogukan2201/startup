import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { barbers } from "@/constants";
import React, { useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Scissors,
  Clock,
  MapPin,
  Filter as FilterIcon,
} from "lucide-react-native";
import FilterModal from "@/components/Filter";
import { router } from "expo-router";

const Barbers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    rating: null,
    experience: null,
    location: null,
    price: { min: 0, max: 0 },
    specialty: null,
    gender: null,
  });

  const filteredBarbers = useMemo(() => {
    return barbers.filter((barber) => {
      const matchesSearch =
        barber.name
          .toLocaleLowerCase("tr")
          .includes(searchQuery.toLocaleLowerCase("tr")) ||
        barber.location
          .toLocaleLowerCase("tr")
          .includes(searchQuery.toLocaleLowerCase("tr"));

      const matchesRating =
        !selectedFilters.rating || barber.rating >= selectedFilters.rating;

      const matchesExperience =
        !selectedFilters.experience ||
        (barber.experience >= selectedFilters.experience.min &&
          (!selectedFilters.experience.max ||
            barber.experience <= selectedFilters.experience.max));

      const matchesLocation =
        !selectedFilters.location ||
        barber.location.includes(selectedFilters.location);

      const matchesPrice =
        (selectedFilters.price.min === 0 && selectedFilters.price.max === 0) ||
        (barber.services[0].price >= selectedFilters.price.min &&
          barber.services[0].price <= selectedFilters.price.max);

      const matchesSpecialty =
        !selectedFilters.specialty ||
        barber.specialty.some((spec) =>
          spec.toLowerCase().includes(selectedFilters.specialty.toLowerCase())
        );

      const matchesGender =
        !selectedFilters.gender || barber.gender === selectedFilters.gender;

      return (
        matchesSearch &&
        matchesRating &&
        matchesExperience &&
        matchesLocation &&
        matchesPrice &&
        matchesSpecialty &&
        matchesGender
      );
    });
  }, [searchQuery, selectedFilters]);

  const handleFilterSubmit = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-indigo-100 via-purple-50 to-white">
      <View className="flex-1 px-4 py-6">
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-3xl font-bold text-indigo-900 tracking-tight">
              Berberler
            </Text>
            <Text className="text-indigo-600 mt-1 text-base font-medium">
              Profesyonel ellerdesiniz
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowFilter(true)}
            className="bg-indigo-600 px-5 py-3 rounded-2xl flex-row items-center shadow-lg shadow-indigo-200"
          >
            <FilterIcon size={18} color="white" />
            <Text className="text-white font-semibold ml-2">Filtrele</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-white rounded-2xl px-4 py-3.5 mb-6 shadow-xl shadow-indigo-100">
          <Ionicons name="search-outline" size={22} color="#4F46E5" />
          <TextInput
            className="flex-1 ml-3 text-base font-medium"
            placeholder="İsim veya lokasyon ile ara..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6366F1"
          />
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="space-y-4">
            {filteredBarbers.map((barber) => (
              <TouchableOpacity
                key={barber.id}
                onPress={() => router.push(`/(root)/(tabs)/${barber.id}`)}
                className="bg-white p-4 rounded-3xl shadow-lg shadow-indigo-100/40 mb-3"
                activeOpacity={0.8}
              >
                <View className="flex-row">
                  <Image
                    source={{ uri: barber.image }}
                    className="w-32 h-32 rounded-2xl"
                  />
                  <View className="flex-1 ml-4 justify-between">
                    <View>
                      <Text className="text-xl font-bold text-indigo-900 tracking-tight">
                        {barber.name}
                      </Text>
                      <View className="flex-row items-center mt-1.5">
                        <View className="bg-indigo-100 px-3 py-1.5 rounded-lg flex-row items-center">
                          <Ionicons name="star" size={16} color="#4F46E5" />
                          <Text className="ml-1 font-bold text-indigo-700">
                            {barber.rating}
                          </Text>
                          <Text className="text-indigo-600 ml-1">
                            ({barber.reviews})
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="space-y-2">
                      <View className="flex-row items-center">
                        <Scissors size={16} color="#4F46E5" />
                        <Text className="ml-2 text-gray-700 font-medium text-sm">
                          {barber.specialty.join(", ")}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <MapPin size={16} color="#4F46E5" />
                        <Text className="ml-2 text-gray-700 font-medium text-sm">
                          {barber.location}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Clock size={16} color="#4F46E5" />
                        <Text className="ml-2 text-gray-700 font-medium text-sm">
                          {barber.experience} Yıl Deneyim
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View className="h-6" />
        </ScrollView>
      </View>
      <FilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onSubmit={handleFilterSubmit}
        initialFilters={selectedFilters}
      />
    </SafeAreaView>
  );
};

export default Barbers;
