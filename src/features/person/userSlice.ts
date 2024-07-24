import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

export interface UserState {
  isAuth: boolean;
  session: Session | null;
}
const initialState: UserState = {
  isAuth: false,
  session: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
  },
});

export const { setIsAuth, setSession } = userSlice.actions;

export default userSlice.reducer;
