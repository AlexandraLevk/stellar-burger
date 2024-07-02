import { TUser } from '@utils-types';

import userSlice, {
  setAuthChecked,
  setUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  initialState
} from '../userSlice';

describe('тесты для userSlice', () => {
  const testRegisterData = {
    email: 'register@test.com',
    name: 'registerName',
    password: '88888'
  };

  const testUser: TUser = {
    email: 'test@test.com',
    name: 'testName'
  };

  const testUserUpdated: TUser = {
    email: 'testUPD@test.com',
    name: 'testNameUPD'
  };

  it('проверка setAuthChecked', () => {
    const actualState = userSlice(initialState, setAuthChecked(true));
    expect(actualState).toEqual({ ...initialState, isAuthChecked: true });
  });

  it('проверка setUser', () => {
    const actualState = userSlice(initialState, setUser(testUser));
    expect(actualState).toEqual({
      ...initialState,
      user: testUser,
      isAuthenticated: true
    });
  });

  it('проверка состояния при запросе registerUser (pending)', () => {
    const actualState = userSlice(
      { ...initialState, loginUserError: 'Test error' },
      registerUser.pending('', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      loadingData: true,
      loginUserError: null
    });
  });

  it('проверка состояния при ошибке registerUser (rejected)', () => {
    const actualState = userSlice(
      { ...initialState, loadingData: true },
      registerUser.rejected(new Error('testError'), '', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      loadingData: false,
      loginUserError: 'testError'
    });
  });

  it('проверка состояния при успешном выполнении registerUser (fulfilled)', () => {
    const actualState = userSlice(
      { ...initialState, loadingData: true },
      registerUser.fulfilled(testUser, '', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      loadingData: false,
      loginUserError: null,
      user: testUser
    });
  });

  it('проверка состояния при запросе loginUser (pending)', () => {
    const actualState = userSlice(
      { ...initialState, loginUserError: 'Test error' },
      loginUser.pending('', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      loginUserRequest: true,
      loginUserError: null
    });
  });

  it('проверка состояния при ошибке loginUser (rejected)', () => {
    const actualState = userSlice(
      { ...initialState, loginUserRequest: true },
      loginUser.rejected(new Error('testError'), '', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      loginUserRequest: false,
      loginUserError: 'testError',
      isAuthChecked: true
    });
  });

  it('проверка состояния при успешном выполнении loginUser (fulfilled)', () => {
    const actualState = userSlice(
      { ...initialState, loginUserRequest: true },
      loginUser.fulfilled(testUser, '', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      loginUserRequest: false,
      loginUserError: null,
      user: testUser,
      isAuthChecked: true,
      isAuthenticated: true
    });
  });

  it('проверка состояния при запросе updateUser (pending)', () => {
    const actualState = userSlice(
      {
        ...initialState,
        isAuthChecked: true,
        isAuthenticated: true,
        user: testUser,
        loginUserError: 'Test error'
      },
      updateUser.pending('', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      user: testUser,
      loginUserError: null,
      loadingData: true
    });
  });

  it('проверка состояния при ошибке updateUser (rejected)', () => {
    const actualState = userSlice(
      {
        ...initialState,
        isAuthChecked: true,
        isAuthenticated: true,
        user: testUser,
        loadingData: true
      },
      updateUser.rejected(new Error('testError'), '', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      user: testUser,
      loadingData: false,
      loginUserError: 'testError'
    });
  });

  it('проверка состояния при успешном выполнении updateUser (fulfilled)', () => {
    const actualState = userSlice(
      {
        ...initialState,
        isAuthChecked: true,
        isAuthenticated: true,
        user: testUser,
        loadingData: true
      },
      updateUser.fulfilled(testUserUpdated, '', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      user: testUserUpdated,
      loadingData: false,
      loginUserError: null
    });
  });

  it('проверка состояния при запросе logoutUser (pending)', () => {
    const actualState = userSlice(
      {
        ...initialState,
        isAuthChecked: true,
        isAuthenticated: true,
        user: testUser,
        loginUserError: 'Test error'
      },
      logoutUser.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      user: testUser,
      loginUserError: null,
      loadingData: true
    });
  });

  it('проверка состояния при ошибке logoutUser (rejected)', () => {
    const actualState = userSlice(
      {
        ...initialState,
        isAuthChecked: true,
        isAuthenticated: true,
        user: testUser,
        loadingData: true
      },
      logoutUser.rejected(new Error('testError'), '')
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      user: testUser,
      loadingData: false,
      loginUserError: 'testError'
    });
  });

  it('проверка состояния при успешном выполнении logoutUser (fulfilled)', () => {
    const actualState = userSlice(
      {
        ...initialState,
        isAuthChecked: true,
        isAuthenticated: true,
        user: testUser,
        loadingData: true
      },
      logoutUser.fulfilled(undefined, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: false,
      user: null,
      loadingData: false,
      loginUserError: null
    });
  });
});
