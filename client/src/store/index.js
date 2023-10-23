import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can choose a storage method (e.g., local storage, AsyncStorage)
import { apiSlice } from "./api/apiSlice";
import dialogSlice from "./slices/dialog";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";

const persistConfig = {
  key: "root",
  storage,
};

// accepts a configuration object and the reducer to be persisted. The config object is used to specify how to persist and rehydrate the supplied reducer.
const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    dialog: dialogSlice.reducer,
    auth: authSlice.reducer,
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});

setupListeners(store.dispatch); //A utility used to enable refetchOnFocus and refetchOnReconnect behaviors.

export const persistedStore = persistStore(store);

export default store;
