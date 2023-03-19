import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getItem } from "../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  cartQuantity: number;
}
export interface initlaState {
  cartItems: Product[];
  favItems: Product[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const initialState: initlaState = {
  cartItems: getItem("cartItems") || [],
  favItems: getItem("favItems") || [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state?.cartItems[existingIndex],
          cartQuantity: state?.cartItems[existingIndex]?.cartQuantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "top-right",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "top-right",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action: PayloadAction<Product>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info("Decreased product quantity", {
          position: "top-right",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        toast.error("Product removed from cart", {
          position: "top-right",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action: PayloadAction<Product>) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;
          toast.error("Product removed from cart", {
            position: "top-right",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "top-right" });
    },
    addFav(state, action: PayloadAction<Product>) {
      const existingIndex = state.favItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
      } else {
        state.favItems.push(action.payload);
        toast.success("Product added to Fav", {
          position: "top-right",
        });
      }
      localStorage.setItem("favItems", JSON.stringify(state.favItems));
    },
    removeFav(state, action: PayloadAction<Product>) {
      state.favItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.favItems.filter(
            (item) => item.id !== cartItem.id
          );
          state.favItems = nextCartItems;
          toast.info("Product removed to Fav", {
            position: "top-right",
          });
        }
        localStorage.setItem("favItems", JSON.stringify(state.favItems));
        return state;
      });
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  addFav,
  removeFromCart,
  getTotals,
  clearCart,
  removeFav,
} = cartReducer.actions;

export default cartReducer.reducer;
