import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface InterfaceState {
  postsPage: number;
  isModalOpen: boolean;
}
const initialState: InterfaceState = {
  postsPage: 0,
  isModalOpen: false,
};
export const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    increasePostsPage: (state) => {
      state.postsPage++;
    },
    setPostPage: (state, action: PayloadAction<number>) => {
      state.postsPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsModalOpen, increasePostsPage, setPostPage } =
  interfaceSlice.actions;

export default interfaceSlice.reducer;
