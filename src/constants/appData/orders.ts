// import { Order } from "@/app/types";
import { Order } from "@/types";
import products from "./products";
import dayjs from "dayjs";

const now = dayjs();

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
      },
      {
        id: "246mm98d-90a9-4227-adff-e0vv5fc4b6b0",
        order_id: "23123",
        size: "L",
        quantity: 1,
        product: products[1],
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
      },
      {
        id: "9jfb8ecf-9kki-4da8-8366-4e92jj2e5ca4",
        order_id: "22445",
        size: "M",
        quantity: 1,
        product: products[7],
      },
      {
        id: "9jfb8ecf-934a-4da8-8366-49ufjj2e5ca4",
        order_id: "22445",
        size: "L",
        quantity: 1,
        product: products[8],
      },
    ],
  },
];

export default orders;
