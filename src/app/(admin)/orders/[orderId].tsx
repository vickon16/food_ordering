import { useQueryOrderId, useUpdateOrder } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscription";
import ActivityIndicatorCenter from "@/components/ActivityIndicatorCenter";
import OrderDisplayItem from "@/components/OrderDisplayItem";
import OrderListItem from "@/components/OrderListItem";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { orderStatusList } from "@/constants/appData/orders";
import { Status } from "@/types";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

const OrderIdScreen = () => {
  const { orderId } = useLocalSearchParams();
  const id = typeof orderId === "string" ? orderId : orderId[0];
  const { data: order, isLoading, error } = useQueryOrderId(parseFloat(id));
  const updateOrder = useUpdateOrder();
  const [activeStatus, setActiveStatus] = useState<Status>(
    order?.status || "New"
  );

  useUpdateOrderSubscription(parseFloat(id));

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

      <View>
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
            ListFooterComponent={() => (
              <>
                <Text style={{ fontWeight: "bold" }}>Status</Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  {orderStatusList.map((status) => (
                    <Text
                      key={status}
                      onPress={() => {
                        setActiveStatus(status);
                        updateOrder.mutate({ id: parseFloat(id), status });
                      }}
                      style={{
                        ...styles.orderStatusText,
                        backgroundColor:
                          activeStatus === status
                            ? Colors.light.tint
                            : "transparent",
                        color:
                          activeStatus === status ? "white" : Colors.light.tint,
                      }}
                    >
                      {status}
                    </Text>
                  ))}
                </View>
              </>
            )}
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
  orderStatusText: {
    borderColor: Colors.light.tint,
    borderWidth: 1,
    padding: 8,
    fontSize: 12,
    borderRadius: 5,
    marginVertical: 10,
  },
});
