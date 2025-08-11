import {configureStore} from '@reduxjs/toolkit';
import colorSchemeReducer from './slices/colorScheme';
import userReducer from './slices/user';
import globalErrorReducer from './slices/globalError';
import businessViewTypeReducer from './slices/businessViewType';
import articleReducer from './slices/article';

export const store = configureStore({
  reducer: {
    colorScheme: colorSchemeReducer,
    user: userReducer,
    globalError: globalErrorReducer,
    businessViewType: businessViewTypeReducer,
    article: articleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
