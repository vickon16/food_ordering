import { defaultPizzaImage } from "@/constants/appData/products";
import React from "react";
import { Text, View } from "@/components/Themed";
import { Image, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Tables } from "@/types";
import RemoteImage from "./RemoteImage";

type OrderDisplayItemProps = {
  orderItem: Tables<"order_items"> & { products: Tables<"products"> | null };
};

const OrderDisplayItem = ({ orderItem }: OrderDisplayItemProps) => {
  return (
    <View style={styles.container}>
      <RemoteImage
        fallback={defaultPizzaImage}
        path={orderItem.products?.image || defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <Text style={styles.title}>{orderItem.products?.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            ${orderItem.products?.price.toFixed(2)},
          </Text>
          <Text>Size: {orderItem.size}</Text>
        </View>
      </View>

      <View style={styles.functionSide}>
        <View style={styles.quantitySelector}>
          <Text style={[styles.quantity, { paddingRight: 10 }]}>
            {orderItem.quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    aspectRatio: 1,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  functionSide: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  removeText: {
    color: "gray",
    fontWeight: "600",
    fontSize: 12,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default OrderDisplayItem;
