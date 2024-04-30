import { View } from "@/components/Themed";
import ProductListItem from "@/constants/ProductListItem";
import products from "@/constants/appData/products";
import { FlatList, ScrollView } from "react-native";

export default function MenuScreen() {
  return (
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
  );
}
