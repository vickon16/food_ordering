import { Tables } from "@/types";
import { Image, Pressable, StyleSheet } from "react-native";
import { Link, useSegments } from "expo-router";

import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultPizzaImage } from "../constants/appData/products";
import RemoteImage from "./RemoteImage";

type Props = {
  product: Tables<"products">;
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
        <RemoteImage
          fallback={defaultPizzaImage}
          path={product.image}
          style={styles.image}
          resizeMode="contain"
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
    // backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
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
