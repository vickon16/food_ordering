import { useQueryProducts } from "@/api/products";
import ActivityIndicatorCenter from "@/components/ActivityIndicatorCenter";
import ProductListItem from "@/components/ProductListItem";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { FlatList, Pressable } from "react-native";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useQueryProducts();

  if (isLoading) return <ActivityIndicatorCenter />;
  if (error) return <Text>Failed to fetch products</Text>;

  console.log(products);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <View
              style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
            >
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
              <Text
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  backgroundColor: Colors.light.text,
                  color: Colors.light.background,
                  borderRadius: 4,
                  fontSize: 12,
                }}
                onPress={async () => await supabase.auth.signOut()}
              >
                Sign Out
              </Text>
            </View>
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
