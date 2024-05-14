import dayjs from "dayjs";

const now = dayjs();

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

export type Product = {
  created_at: string;
  id: string;
  image?: string;
  name: string;
  price: number;
};

const products = [
  {
    id: "1606342b-5a8e-4d2d-8967-fdb01aa249fa",
    name: "Ultimate Pepperoni",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png",
    price: 12.99,
    created_at: now.subtract(1, "hour").toISOString(),
  },
  {
    id: "a089adb6-7374-4d9a-92f8-2f98ad4e0720",
    name: "ExtravaganZZa",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png",
    price: 14.99,
    created_at: now.subtract(1, "hour").toISOString(),
  },
  {
    id: "fd2df404-785d-4299-803c-e20da65712e1",
    name: "MeatZZa",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png",
    price: 13.47,
    created_at: now.subtract(1, "hour").toISOString(),
  },
  {
    id: "74d9b27f-4f68-48d3-8a9f-e1e8765e10cd",
    name: "Margarita",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/margarita.png",
    price: 9.9,
    created_at: now.subtract(1, "hour").toISOString(),
  },
  {
    id: "8455d8ff-7ea1-4f1f-a0e1-6de9f68a7ba2",
    name: "Pacific Veggie",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png",
    price: 12.99,
    created_at: now.subtract(1, "hour").toISOString(),
  },
  {
    id: "cdbd63fd-2cc2-4791-aab3-d77105337692",
    name: "Hawaiian",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/hawaiin.png",
    price: 10.49,
    created_at: now.subtract(1, "hour").toISOString(),
  },
  {
    id: "71dfdb8d-70a9-4927-ad04-e069ffc4b6b0",
    name: "Deluxe",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/deluxe.png",
    price: 16.99,
    created_at: now.subtract(1, "hour").toISOString(),
  },
  {
    id: "157b4bf2-540c-421a-aee4-953aa7043a77",
    name: "BBQ Chicken",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png",
    price: 12.89,
    created_at: now.subtract(1, "hour").toISOString(),
  },
  {
    id: "1ccb4ecf-934a-4da8-8366-4a9281fe5ca4",
    name: "Chicken Bacon Ranch",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png",
    price: 13.99,
    created_at: now.subtract(1, "hour").toISOString(),
  },
  {
    id: "9a15ff4a-2935-4a52-b37c-9029e88a4a45",
    name: "6 Cheese",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/6cheese.png",
    price: 13.29,
    created_at: now.subtract(1, "hour").toISOString(),
  },
];

export default products;
