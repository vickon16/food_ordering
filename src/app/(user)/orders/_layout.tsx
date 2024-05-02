import { Stack } from "expo-router";
import React from "react";

const OrdersLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="[orderId]" />
    </Stack>
  );
};

export default OrdersLayout;
