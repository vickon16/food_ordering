import { Stack } from "expo-router";
import React from "react";

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="[menuId]" />
      <Stack.Screen name="create" />
    </Stack>
  );
};

export default MenuLayout;
