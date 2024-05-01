import { View, Text } from "@/components/Themed";
import React from "react";
import Button from "../components/Button";
import { Link } from "expo-router";

const RootIndex = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
    </View>
  );
};

export default RootIndex;
