import ActivityIndicatorCenter from "@/components/ActivityIndicatorCenter";
import { View } from "@/components/Themed";
import { useAuth } from "@/providers/AuthProvider";
import { Link, Redirect } from "expo-router";
import React from "react";
import Button from "../components/Button";

const RootIndex = () => {
  const { session, loadingSession, isAdmin } = useAuth();

  if (loadingSession) return <ActivityIndicatorCenter />;

  if (!session) {
    return <Redirect href={"/signin"} />;
  }

  if (!isAdmin) {
    return <Redirect href={"/(user)/menu"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)/menu"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)/menu"} asChild>
        <Button text="Admin" />
      </Link>
    </View>
  );
};

export default RootIndex;
