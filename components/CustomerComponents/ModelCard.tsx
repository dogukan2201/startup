import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Star } from "lucide-react-native";

export const ModelCard = ({ model, isFavorite, onToggleFavorite }) => (
  <View style={[styles.card, { width: "49%" }]}>
    <View style={styles.relative}>
      <Image
        source={{ uri: model.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={onToggleFavorite}
        style={styles.favoriteButton}
        activeOpacity={0.7}
      >
        <Star
          fill={isFavorite ? "#4F46E5" : "transparent"}
          color={isFavorite ? "#4F46E5" : "#6B7280"}
          size={20}
          strokeWidth={2}
        />
      </TouchableOpacity>
    </View>

    <View style={styles.content}>
      <Text style={styles.title}>{model.name}</Text>
      <Text style={styles.description}>{model.description}</Text>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>
          {model.category === "women"
            ? "Kadın Saç"
            : model.category === "men"
            ? "Erkek Saç"
            : "Tırnak"}{" "}
          Modeli
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  relative: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 10,
    borderRadius: 15,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  description: {
    color: "#4B5563",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  categoryContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    color: "#4F46E5",
    fontSize: 14,
    fontWeight: "bold",
  },
});
