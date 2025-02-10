import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { X } from "lucide-react-native";
import { FilterType, FilterModalProps } from "@/types/type";

const PRICE_RANGES = [
  { label: "100-200 TL", min: 100, max: 200 },
  { label: "200-300 TL", min: 200, max: 300 },
  { label: "300-400 TL", min: 300, max: 400 },
  { label: "400-500 TL", min: 400, max: 500 },
  { label: "500-600 TL", min: 500, max: 600 },
  { label: "600+ TL", min: 600, max: 999999 },
];
const EXPERIENCE_RANGES = [
  { min: 1, max: 3 },
  { min: 3, max: 5 },
  { min: 5, max: null },
];
const LOCATIONS = ["Kadıköy", "Beşiktaş", "Şişli", "Üsküdar"];
const SPECIALTIES = ["Saç Kesimi", "Sakal Tıraşı", "Saç Boyama"];
const GENDERS = ["Erkek", "Kadın"];

const FilterModal = ({
  visible,
  onClose,
  onSubmit,
  initialFilters,
}: FilterModalProps) => {
  const [localFilters, setLocalFilters] = useState<FilterType>(initialFilters);

  const handleFilterChange = (filterKey: keyof FilterType, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [filterKey]: value === prev[filterKey] ? null : value,
    }));
  };

  const clearFilters = () => {
    setLocalFilters({
      rating: null,
      experience: null,
      location: null,
      price: { min: 0, max: 0 },
      specialty: null,
      gender: null,
    });
  };

  const handleSubmit = () => {
    onSubmit(localFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="h-[85%] bg-white rounded-t-3xl">
          <SafeAreaView>
            <ScrollView className="p-4">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-bold text-gray-800">
                  Filtreler
                </Text>
                <TouchableOpacity
                  onPress={onClose}
                  className="p-2 rounded-full bg-gray-100"
                >
                  <X size={20} color="#4F46E5" />
                </TouchableOpacity>
              </View>

              <View className="space-y-6">
                <View>
                  <Text className="text-base font-semibold text-gray-700 mb-3">
                    Puan
                  </Text>
                  <View className="flex-row space-x-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <TouchableOpacity
                        key={rating}
                        onPress={() => handleFilterChange("rating", rating)}
                        className="items-center"
                      >
                        <Ionicons
                          name={
                            (localFilters.rating || 0) >= rating
                              ? "star"
                              : "star-outline"
                          }
                          size={28}
                          color={
                            (localFilters.rating || 0) >= rating
                              ? "#4F46E5"
                              : "#9CA3AF"
                          }
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View>
                  <Text className="text-base font-semibold text-gray-700 mb-3">
                    Fiyat Aralığı
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {PRICE_RANGES.map((priceRange) => (
                      <TouchableOpacity
                        key={`${priceRange.min}-${priceRange.max}`}
                        onPress={() =>
                          handleFilterChange("price", {
                            min: priceRange.min,
                            max: priceRange.max,
                          })
                        }
                        className={`px-4 py-3 rounded-full ${
                          JSON.stringify(localFilters.price) ===
                          JSON.stringify({
                            min: priceRange.min,
                            max: priceRange.max,
                          })
                            ? "bg-indigo-600"
                            : "bg-gray-100"
                        }`}
                      >
                        <Text
                          className={`${
                            JSON.stringify(localFilters.price) ===
                            JSON.stringify({
                              min: priceRange.min,
                              max: priceRange.max,
                            })
                              ? "text-white"
                              : "text-gray-700"
                          } text-sm font-medium`}
                        >
                          {priceRange.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View>
                  <Text className="text-base font-semibold text-gray-700 mb-3">
                    Deneyim
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {EXPERIENCE_RANGES.map((exp) => (
                      <TouchableOpacity
                        key={`${exp.min}-${exp.max}`}
                        onPress={() => handleFilterChange("experience", exp)}
                        className={`px-4 py-3 rounded-full ${
                          JSON.stringify(localFilters.experience) ===
                          JSON.stringify(exp)
                            ? "bg-indigo-600"
                            : "bg-gray-100"
                        }`}
                      >
                        <Text
                          className={`${
                            JSON.stringify(localFilters.experience) ===
                            JSON.stringify(exp)
                              ? "text-white"
                              : "text-gray-700"
                          } text-sm font-medium`}
                        >
                          {exp.max
                            ? `${exp.min}-${exp.max} Yıl`
                            : `${exp.min}+ Yıl`}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View>
                  <Text className="text-base font-semibold text-gray-700 mb-3">
                    Lokasyon
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {LOCATIONS.map((loc) => (
                      <TouchableOpacity
                        key={loc}
                        onPress={() => handleFilterChange("location", loc)}
                        className={`px-4 py-3 rounded-full ${
                          localFilters.location === loc
                            ? "bg-indigo-600"
                            : "bg-gray-100"
                        }`}
                      >
                        <Text
                          className={`${
                            localFilters.location === loc
                              ? "text-white"
                              : "text-gray-700"
                          } text-sm font-medium`}
                        >
                          {loc}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View>
                  <Text className="text-base font-semibold text-gray-700 mb-3">
                    Uzmanlık
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {SPECIALTIES.map((spec) => (
                      <TouchableOpacity
                        key={spec}
                        onPress={() => handleFilterChange("specialty", spec)}
                        className={`px-4 py-3 rounded-full ${
                          localFilters.specialty === spec
                            ? "bg-indigo-600"
                            : "bg-gray-100"
                        }`}
                      >
                        <Text
                          className={`${
                            localFilters.specialty === spec
                              ? "text-white"
                              : "text-gray-700"
                          } text-sm font-medium`}
                        >
                          {spec}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View>
                  <Text className="text-base font-semibold text-gray-700 mb-3">
                    Cinsiyet
                  </Text>
                  <View className="flex-row gap-2">
                    {GENDERS.map((gender) => (
                      <TouchableOpacity
                        key={gender}
                        onPress={() => handleFilterChange("gender", gender)}
                        className={`px-4 py-3 rounded-full ${
                          localFilters.gender === gender
                            ? "bg-indigo-600"
                            : "bg-gray-100"
                        }`}
                      >
                        <Text
                          className={`${
                            localFilters.gender === gender
                              ? "text-white"
                              : "text-gray-700"
                          } text-sm font-medium`}
                        >
                          {gender}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className="space-y-3 mt-4">
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="w-full py-3 rounded-xl bg-indigo-600"
                  >
                    <Text className="text-center font-semibold text-white">
                      Uygula
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={clearFilters}
                    className="w-full py-3 rounded-xl bg-gray-100"
                  >
                    <Text className="text-center font-semibold text-gray-700">
                      Filtreleri Temizle
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
