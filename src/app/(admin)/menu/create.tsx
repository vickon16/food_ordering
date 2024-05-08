import {
  useDeleteProduct,
  useInsertProduct,
  useQueryProductId,
  useUpdateProduct,
} from "@/api/products";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { defaultPizzaImage } from "@/constants/appData/products";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";

const CreateProductScreen = () => {
  const router = useRouter();
  const { menuId } = useLocalSearchParams();
  const id = menuId
    ? typeof menuId === "string"
      ? menuId
      : menuId[0]
    : undefined;
  const { data: defaultProduct } = useQueryProductId(id);

  const [name, setName] = useState(defaultProduct?.name || "");
  const [price, setPrice] = useState(defaultProduct?.price.toString() || "");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(
    defaultProduct?.image || null
  );

  const insertProduct = useInsertProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

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

  const settled = {
    onSettled: () => {
      resetFields();
      router.replace("/(admin)/menu");
    },
    onError: () => {
      setError("Error Mutating Data");
    },
  };

  const onSubmit = () => {
    if (!validateInput()) return;

    if (!!id) {
      updateProduct.mutate(
        { id, name, price: parseFloat(price), image },
        settled
      );
    } else {
      insertProduct.mutate({ name, price: parseFloat(price), image }, settled);
    }
  };

  const confirmDelete = () => {
    if (!id) return;
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteProduct.mutate(id, settled);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: !!id ? "Updating Product" : "Create Product",
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

      {(insertProduct.error || error) && (
        <Text style={{ color: "red" }}>{error}</Text>
      )}
      <Button
        text={
          !!id
            ? updateProduct.isPending
              ? "Updating..."
              : "Update"
            : insertProduct.isPending
            ? "Creating..."
            : "Create"
        }
        disabled={updateProduct.isPending || insertProduct.isPending}
        onPress={onSubmit}
      />
      {!!id && (
        <Text
          style={styles.textButton}
          disabled={deleteProduct.isPending}
          onPress={confirmDelete}
        >
          {deleteProduct.isPending ? "Deleting..." : "Delete"}
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
