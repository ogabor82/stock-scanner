import { createSlice } from "@reduxjs/toolkit";

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
export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
