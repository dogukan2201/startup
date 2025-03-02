import React from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { X } from "lucide-react-native";
import { TIME_FILTERS, PRICE_FILTERS, SERVICE_FILTERS } from "@/constants";
import { renderFilterButton } from "./RenderFilterButton";

const FilterButton = ({ onPress, variant = "primary", text }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 p-3 rounded-2xl shadow-sm ${
      variant === "primary"
        ? "bg-[#4F46E5]"
        : "bg-white border-2 border-[#4F46E5]"
    }`}
    style={{
      transform: [{ scale: 0.98 }],
    }}
  >
    <View className="flex-row items-center justify-center">
      <Text
        className={`text-center text-base font-bold ${
          variant === "primary" ? "text-white" : "text-[#4F46E5]"
        }`}
      >
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

const FilterSection = ({ title, filters, selectedFilter, onFilterSelect }) => (
  <View className="mb-6">
    <Text className="text-gray-800 font-bold text-lg mb-4">{title}</Text>
    <View className="flex-row flex-wrap gap-3">
      {filters.map((filter) =>
        renderFilterButton(filter, selectedFilter, () => onFilterSelect(filter))
      )}
    </View>
  </View>
);

const AppointmentFilterModal = ({
  visible,
  onDismiss,
  timeFilter,
  setTimeFilter,
  priceFilter,
  setPriceFilter,
  serviceFilter,
  setServiceFilter,
}) => {
  const resetFilters = () => {
    setTimeFilter("Tümü");
    setPriceFilter("Tümü");
    setServiceFilter("Tümü");
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      statusBarTranslucent
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl w-full max-h-[90%] ">
          <View className="p-6 border-b border-solid border-gray-100 flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-gray-900">Filtrele</Text>
            <TouchableOpacity
              onPress={onDismiss}
              className="rounded-full p-2 bg-gray-100"
            >
              <X size={20} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-6">
            <View className="space-y-2">
              <FilterSection
                title="Zaman"
                filters={TIME_FILTERS}
                selectedFilter={timeFilter}
                onFilterSelect={setTimeFilter}
              />

              <FilterSection
                title="Fiyat"
                filters={PRICE_FILTERS}
                selectedFilter={priceFilter}
                onFilterSelect={setPriceFilter}
              />

              <FilterSection
                title="Hizmet"
                filters={SERVICE_FILTERS}
                selectedFilter={serviceFilter}
                onFilterSelect={setServiceFilter}
              />
            </View>

            <View className="flex-col space-y-3 mt-8 mb-6">
              <FilterButton
                onPress={onDismiss}
                variant="primary"
                text="Filtreleri Uygula"
              />
              <FilterButton
                onPress={resetFilters}
                variant="outline"
                text="Filtreleri Sıfırla"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AppointmentFilterModal;
