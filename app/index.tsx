import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";

const Home = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(root)/(barbers)/(tabs)/home"} />;
  }
  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
