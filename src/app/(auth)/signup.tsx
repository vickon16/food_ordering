import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { Link, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "@/components/Themed";
import { Alert, StyleSheet, TextInput } from "react-native";

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signUpWithEmail = async () => {
    if (!validateInput()) return;
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setIsLoading(false);
      return setError(error.message);
    }

    router.push("/");
    setIsLoading(false);
    resetFields();
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Sign Up",
          headerShadowVisible: false,
        }}
      />

      <Text style={styles.headerText}>
        Sign Up to {"\n"}
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
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          secureTextEntry
          placeholder="confirm password"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Button
        text={isLoading ? "Creating..." : "Create Account"}
        disabled={isLoading}
        onPress={signUpWithEmail}
      />

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Link href="/signin" style={styles.footerTextLink}>
          Sign In
        </Link>
      </Text>
    </View>
  );
};

export default SignUpScreen;

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
