// import { Database } from './database.types';

// export type Tables<T extends keyof Database["public"]["Tables"]> =
//   Database["public"]["Tables"][T]["Row"];

// export type InsertTables<T extends keyof Database["public"]["Tables"]> =
//   Database["public"]["Tables"][T]["Insert"];

// export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
//   Database["public"]["Tables"][T]["Update"];

// export type Enums<T extends keyof Database["public"]["Enums"]> =
//   Database["public"]["Enums"][T];

export type Product = {
  id: string;
  image: string | null;
  name: string;
  price: number;
};

export type QuantityAction = "inc" | "dec";

export type PizzaSize = "S" | "M" | "L" | "XL";

export type CartItem = {
  id: string;
  product: Product;
  size: PizzaSize;
  quantity: number;
};

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export type Order = {
  id: string;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;
  order_items: OrderItem[];
};

export type OrderItem = CartItem & {
  order_id: string;
};

export type Profile = {
  id: string;
  group: string;
};
