import { QueryData } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { supabase } from "./lib/supabase";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type QuantityAction = "inc" | "dec";

export type Sizes = Tables<"order_items">["size"];
export type Status = Tables<"orders">["status"];

export type CartItem = {
  id: string;
  product: Tables<"products">;
  product_id: string;
  size: Sizes;
  quantity: number;
};

export type Profile = {
  id: string;
  updated_at?: Date;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
  group: string;
};
