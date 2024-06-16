import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from '../slices/ingredientsSlice';
import constructorSlice from '../slices/constructorSlice';
import feedsSlice from '../slices/feedsSlice';
import userSlice from '../slices/userSlice';
import orderSlice from '../slices/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: constructorSlice,
  feeds: feedsSlice,
  user: userSlice,
  userOrder: orderSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
