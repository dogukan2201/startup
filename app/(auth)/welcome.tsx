import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onBoardingArray } from "@/constants";
const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onboardingHandler = () => {
    if (activeIndex < onBoardingArray.length - 1) {
      swiperRef.current?.scrollBy(1);
    } else {
      router.replace("/(auth)/sign-up");
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-in")}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-gray-700 text-md font-bold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onBoardingArray.map(
          (item) =>
            item && (
              <View
                key={item.id}
                className="flex items-center justify-center p-5"
              >
                <Image
                  source={item.image}
                  className="w-full h-[300px]"
                  resizeMode="contain"
                />
                <View className="flex flex-row items-center justify-center w-full mt-10">
                  <Text className="text-black text-3xl font-bold mx-10 text-center">
                    {item.title}
                  </Text>
                </View>
                <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
                  {item.description}
                </Text>
              </View>
            )
        )}
      </Swiper>
      <TouchableOpacity
        onPress={onboardingHandler}
        className="w-11/12   flex justify-center items-center p-5 bg-blue-600 rounded-full  active:scale-95 transition-transform duration-200"
      >
        <Text className="text-white text-lg font-bold">
          {activeIndex < onBoardingArray.length - 1 ? "Next" : "Get Started"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;
