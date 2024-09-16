import { configureStore } from "@reduxjs/toolkit";
import favoriteSliceReducer from "./favorite";
import authenticationSliceReducer from "./auth";

export const store = configureStore({
  reducer: {
    favorite: favoriteSliceReducer,
    authentication: authenticationSliceReducer,
  },
});

export type RootState = ReturnType<typeof favoriteSliceReducer>;

export default store;
