import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/person/userSlice";
import interfaceReducer from "../features/interface/interfaceSlice";
import { supabaseApi } from "../services/supabase";

export const store = configureStore({
  reducer: {
    [supabaseApi.reducerPath]: supabaseApi.reducer,
    user: userReducer,
    interface: interfaceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
