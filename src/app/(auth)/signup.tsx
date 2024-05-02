import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { Link, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const onSubmit = () => {
    if (!validateInput()) return;

    resetFields();
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
          secureTextEntry
          placeholder="email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Button text="Sign Up" onPress={onSubmit} />

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Link href="/(auth)/" style={styles.footerTextLink}>
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
