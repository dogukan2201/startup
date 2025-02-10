import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Providers from "@/components/Providers";
import { useSignIn, useClerk } from "@clerk/clerk-expo";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, setActive, isLoaded } = useSignIn();

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full h-[280px] relative">
          <Image
            source={images.signUpImage}
            className="w-full h-[280px]"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/20" />
        </View>

        <View className="px-6 -mt-10 rounded-t-[30px] bg-white pt-8 pb-10">
          <Text className="text-3xl text-gray-900 font-bold mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-500 text-base mb-8">
            Sign in to continue
          </Text>

          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 text-sm mb-2 ml-2">Email</Text>
              <View className="flex-row items-center bg-gray-50 rounded-2xl px-4">
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
                <TextInput
                  placeholder="Enter your email"
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                  className="flex-1 p-4 text-[16px] text-gray-900"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-700 text-sm mb-2 ml-2">Password</Text>
              <View className="flex-row items-center bg-gray-50 rounded-2xl px-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#6B7280"
                />
                <TextInput
                  placeholder="Enter your password"
                  value={form.password}
                  onChangeText={(text) => setForm({ ...form, password: text })}
                  className="flex-1 p-4 text-[16px] text-gray-900"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#6B7280"
                  />
                </Pressable>
              </View>
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View
                  className={`w-5 h-5 rounded-md mr-2 items-center justify-center ${
                    rememberMe ? "bg-blue-600" : "border border-gray-300"
                  }`}
                >
                  {rememberMe && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
                <Text className="text-gray-600">Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text className="text-blue-600 font-semibold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={onSignInPress}
              className="bg-blue-600 rounded-full py-4 mt-6"
            >
              <Text className="text-white text-center text-2xl font-semibold">
                Sign In
              </Text>
            </TouchableOpacity>

            <Providers navigation={undefined} />

            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-500">Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/sign-up")}
              >
                <Text className="text-blue-600 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
