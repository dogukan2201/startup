import { Tabs } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1c1c1e",
          height: 80,
          position: "relative",
          bottom: 0,
          width: "100%",
          elevation: 5,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#4F46E5" : "transparent",
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="home"
                size={focused ? 30 : 24}
                color={focused ? "#fff" : "#c4c4c4"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#4F46E5" : "transparent",
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="person"
                size={focused ? 30 : 24}
                color={focused ? "#fff" : "#c4c4c4"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="hairModels"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#4F46E5" : "transparent",
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="cut"
                size={focused ? 30 : 24}
                color={focused ? "#fff" : "#c4c4c4"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="barbers"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#4F46E5" : "transparent",
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="people-circle-outline"
                size={focused ? 30 : 24}
                color={focused ? "#fff" : "#c4c4c4"}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
