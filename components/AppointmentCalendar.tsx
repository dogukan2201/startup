import React from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { X } from "lucide-react-native";
import { TIME_FILTERS, PRICE_FILTERS, SERVICE_FILTERS } from "@/constants";
import { renderFilterButton } from "./RenderFilterButton";
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
      animationType="fade"
      className="border-2 border-gray-200"
    >
      <View className="flex-1  justify-center items-center border-2 border-gray-200 bg-black bg-opacity-50">
        <View className="bg-white border border-gray-300 rounded-2xl w-11/12 max-h-[80%]">
          <View className="p-4 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-3xl font-bold text-[#4F46E5]">Filtrele</Text>
            <TouchableOpacity onPress={onDismiss}>
              <X size={24} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-4">
            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 font-medium mb-2">Zaman</Text>
                <View className="flex-row flex-wrap gap-2">
                  {TIME_FILTERS.map((filter) =>
                    renderFilterButton(filter, timeFilter, () =>
                      setTimeFilter(filter)
                    )
                  )}
                </View>
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2 mt-2">
                  Fiyat
                </Text>
                <View className="flex-row  flex-wrap gap-2">
                  {PRICE_FILTERS.map((filter) =>
                    renderFilterButton(filter, priceFilter, () =>
                      setPriceFilter(filter)
                    )
                  )}
                </View>
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2 mt-2">
                  Hizmet
                </Text>
                <View className="flex-row flex-wrap gap-2 ">
                  {SERVICE_FILTERS.map((filter) =>
                    renderFilterButton(filter, serviceFilter, () =>
                      setServiceFilter(filter)
                    )
                  )}
                </View>
              </View>
            </View>

            <View className="flex-col mt-6">
              <TouchableOpacity
                onPress={onDismiss}
                className="flex-1 p-2  rounded-xl bg-[#4F46E5]"
              >
                <Text className="text-white text-center font-medium">
                  Uygula
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={resetFilters}
                className="flex-1 p-2  rounded-xl border border-[#4F46E5] mt-2"
              >
                <Text className="text-[#4F46E5] font-bold text-center">
                  Sıfırla
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AppointmentFilterModal;
