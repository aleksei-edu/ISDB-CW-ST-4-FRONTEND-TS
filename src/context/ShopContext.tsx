import { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "../lib/types";
import { useGetProducts } from "../hooks/useGetProducts";
import axiosClient from "../utils/axiosConf";
import { useGetToken } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { ErrorContext, IErrorContext } from "./ErrorContext";

export interface IShopContext {
  getTotalCartItemsCount: () => number;
  getCartItemsCount: (itemId: number) => number;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  updateCartItem: (itemId: number, quantity: number) => void;
  getTotalCartAmount: () => number;
  checkout: () => void;
}

const defaultValue: IShopContext = {
  getTotalCartItemsCount: () => 0,
  getCartItemsCount: () => 0,
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItem: () => null,
  getTotalCartAmount: () => 0,
  checkout: () => null,
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
  const { products } = useGetProducts({ setLoading: setLoading });

  const { headers } = useGetToken();

  const navigate = useNavigate();

  const { addError } = useContext<IErrorContext>(ErrorContext);

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
      const product = products.find((product) => product.id === item.id);
      if (product && item.quantity < product.quantity) {
        item.quantity++;
        setCartItems([...cartItems]);
      } else {
        item.quantity = product.quantity;
        setCartItems([...cartItems]);
      }
    } else {
      setCartItems([...cartItems, { id: itemId, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      if (item.quantity > 0) {
        item.quantity--;
        setCartItems([...cartItems]);
        if (item.quantity === 0) {
          setCartItems(cartItems.filter((item) => item.id !== itemId));
        }
      }
    } else {
      setCartItems([...cartItems, { id: itemId, quantity: 1 }]);
    }
  };

  const updateCartItem = (itemId: number, quantity: number) => {
    if (quantity < 0) {
      return;
    }
    const item = cartItems.find((item) => item.id === itemId);
    const product = products.find((product) => product.id === item.id);
    if (item && product && quantity <= product.quantity) {
      item.quantity = quantity;
      setCartItems([...cartItems]);
      if (item.quantity === 0) {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
      }
    } else if (item && product && quantity > product.quantity) {
      item.quantity = product.quantity;
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

  const checkout = async () => {
    try {
      await axiosClient.post("/checkout", cartItems, { headers });
      setCartItems([]);
      navigate("/");
    } catch (err) {
      console.error(err);
      addError(err.message);
    }
  };

  const contextValue: IShopContext = {
    getTotalCartItemsCount: getTotalCartItemsCount,
    getCartItemsCount: getCartItemsCount,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateCartItem: updateCartItem,
    getTotalCartAmount: getTotalCartAmount,
    checkout: checkout,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
