import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi
} from '../utils/burger-api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchFeeds = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

export const fetchUserOrders = createAsyncThunk('userOrders/getAll', async () =>
  getOrdersApi()
);

type TFeedsState = {
  feeds: Array<TOrder>;
  userOrders: Array<TOrder>;
  loading: boolean;
  error?: string | null;
  total: number;
  totalToday: number;
};

export const initialState: TFeedsState = {
  feeds: [],
  userOrders: [],
  loading: false,
  error: null,
  total: 0,
  totalToday: 0
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => state,
    getOrdersSelector: (state) => state.feeds,
    getUserOrdersSelector: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      });
  }
});

export default feedsSlice.reducer;
export const { getFeedSelector, getOrdersSelector, getUserOrdersSelector } =
  feedsSlice.selectors;
