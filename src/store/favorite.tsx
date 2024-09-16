import { Action, createSlice } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { RootState } from ".";

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
      return state.filter((item: any) => item.id !== action.payload.id);
    },
  },
});

export const sendFavorite = (
  favorite: any
): ThunkAction<void, RootState, null, Action<string>> => {
  return async () => {
    const sendRequest = async () => {
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
    };

    await sendRequest();
  };
};

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
