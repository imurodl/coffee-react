import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialSlice: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
  featuredProducts: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState: initialSlice,
  reducers: {
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
  },
});

export const { setPopularDishes, setNewDishes, setTopUsers, setFeaturedProducts } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
