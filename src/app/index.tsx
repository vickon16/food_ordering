import { View, Text } from "@/components/Themed";
import React from "react";
import Button from "../components/Button";
import { Link } from "expo-router";

const RootIndex = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)/menu"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)/menu"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/(auth)/signin"} asChild>
        <Button text="SignIn" />
      </Link>
    </View>
  );
};

export default RootIndex;
