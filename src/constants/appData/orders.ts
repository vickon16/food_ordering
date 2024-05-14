// import { Order } from "@/app/types";
import { CartItem } from "@/types";
import products, { Product } from "./products";
import dayjs from "dayjs";

const now = dayjs();

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export const orderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];

export type PizzaSize = "S" | "M" | "L" | "XL";

export type OrderItem = CartItem & {
  order_id: string;
};

export type Order = {
  id: string;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;
  order_items: OrderItem[];
};

const orders: Order[] = [
  {
    id: "23123",
    created_at: now.subtract(1, "hour").toISOString(),
    total: 31.4,
    status: "Cooking",
    user_id: "1",
    order_items: [
      {
        id: "71dm4428d-90a9-4227-ad04-e0vv59824b6b0",
        order_id: "23123",
        size: "M",
        quantity: 2,
        product: products[0],
        product_id: products[0].id,
      },
      {
        id: "246mm98d-90a9-4227-adff-e0vv5fc4b6b0",
        order_id: "23123",
        size: "L",
        quantity: 1,
        product: products[1],
        product_id: products[1].id,
      },
    ],
  },
  {
    id: "32145",
    created_at: now.subtract(3, "days").toISOString(),
    total: 11.4,
    status: "Delivered",
    user_id: "1",
    order_items: [
      {
        id: "1202cbf2-4020c-421a-aee4-958cc2043a77",
        order_id: "32145",
        size: "M",
        quantity: 2,
        product: products[3],
        product_id: products[3].id,
      },
    ],
  },
  {
    id: "22445",
    created_at: now.subtract(3, "weeks").toISOString(),
    total: 11.4,
    status: "Delivered",
    user_id: "1",
    order_items: [
      {
        id: "0jwb8ecf-934a-4da8-8366-4e92jj2e5ca4",
        order_id: "22445",
        size: "M",
        quantity: 1,
        product: products[3],
        product_id: products[3].id,
      },
      {
        id: "9jfb8ecf-9kki-4da8-8366-4e92jj2e5ca4",
        order_id: "22445",
        size: "M",
        quantity: 1,
        product: products[7],
        product_id: products[7].id,
      },
      {
        id: "9jfb8ecf-934a-4da8-8366-49ufjj2e5ca4",
        order_id: "22445",
        size: "L",
        quantity: 1,
        product: products[8],
        product_id: products[8].id,
      },
    ],
  },
];

export default orders;
