import { useQueryMyOrders } from "@/api/orders";
import ActivityIndicatorCenter from "@/components/ActivityIndicatorCenter";
import OrderListItem from "@/components/OrderListItem";
import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import React from "react";
import { FlatList } from "react-native";

const Orders = () => {
  const { data: orders, error, isLoading } = useQueryMyOrders();

  if (isLoading) return <ActivityIndicatorCenter />;

  if (error) return <Text>Failed to fetch orders</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Orders",
        }}
      />

      {orders?.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text style={{ color: "gray" }}>...You don't have any orders...</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={orders}
          renderItem={({ item }) => (
            <OrderListItem key={item.id} order={item} />
          )}
          contentContainerStyle={{ gap: 10, padding: 10 }}
        />
      )}
    </View>
  );
};

export default Orders;
