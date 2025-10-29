import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteRecipes: [], // Updated to handle favorite articles
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {

    toggleFavorite: (state, action) => {
      const recipe = action.payload; // Expecting the entire article object
      const existingIndex = state.favoriteRecipes.findIndex(
        (item) => item.idFood === recipe.idFood // Assuming articles have an 'id' property
      );
      if (existingIndex > -1) {
        state.favoriteRecipes.splice(existingIndex, 1); // Remove from favorites
      } else {
        state.favoriteRecipes.push(recipe); // Add to favorites
      }
    },

   
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
