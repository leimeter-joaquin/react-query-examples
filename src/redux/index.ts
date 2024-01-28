import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";

const store = configureStore({
  reducer: {
    test: testReducer,
  },
  devTools: true,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
