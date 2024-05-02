import { Order } from "@/types";
import { Image, Pressable, StyleSheet } from "react-native";
import { Link, useSegments } from "expo-router";
import relativeTime from "dayjs/plugin/relativeTime";

import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import dayjs from "dayjs";

type Props = {
  order: Order;
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
    backgroundColor: "white",
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
