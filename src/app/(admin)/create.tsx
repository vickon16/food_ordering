import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import products, { defaultPizzaImage } from "@/constants/appData/products";
import * as ImagePicker from "expo-image-picker";

const CreateProductScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;
    setImage(result.assets[0].uri);
  };

  const validateInput = (): boolean => {
    setError("");
    if (!name) {
      setError("Name is required");
      return false;
    }
    if (!price) {
      setError("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setError("Price must be a number");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!validateInput()) return;

    if (!!id) {
    } else {
    }

    resetFields();
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );
  };

  const onDelete = () => {
    if (!id) return;
    console.warn("delete");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: !!id ? "Updating Product" : "Create Product",
          headerLeft: () => (
            <FontAwesome5
              name="chevron-left"
              onPress={() => router.back()}
              size={16}
              color={Colors.light.text}
              style={{ marginLeft: 12 }}
            />
          ),
        }}
      />

      <View style={styles.inputGroup}>
        <Image
          source={{ uri: image || defaultPizzaImage }}
          style={styles.image}
        />
        <Text style={styles.textButton} onPress={pickImage}>
          Select an Image
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Price ($)</Text>
        <TextInput
          placeholder="9.99"
          keyboardType="numeric"
          style={styles.input}
          value={price}
          inputMode="numeric"
          onChangeText={setPrice}
        />
      </View>

      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Button text={!!id ? "Update" : "Create"} onPress={onSubmit} />
      {!!id && (
        <Text style={styles.textButton} onPress={confirmDelete}>
          Delete
        </Text>
      )}
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
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
});
