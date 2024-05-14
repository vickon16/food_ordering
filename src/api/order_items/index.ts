import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["order_items"],
    mutationFn: async (newOrderItems: InsertTables<"order_items">) => {
      const { data, error } = await supabase
        .from("order_items")
        .insert(newOrderItems)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["order_items"] });
    },
  });
};
