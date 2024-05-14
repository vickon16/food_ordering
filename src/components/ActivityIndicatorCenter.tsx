import { ActivityIndicator } from "react-native";
import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";

const ActivityIndicatorCenter = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.light.tint} />
    </View>
  );
};

export default ActivityIndicatorCenter;
