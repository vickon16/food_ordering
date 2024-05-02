import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "./useColorScheme";
import Colors from "@/constants/Colors";

export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export function HeaderLeft(props: {
  name?: React.ComponentProps<typeof FontAwesome>["name"];
  color?: keyof (typeof Colors)["light"];
}) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  return (
    <FontAwesome
      name={props.name || "chevron-left"}
      onPress={() => router.back()}
      size={16}
      color={Colors[colorScheme ?? "light"][props.color || "text"]}
      style={{ marginLeft: 12 }}
    />
  );
}
