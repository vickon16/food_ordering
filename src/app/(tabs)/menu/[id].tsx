import Colors from "@/constants/Colors";
import products, { defaultPizzaImage } from "@/constants/appData/products";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import { useCallback, useState } from "react";
import CartButton from "@/components/CartButton";

const sizes = ["S", "M", "L", "XL"] as const;
type Size = (typeof sizes)[number];

const ProductIdScreen = () => {
  const [selectedSize, setSelectedSize] = useState<Size>("M");

  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id === id);
  if (!product) return <Text>Product not found</Text>;

  const addToCart = () => {
    console.warn("Added to cart", product.id, selectedSize);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />

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
        <CartButton onPress={addToCart} text="Add to Cart" />
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
