import { CartItem, PizzaSize, Product, QuantityAction } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import uuid from "react-native-uuid";

export type CartType = {
  items: CartItem[];
  onAddItem: (product: Product, size: PizzaSize) => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (action: QuantityAction, id: string) => void;
};

const cartInitialState: CartType = {
  items: [],
  onAddItem: () => {},
  onRemoveItem: () => {},
  onUpdateQuantity: () => {},
};

const CartContext = createContext<CartType>(cartInitialState);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const onAddItem = (product: Product, size: PizzaSize) => {
    const newCartItem: CartItem = {
      id: uuid.v4() as string,
      product,
      size,
      quantity: 1,
    };

    const itemExists = items.find(
      (item) => item.product.id === product.id && item.size === size
    );
    if (itemExists) {
      return onUpdateQuantity("inc", itemExists.id);
    }

    return setItems((prev) => [newCartItem, ...prev]);
  };

  const onRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onUpdateQuantity = (action: QuantityAction, id: string) => {
    switch (action) {
      case "inc":
        setItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
        break;
      case "dec":
        setItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity <= 1 ? 1 : item.quantity - 1,
                }
              : item
          )
        );
        break;
      default:
        console.log("Invalid action");
        break;
    }
  };

  console.log(items);

  return (
    <CartContext.Provider
      value={{ items, onAddItem, onUpdateQuantity, onRemoveItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
