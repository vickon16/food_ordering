import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useQueryProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useQueryProductId = (id: string | undefined) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["products", id],
    queryFn: async (): Promise<Product> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (newProduct: Omit<Product, "id">): Promise<Product> => {
      const { data, error } = await supabase
        .from("products")
        .insert(newProduct)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (newProduct: Product): Promise<Product> => {
      const { data, error } = await supabase
        .from("products")
        .update(newProduct)
        .eq("id", newProduct.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({
        queryKey: ["products", variables.id],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (productId: string) => {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);
      if (error) throw new Error(error.message);
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
