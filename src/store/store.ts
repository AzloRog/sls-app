import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/person/userSlice";
import interfaceReducer from "./features/interface/interfaceSlice";
import { postsService } from "./services/PostsService";

export const store = configureStore({
  reducer: {
    [postsService.reducerPath]: postsService.reducer,
    user: userReducer,
    interface: interfaceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
