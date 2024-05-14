import Button from "@/components/Button";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Link, Redirect, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

const SignInScreen = () => {
  const { session } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (session) return <Redirect href="/" />;

  const signInWithEmail = async () => {
    if (!validateInput()) return;
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setIsLoading(false);
      return setError(error.message);
    }

    setIsLoading(false);
    resetFields();
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  const validateInput = (): boolean => {
    setError("");
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Sign In",
          headerShadowVisible: false,
        }}
      />

      <Text style={styles.headerText}>
        Sign In to {"\n"}
        <Text style={styles.headerTextMain}>Food Ordering</Text>
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry
          placeholder="password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Button
        disabled={isLoading}
        text={isLoading ? "Signin In..." : "Sign In"}
        onPress={signInWithEmail}
      />

      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Link href="/signup" style={styles.footerTextLink}>
          Create Account
        </Link>
      </Text>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "400",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 32,
  },
  headerTextMain: {
    fontSize: 24,
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  inputGroup: {
    gap: 4,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 4,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  label: {
    color: "gray",
    fontSize: 14,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    objectFit: "contain",
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    color: Colors.light.text,
    fontWeight: "500",
    fontSize: 14,
  },
  footerText: {
    marginVertical: 8,
    alignSelf: "center",
  },
  footerTextLink: {
    color: Colors.light.tint,
  },
});
