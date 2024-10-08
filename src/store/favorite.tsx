import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
  "favorite/fetchFavorites",
  async () => {
    const response = await fetch("http://localhost:3000/favorites");

    if (!response.ok) {
      throw new Error("Could not fetch favorite");
    }

    const data = await response.json();
    return data;
  }
);

export const sendFavorites = createAsyncThunk(
  "favorite/sendFavorites",
  async (favorite: any) => {
    const response = await fetch(
      "https://stock-scanner-6109b-default-rtdb.europe-west1.firebasedatabase.app/favorite.json",
      {
        method: "PUT",
        body: JSON.stringify(favorite),
      }
    );

    if (!response.ok) {
      throw new Error("Could not send favorite");
    }
  }
);

const favoriteInitialState: string[] = [];

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: favoriteInitialState,
  reducers: {
    addFavorite(state: any, action) {
      const isExist = state.find((item: any) => item === action.payload);
      if (!isExist) {
        state.push(action.payload);
      }
    },
    removeFavorite(state: any, action) {
      return state.filter((item: any) => item !== action.payload);
    },
    replaceFavorites(state: any, action) {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
    builder.addCase(sendFavorites.fulfilled, (state, action) => {
      return state;
    });
  },
});

export const { addFavorite, removeFavorite, replaceFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
