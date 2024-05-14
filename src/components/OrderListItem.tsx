import { Tables } from "@/types";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useSegments } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import dayjs from "dayjs";

type Props = {
  order: Tables<"orders">;
};

dayjs.extend(relativeTime);

const OrderListItem = ({ order }: Props) => {
  const segments = useSegments();

  return (
    <Link
      href={
        segments[0] === "(admin)"
          ? `/(admin)/orders/${order.id}`
          : `/(user)/orders/${order.id}`
      }
      asChild
    >
      <Pressable style={styles.container}>
        <View style={styles.leftRightContainer}>
          <Text style={styles.leftMainText}>Order #{order.id}</Text>
          <Text style={styles.leftSubtleText}>
            {dayjs(order.created_at).fromNow()}
          </Text>
        </View>

        <View style={styles.leftRightContainer}>
          <Text style={styles.rightMainText}>{order.status}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftRightContainer: {
    gap: 10,
  },
  leftMainText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  leftSubtleText: {
    color: "gray",
  },

  rightMainText: {
    fontWeight: "600",
    fontSize: 14,
  },
});
