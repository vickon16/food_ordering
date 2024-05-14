import { useQueryProductId } from "@/api/products";
import ActivityIndicatorCenter from "@/components/ActivityIndicatorCenter";
import RemoteImage from "@/components/RemoteImage";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultPizzaImage } from "@/constants/appData/products";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

const ProductIdScreen = () => {
  const { menuId } = useLocalSearchParams();
  const id = typeof menuId === "string" ? menuId : menuId[0];
  const { data: product, error, isLoading } = useQueryProductId(id);

  if (isLoading) return <ActivityIndicatorCenter />;

  if (error || !product) return <Text>Product not found</Text>;

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
        <RemoteImage
          fallback={defaultPizzaImage}
          path={product.image}
          style={styles.image}
          resizeMode="contain"
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
