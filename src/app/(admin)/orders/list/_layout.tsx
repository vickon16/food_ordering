import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const OrderListLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <TopTabs>
        <TopTabs.Screen name="index" />
        <TopTabs.Screen name="archive" />
      </TopTabs>
    </SafeAreaView>
  );
};

export default OrderListLayout;
