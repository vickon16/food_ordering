import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const ProductIdScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: "Details" }} />
      <Text>ProductIdScreen ${id}</Text>
    </View>
  );
};

export default ProductIdScreen;
