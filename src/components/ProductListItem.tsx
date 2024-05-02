import { Product } from "@/types";
import { Image, Pressable, StyleSheet } from "react-native";
import { Link, useSegments } from "expo-router";

import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultPizzaImage } from "../constants/appData/products";

type Props = {
  product: Product;
};

const ProductListItem = ({ product }: Props) => {
  const segments = useSegments();

  return (
    <Link
      href={
        segments[0] === "(admin)"
          ? `/(admin)/menu/${product.id}`
          : `/(user)/menu/${product.id}`
      }
      asChild
    >
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    objectFit: "contain",
  },
});
