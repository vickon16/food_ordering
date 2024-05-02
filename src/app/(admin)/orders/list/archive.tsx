import { HeaderLeft } from "@/components/Icons";
import OrderListItem from "@/components/OrderListItem";
import orders from "@/constants/appData/orders";
import { Stack } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

const Orders = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "InActive",
        }}
      />

      <FlatList
        keyExtractor={(item) => item.id}
        data={orders}
        renderItem={({ item }) => <OrderListItem key={item.id} order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};

export default Orders;
