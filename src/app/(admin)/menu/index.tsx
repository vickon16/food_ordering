import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import ProductListItem from "@/components/ProductListItem";
import products from "@/constants/appData/products";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { FlatList, Pressable } from "react-native";

export default function MenuScreen() {
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
