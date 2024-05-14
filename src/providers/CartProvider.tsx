import { CartItem, QuantityAction, Sizes, Tables } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import uuid from "react-native-uuid";

export type CartType = {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  onAddItem: (product: Tables<"products">, size: Sizes) => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (action: QuantityAction, id: string) => void;
  clearCart: () => void;
};

const cartInitialState: CartType = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  onAddItem: () => {},
  onRemoveItem: () => {},
  onUpdateQuantity: () => {},
  clearCart: () => {},
};

const CartContext = createContext<CartType>(cartInitialState);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const totalPrice = Number(
    items
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2)
  );
  const totalQuantity = Number(
    items.reduce((acc, item) => acc + item.quantity, 0).toFixed(2)
  );

  const clearCart = () => {
    setItems([]);
  };

  const onAddItem = (product: Tables<"products">, size: Sizes) => {
    const newCartItem: CartItem = {
      id: uuid.v4() as string,
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    const itemExists = items.find(
      (item) => item.product_id === product.id && item.size === size
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
        console.warn("Invalid action");
        break;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        totalQuantity,
        onAddItem,
        onUpdateQuantity,
        onRemoveItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
