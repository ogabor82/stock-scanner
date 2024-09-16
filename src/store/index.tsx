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

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: { isAuthenticated: false },
  reducers: {
    login(state: any) {
      state.isAuthenticated = true;
    },
    logout(state: any) {
      state.isAuthenticated = false;
    },
  },
});

export const store = configureStore({
  reducer: {
    favorite: favoriteSlice.reducer,
    authentication: authenticationSlice.reducer,
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export const { login, logout } = authenticationSlice.actions;
export default store;
