import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, Image, Platform, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const { items, totalPrice, totalQuantity, clearCart } = useCart();
  const insertOrder = useInsertOrder();
  const router = useRouter();

  const checkout = () => {
    insertOrder.mutate(
      {
        newOrder: { total: totalPrice },
        orderItems: items.map((items) => {
          const { product, ...rest } = items;
          return rest;
        }),
      },
      {
        onSuccess: () => {
          clearCart();
          router.push(`/(user)/orders`);
        },
      }
    );
  };

  if (insertOrder.error) {
    console.warn(insertOrder.error.message);
  }

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/images/empty-cart.png")}
            style={{ width: 180, height: 180 }}
          />
          <Text style={styles.emptyContainerText}>Your cart is Empty</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <CartListItem key={item.id} cartItem={item} />
          )}
          contentContainerStyle={{
            padding: 10,
            gap: 10,
          }}
        />
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalMediumText}>
          Qtn : <Text style={styles.totalBoldText}>{totalQuantity}</Text>
        </Text>
        <Text style={styles.totalMediumText}>
          Total : <Text style={styles.totalBoldText}>${totalPrice}</Text>
        </Text>
      </View>

      <Button
        text={insertOrder.isPending ? "Checking Out..." : "Checkout"}
        onPress={checkout}
        disabled={insertOrder.isPending}
      />

      {/* Use a light status bar on iOS to account for the black space above the cart */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "gray",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
  },
  totalMediumText: {
    fontSize: 16,
    fontWeight: "500",
  },
  totalBoldText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
