import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Filter as FilterIcon } from "lucide-react-native";
import { barbers } from "@/constants";
import React, { useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "@/components/Filter";
import { BarberCard } from "@/components/RenderCard";
import { TURKISH_CHAR_MAP } from "@/constants";
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

  const normalizeSearchQuery = (text) => {
    return text
      .toLocaleLowerCase("tr")
      .replace(/[ışöçğü]/g, (char) => TURKISH_CHAR_MAP[char]);
  };

  const matchesSearchCriteria = (barber, query) => {
    const normalizedQuery = normalizeSearchQuery(query);

    return ["name", "location.city", "location.district", "location.address"]
      .map((key) => key.split(".").reduce((obj, k) => obj[k], barber))
      .some((value) => normalizeSearchQuery(value).includes(normalizedQuery));
  };

  const matchesFilterCriteria = (barber, filters) => {
    const { rating, experience, location, price, specialty, gender } = filters;

    const matchesRating = !rating || barber.rating >= rating;

    const matchesExperience =
      !experience ||
      (barber.experience >= experience.min &&
        (!experience.max || barber.experience <= experience.max));

    const matchesLocation =
      !location || barber.location.district.includes(location);

    const matchesPrice =
      (price.min === 0 && price.max === 0) ||
      (barber.services[0].price >= price.min &&
        barber.services[0].price <= price.max);

    const matchesSpecialty =
      !specialty ||
      barber.specialty.some((spec) =>
        spec.toLowerCase().includes(specialty.toLowerCase())
      );

    const matchesGender = !gender || barber.gender === gender;

    return (
      matchesRating &&
      matchesExperience &&
      matchesLocation &&
      matchesPrice &&
      matchesSpecialty &&
      matchesGender
    );
  };

  const filteredBarbers = useMemo(() => {
    return barbers.filter(
      (barber) =>
        matchesSearchCriteria(barber, searchQuery) &&
        matchesFilterCriteria(barber, selectedFilters)
    );
  }, [searchQuery, selectedFilters]);

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-indigo-100 via-purple-50 to-white">
      <View className="flex-1 px-4 py-6">
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-3xl font-bold text-gray-900 tracking-tight">
              Kuaförler & Berberler
            </Text>
            <Text className="text-gray-500 mt-2 text-lg">
              Profesyonel ellerdesiniz
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowFilter(true)}
            className="bg-indigo-600 px-4 py-3 rounded-2xl flex-row items-center"
          >
            <FilterIcon size={18} color="white" />
            <Text className="text-white font-semibold ml-2">Filtrele</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-white rounded-2xl px-4 py-3.5 mb-6 ">
          <Ionicons name="search-outline" size={22} color="#4F46E5" />
          <TextInput
            className="ml-3"
            placeholder="İsim veya lokasyon ile ara..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="space-y-4">
            {filteredBarbers.map((barber) => (
              <BarberCard key={barber.id} {...barber} />
            ))}
          </View>
          <View className="h-6" />
        </ScrollView>
      </View>

      <FilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onSubmit={setSelectedFilters}
        initialFilters={selectedFilters}
      />
    </SafeAreaView>
  );
};

export default Barbers;
