import CartListItem from "@/components/CartListItem";
import OrderListItem from "@/components/OrderListItem";
import { Text, View } from "@/components/Themed";
import orders from "@/constants/appData/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

const OrderIdScreen = () => {
  const { orderId } = useLocalSearchParams();

  const order = orders.find((order) => order.id === orderId);
  if (!order) return <Text>Order Not found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Order ${order.id}`,
        }}
      />

      <OrderListItem order={order} />

      <View>
        {order.order_items.length === 0 ? (
          <Text style={styles.noOrderText}>No order Items</Text>
        ) : (
          <FlatList
            data={order.order_items}
            renderItem={({ item }) => (
              <CartListItem key={item.id} cartItem={item} noFunction />
            )}
            contentContainerStyle={{
              padding: 10,
              gap: 10,
            }}
            // ListHeaderComponent={() => <></> }
            // ListFooterComponent={() => <></> }
          />
        )}
      </View>
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
