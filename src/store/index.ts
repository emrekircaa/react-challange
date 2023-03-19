import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../feature/cartSlices";
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDistpach = typeof store.dispatch;
