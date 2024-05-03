import { defaultPizzaImage } from "@/constants/appData/products";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { useCart } from "../providers/CartProvider";
import { CartItem } from "../types";
import CartButton from "./Button";

type CartListItemProps = {
  cartItem: CartItem;
  noFunction?: boolean;
};

const CartListItem = ({ cartItem, noFunction }: CartListItemProps) => {
  const { onUpdateQuantity, onRemoveItem } = useCart();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: cartItem.product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            ${cartItem.product.price.toFixed(2)},
          </Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>

      <View style={styles.functionSide}>
        <View style={styles.quantitySelector}>
          {!noFunction && (
            <FontAwesome
              onPress={() => onUpdateQuantity("dec", cartItem.id)}
              name="minus"
              color="gray"
              style={{ padding: 5 }}
            />
          )}

          <Text
            style={[styles.quantity, { paddingRight: !noFunction ? 0 : 10 }]}
          >
            {cartItem.quantity}
          </Text>
          {!noFunction && (
            <FontAwesome
              onPress={() => onUpdateQuantity("inc", cartItem.id)}
              name="plus"
              color="gray"
              style={{ padding: 5 }}
            />
          )}
        </View>

        {!noFunction && (
          <Text
            style={styles.removeText}
            onPress={() => onRemoveItem(cartItem.id)}
          >
            remove
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
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

export default CartListItem;
