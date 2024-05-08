import { useQueryProductId } from "@/api/products";
import Button from "@/components/Button";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultPizzaImage } from "@/constants/appData/products";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductIdScreen = () => {
  const { onAddItem } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const { menuId } = useLocalSearchParams();
  const id = typeof menuId === "string" ? menuId : menuId[0];
  const { data: product, error, isLoading } = useQueryProductId(id);

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.light.text} />
      </View>
    );

  if (error || !product) return <Text>Product not found</Text>;

  const addToCart = () => {
    onAddItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product.name,
        }}
      />

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
        />
      </View>

      <Text>Select size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Text
            style={{
              ...styles.size,
              backgroundColor: selectedSize === size ? "gainsboro" : "white",
              color: selectedSize === size ? "black" : "gray",
            }}
            key={size}
            onPress={() => setSelectedSize(size)}
          >
            {size}
          </Text>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>${product.price}</Text>
        <Button onPress={addToCart} text="Add to Cart" />
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
    marginVertical: 10,
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
  },
  image: {
    width: "80%",
    aspectRatio: 1,
    objectFit: "contain",
  },
  sizes: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  size: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    marginTop: "auto",
  },
});
