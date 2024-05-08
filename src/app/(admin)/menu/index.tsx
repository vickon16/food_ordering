import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import ProductListItem from "@/components/ProductListItem";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { ActivityIndicator, FlatList, Pressable } from "react-native";
import { useQueryProducts } from "@/api/products";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useQueryProducts();

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.light.text} />
      </View>
    );

  if (error) return <Text>Failed to fetch products</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
                    size={25}
                    color={Colors.light.text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <FlatList
        keyExtractor={(item) => item.id}
        data={products}
        renderItem={({ item }) => (
          <ProductListItem key={item.id} product={item} />
        )}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
