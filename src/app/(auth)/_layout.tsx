import { Stack } from "expo-router";
import React from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{
          title: "Sign In",
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
        }}
      />
    </Stack>
  );
}
