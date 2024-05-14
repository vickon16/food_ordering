import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";
import { supabase } from "./supabase";
import { decode } from "base64-arraybuffer";

export const uploadImage = async (image: string) => {
  if (!image?.startsWith("file://")) {
    return null;
  }

  const base64 = await FileSystem.readAsStringAsync(image, {
    encoding: "base64",
  });
  const filePath = `${uuid.v4()}.png`;
  const contentType = "image/png";
  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(filePath, decode(base64), { contentType });

  if (error) {
    console.warn(error.message);
    return null;
  }

  if (!data) return null;
  return data.path;
};
