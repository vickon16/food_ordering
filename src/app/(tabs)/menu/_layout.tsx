import React from "react";
import { Stack } from "expo-router";

const MenuLayout = () => {
  return (
    <Stack screenOptions={{ title: "Menu", headerShadowVisible: false }} />
  );
};

export default MenuLayout;
