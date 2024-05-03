import { View, Text } from "@/components/Themed";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";

const RootIndex = () => {
  const { session, loadingSession, isAdmin } = useAuth();

  if (loadingSession) return <ActivityIndicator size="small" />;

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
