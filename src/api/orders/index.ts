import { Database } from "@/database.types";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables, Status, Tables, UpdateTables } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// npx supabase gen types typescript --project-id [projectId] > src/database.types.ts

export const useQueryAdminOrders = ({
  isArchived,
}: {
  isArchived: boolean;
}) => {
  const status: Status[] = isArchived
    ? ["Delivered"]
    : ["New", "Cooking", "Delivering"];

  return useQuery({
    queryKey: ["orders", { isArchived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .in("status", status)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useQueryMyOrders = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    enabled: !!id,
    queryKey: ["orders", { user_id: id }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("user_id", id!)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useQueryOrderId = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["orders", { id }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", id!)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  return useMutation({
    mutationFn: async ({
      newOrder,
      orderItems,
    }: {
      newOrder: InsertTables<"orders">;
      orderItems: Omit<InsertTables<"order_items">, "order_id">[];
    }) => {
      const { data, error } = await supabase
        .from("orders")
        .insert({
          ...newOrder,
          user_id: session?.user.id,
          orderItems: undefined,
        })
        .select()
        .single();
      if (error) throw new Error(error.message);

      const newMappedOrderItems = orderItems.map((item) => ({
        ...item,
        order_id: data.id,
      }));

      const { error: error2 } = await supabase
        .from("order_items")
        .insert(newMappedOrderItems)
        .select();

      if (error2) throw new Error(error2.message);

      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newOrder: UpdateTables<"orders"> & { id: number }) => {
      const { data, error } = await supabase
        .from("orders")
        .update(newOrder)
        .eq("id", newOrder.id);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({
        queryKey: ["orders", { id: variables.id }],
      });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
