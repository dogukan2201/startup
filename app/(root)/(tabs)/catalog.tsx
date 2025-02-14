import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Star, Filter } from "lucide-react-native";
import { Models } from "@/constants";
import { CategoryButton } from "@/components/CategoryButton";
import { ModelCard } from "@/components/ModelCard";
import { CATEGORIES } from "@/constants";

const HairModels = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((fav) => fav !== id);
      }
      return [...prevFavorites, id];
    });
  };

  const filteredModels = Models.filter((model) => {
    if (showOnlyFavorites) {
      return favorites.includes(model.id);
    }
    return model.category === selectedCategory;
  });

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <ScrollView className="flex-1">
        <View className="px-6 py-8">
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-4xl font-bold text-gray-900 tracking-tight">
                Model Kataloğu
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

          <ScrollView horizontal className="mb-6">
            {CATEGORIES.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}
          </ScrollView>

          <View className="flex-1 flex-row flex-wrap justify-between">
            {filteredModels.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isFavorite={favorites.includes(model.id)}
                onToggleFavorite={() => toggleFavorite(model.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HairModels;
