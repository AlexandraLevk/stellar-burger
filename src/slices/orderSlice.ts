import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchOrderBurger = createAsyncThunk(
  'orders/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/getByNumberr',
  async (number: number) => getOrderByNumberApi(number)
);

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error?: string | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {
    onCloseOrderModal(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderModalDataSelector: (state) => state.orderModalData,
    getOrderRequestSelector: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.pending, (state) => {
        state.orderRequest = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.loading = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export default orderSlice.reducer;
export const { onCloseOrderModal } = orderSlice.actions;
export const { getOrderModalDataSelector, getOrderRequestSelector } =
  orderSlice.selectors;
