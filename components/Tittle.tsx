import React from "react";
import { View, Text } from "react-native";

const Title = ({ title }) => {
  return (
    <View className="flex-row items-center justify-between mb-2">
      <Text className="text-md  font-bold text-[#4F46E5] bg-indigo-100 px-4 py-3 rounded-xl border border-indigo-200 ">
        {title}
      </Text>
    </View>
  );
};

export default Title;
