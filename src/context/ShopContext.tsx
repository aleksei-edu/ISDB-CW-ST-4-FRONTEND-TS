import { createContext, useEffect, useState } from "react";
import { CartItem } from "../lib/types";
import { useGetProducts } from "../hooks/useGetProducts";

export interface IShopContext {
  getTotalCartItemsCount: () => number;
  getCartItemsCount: (itemId: number) => number;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  updateCartItem: (itemId: number, quantity: number) => void;
  getTotalCartAmount: () => number;
}

const defaultValue: IShopContext = {
  getTotalCartItemsCount: () => 0,
  getCartItemsCount: () => 0,
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItem: () => null,
  getTotalCartAmount: () => 0,
};

export const ShopContext = createContext<IShopContext>(defaultValue);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const [loading, setLoading] = useState(true);
  const {products} = useGetProducts({ setLoading: setLoading });

  const getTotalCartItemsCount = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };
  const getCartItemsCount = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      return item.quantity;
    } else {
      return 0;
    }
  };

  const addToCart = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity++;
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { id: itemId, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity--;
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { id: itemId, quantity: 1 }]);
    }
  };

  const updateCartItem = (itemId: number, quantity: number) => {
    if (quantity < 0) {
      return;
    }
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { id: itemId, quantity: 1 }]);
    }
  };

  const getTotalCartAmount = () => {
    return cartItems.reduce((acc, item) => {
      const product = products.find((product) => product.id === item.id);
      if (product) {
        return acc + product.price * item.quantity;
      } else {
        return acc;
      }
    }, 0);
  };

  const contextValue: IShopContext = {
    getTotalCartItemsCount: getTotalCartItemsCount,
    getCartItemsCount: getCartItemsCount,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateCartItem: updateCartItem,
    getTotalCartAmount: getTotalCartAmount,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
