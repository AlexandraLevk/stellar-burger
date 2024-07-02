import feedsSlice, {
  fetchFeeds,
  fetchUserOrders,
  initialState
} from '../feedsSlice';

describe('тесты загрузки ленты заказов', () => {
  it('проверка состояния при запросе данных (pending)', () => {
    const actualState = feedsSlice(
      { ...initialState, error: 'Test error' },
      fetchFeeds.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('проверка состояния при ошибке получения данных (rejected)', () => {
    const actualState = feedsSlice(
      { ...initialState, loading: true },
      fetchFeeds.rejected(new Error('testError'), '')
    );
    expect(actualState).toEqual({ ...initialState, error: 'testError' });
  });

  it('проверка состояния при успешном получении данных (fulfilled)', () => {
    const testData = [
      {
        _id: '6682acbf856777001bb1ef25',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-07-01T13:18:55.400Z',
        updatedAt: '2024-07-01T13:18:55.841Z',
        number: 44742
      }
    ];

    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: testData,
        total: 1,
        totalToday: 1
      }
    };
    const actualState = feedsSlice({ ...initialState, loading: true }, action);

    expect(actualState.feeds).toEqual(testData);
    expect(actualState.loading).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.total).toBe(1);
    expect(actualState.totalToday).toBe(1);
  });
});

describe('тесты загрузки заказов залогиненного пользователя', () => {
  it('проверка состояния при запросе данных (pending)', () => {
    const actualState = feedsSlice(
      { ...initialState, error: 'Test error' },
      fetchUserOrders.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('проверка состояния при ошибке получения данных (rejected)', () => {
    const actualState = feedsSlice(
      { ...initialState, loading: true },
      fetchUserOrders.rejected(new Error('testError'), '')
    );
    expect(actualState).toEqual({ ...initialState, error: 'testError' });
  });

  it('проверка состояния при успешном получении данных (fulfilled)', () => {
    const testData = [
      {
        _id: '6682acbf856777001bb1ef25',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-07-01T13:18:55.400Z',
        updatedAt: '2024-07-01T13:18:55.841Z',
        number: 44742
      }
    ];

    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: testData
    };
    const actualState = feedsSlice({ ...initialState, loading: true }, action);

    expect(actualState.userOrders).toEqual(testData);
    expect(actualState.loading).toBe(false);
    expect(actualState.error).toBeNull();
  });
});
