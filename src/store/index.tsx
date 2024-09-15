import { createSlice, configureStore } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
    addFavorite(state: any, action) {
      state.push(action.payload);
    },
    removeFavorite(state: any, action) {
      return state.filter((item: any) => item.id !== action.payload.id);
    },
  },
});

export const store = configureStore({
  reducer: { favorite: favoriteSlice.reducer },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default store;
