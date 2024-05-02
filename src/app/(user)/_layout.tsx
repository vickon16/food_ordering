import React from "react";
import { Tabs } from "expo-router";

import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cutlery" color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
