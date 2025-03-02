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
} from "react-native";
import ReactNativeModal from "react-native-modal";
import React, { useState } from "react";
import { images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Providers from "@/components/CommonComponents/Providers";
import { useSignUp } from "@clerk/clerk-expo";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (signUpAttempt.status === "complete") {
        //TODO Create a database user
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white items-center justify-center"
    >
      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full h-[280px] relative">
          <Image
            source={images.signUpImage}
            className="w-full h-[280px]"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/20" />
        </View>

        <View className="px-6 -mt-10 rounded-t-[30px] bg-white pt-8 pb-10">
          <Text className="text-3xl text-[#4F46E5] font-bold mb-2">
            Create Account
          </Text>
          <Text className="text-gray-500 text-base mb-8">
            Please fill in the form to continue
          </Text>

          <View className="space-y-4">
            <View>
              <Text className="text-[#4F46E5] text-lg   mb-2 ml-2">
                Full Name
              </Text>
              <View className="flex-row items-center bg-gray-50 rounded-2xl px-4">
                <Ionicons name="person-outline" size={20} color="#4F46E5" />
                <TextInput
                  placeholder="Enter your name"
                  value={form.name}
                  onChangeText={(text) => setForm({ ...form, name: text })}
                  className="flex-1 p-4 text-[16px] text-[#4F46E5]"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View>
              <Text className="text-[#4F46E5] text-lg   mb-2 ml-2">Email</Text>
              <View className="flex-row items-center bg-gray-50 rounded-2xl px-4">
                <Ionicons name="mail-outline" size={20} color="#4F46E5" />
                <TextInput
                  placeholder="Enter your email"
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                  className="flex-1 p-4 text-[16px] text-[#4F46E5]"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View>
              <Text className="text-[#4F46E5] text-lg   mb-2 ml-2">
                Password
              </Text>
              <View className="flex-row items-center bg-gray-50 rounded-2xl px-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#4F46E5"
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
                    color="#4F46E5"
                  />
                </Pressable>
              </View>
            </View>

            <TouchableOpacity
              onPress={onSignUpPress}
              className="bg-[#4F46E5] rounded-full py-4 mt-6"
            >
              <Text className="text-white text-center text-2xl font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>

            <Providers />

            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-500">Already have an account ? </Text>
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/sign-in")}
              >
                <Text className="text-[#4F46E5] font-semibold">Log In</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ReactNativeModal
            isVisible={verification.state === "pending"}
            onModalHide={() => {
              if (verification.state === "success") {
                setShowSuccessModal(true);
              }
            }}
          >
            <View className="p-8 bg-white rounded-2xl shadow-2xl mx-6 border border-gray-200 space-y-6">
              <Text className="text-gray-900 text-4xl font-bold text-center">
                Verification
              </Text>
              <Text className="text-gray-600 text-center">
                We've sent a verification code to
                <Text className="font-semibold text-gray-800">
                  {form.email}
                </Text>
              </Text>
              <Text className="p-2 text-3xl font-bold">Code</Text>
              <View className="flex-row p-2  items-center border border-gray-300 rounded-full px-4 py-3 bg-gray-50">
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color="#4F46E5"
                />
                <TextInput
                  placeholder="Enter the code"
                  className="flex-1 text-xl"
                  keyboardType="numeric"
                  value={verification.code}
                  onChangeText={(code) =>
                    setVerification({ ...verification, code })
                  }
                />
              </View>
              {verification.error && (
                <Text className="text-red-500 text-center font-semibold">
                  {verification.error}
                </Text>
              )}
              <TouchableOpacity
                onPress={onVerifyPress}
                className="flex-row items-center justify-center space-x-2 bg-[#4F46E5] py-3 px-6 rounded-full active:bg-blue-700 mt-4"
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={24}
                  color="white"
                />
                <Text className="text-white font-semibold text-2xl pl-2">
                  Verify Email
                </Text>
              </TouchableOpacity>
            </View>
          </ReactNativeModal>
          <ReactNativeModal
            isVisible={showSuccessModal}
            className="flex items-center justify-center"
          >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] w-[90%] max-w-md shadow-lg">
              <View className="items-center">
                <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
              </View>
              <Text className="text-3xl font-JakartaBold text-center mt-4 text-gray-900">
                Verified
              </Text>
              <Text className="text-base text-gray-500 font-Jakarta text-center mt-2">
                You have successfully verified your account.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowSuccessModal(false);
                  router.push("/(root)/(tabs)/home");
                }}
                className="mt-6 bg-[#4CAF50] rounded-full py-3 px-6"
              >
                <Text className="text-white text-lg font-bold  text-center ">
                  Browse Home
                </Text>
              </TouchableOpacity>
            </View>
          </ReactNativeModal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
