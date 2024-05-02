import Colors from "@/constants/Colors";
import products, { defaultPizzaImage } from "@/constants/appData/products";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import { useState } from "react";
import Button from "@/components/Button";
import { PizzaSize } from "@/types";
import { useCart } from "@/providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { HeaderLeft } from "@/components/Icons";

const ProductIdScreen = () => {
  const { onAddItem } = useCart();
  const router = useRouter();

  const { menuId } = useLocalSearchParams();
  const product = products.find((product) => product.id === menuId);
  if (!product) return <Text>Product not found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <Link href={`/(admin)/menu/create?menuId=${menuId}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={18}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </View>
  );
};

export default ProductIdScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 8,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
    fontSize: 20,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  image: {
    width: "80%",
    aspectRatio: 1,
    objectFit: "contain",
  },
  footer: {
    marginTop: "auto",
  },
});
