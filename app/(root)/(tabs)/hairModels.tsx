import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Star, Filter, Search } from "lucide-react-native";
import { hairModels } from "@/constants";

const HairModels = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((fav) => fav !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const filteredModels = showOnlyFavorites
    ? hairModels.filter((model) => favorites.includes(model.id))
    : hairModels;

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <ScrollView className="flex-1">
        <View className="px-6 py-8">
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-4xl font-bold text-gray-900 tracking-tight">
                Saç Modelleri
              </Text>
              <Text className="text-gray-500 mt-2 text-lg">
                İlham veren stiller
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className="bg-indigo-600 px-6 py-3.5 rounded-full flex-row items-center"
            >
              {showOnlyFavorites ? (
                <Filter size={20} color="white" />
              ) : (
                <Star size={20} color="white" />
              )}
              <Text className="ml-2 font-bold text-white text-base">
                {showOnlyFavorites ? "Tümü" : "Favoriler"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 flex-row flex-wrap justify-between">
            {filteredModels.map((model) => (
              <View
                key={model.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg shadow-gray-100/60 mb-6 overflow-hidden"
                style={{ width: "47%" }}
              >
                <View className="relative">
                  <Image
                    source={{ uri: model.image }}
                    className="w-full h-56 rounded-t-3xl"
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => toggleFavorite(model.id)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-sm"
                  >
                    <Star
                      size={22}
                      color={
                        favorites.includes(model.id) ? "#4F46E5" : "#9CA3AF"
                      }
                      fill={
                        favorites.includes(model.id) ? "#4F46E5" : "transparent"
                      }
                    />
                  </TouchableOpacity>
                </View>

                <View className="p-4">
                  <Text className="text-xl font-bold text-gray-900 tracking-tight">
                    {model.name}
                  </Text>
                  <Text className="text-gray-600 mt-2 text-base leading-6">
                    {model.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HairModels;
