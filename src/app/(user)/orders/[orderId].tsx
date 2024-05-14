import { useQueryOrderId } from "@/api/orders";
import ActivityIndicatorCenter from "@/components/ActivityIndicatorCenter";
import CartListItem from "@/components/CartListItem";
import OrderDisplayItem from "@/components/OrderDisplayItem";
import OrderListItem from "@/components/OrderListItem";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

const OrderIdScreen = () => {
  const { orderId } = useLocalSearchParams();
  const id = typeof orderId === "string" ? orderId : orderId[0];
  const { data: order, isLoading, error } = useQueryOrderId(parseFloat(id));

  if (isLoading) return <ActivityIndicatorCenter />;

  if (error || !order) return <Text>Failed to fetch order</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Order ${order.id}`,
        }}
      />

      <OrderListItem order={order} />

      <>
        {order.order_items.length === 0 ? (
          <Text style={styles.noOrderText}>No order Items</Text>
        ) : (
          <FlatList
            data={order.order_items}
            renderItem={({ item }) => (
              <OrderDisplayItem key={item.id} orderItem={item} />
            )}
            contentContainerStyle={{
              padding: 10,
              gap: 10,
            }}
            // ListHeaderComponent={() => <></> }
            // ListFooterComponent={() => <></> }
          />
        )}
      </>
    </View>
  );
};

export default OrderIdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noOrderText: {
    color: "gray",
    alignSelf: "center",
    marginVertical: 10,
  },
});
