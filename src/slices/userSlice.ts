import {
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie, getCookie } from '../utils/cookie';

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(userSlice.actions.setUser(res.user)))
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: TRegisterData) => {
    const res = await registerUserApi({ name, email, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const res = await loginUserApi({ email, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: TRegisterData) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  loginUserError?: string | null;
  loginUserRequest: boolean;
  loadingData: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false,
  loadingData: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
  selectors: {
    getUserSelector: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked,
    authenticatedSelector: (state) => state.isAuthenticated
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserError = null;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.loadingData = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loadingData = false;
        state.loginUserError = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loadingData = false;
        state.loginUserError = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loadingData = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loadingData = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loadingData = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loadingData = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loadingData = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loadingData = false;
      });
  }
});

// export const checkUserAuth = createAsyncThunk(
//   'auth/checkUserAuth',
//   async (_, { dispatch }) => {
//     if (getCookie('accessToken')) {
//       getUserApi()
//         // .then((res) => dispatch(userSlice.actions.setUser(res.user)))
//         // .catch(() => {
//         //   deleteCookie('accessToken');
//         //   localStorage.removeItem('refreshToken');
//         // })
//         .finally(() => dispatch(userSlice.actions.setAuthChecked(true)));
//     } else {
//       dispatch(userSlice.actions.setAuthChecked(true));
//     }
//   }
// );

export const { setAuthChecked } = userSlice.actions;
export const { getUserSelector, getAuthChecked, authenticatedSelector } =
  userSlice.selectors;
export default userSlice.reducer;
