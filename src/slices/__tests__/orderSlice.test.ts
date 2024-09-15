import orderSlice, {
  fetchOrderBurger,
  initialState,
  onCloseOrderModal
} from '../orderSlice';

describe('тесты оформления заказа бургера', () => {
  const testOrder = {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c'
    ]
  };

  const testOrderResponse = {
    success: true,
    name: 'Краторный био-марсианский бургер',
    order: {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        }
      ],
      _id: '6682c9a9856777001bb1ef6c',
      owner: {
        name: 'testName',
        email: 'testEmail@ya.ru',
        createdAt: '2024-06-14T17:01:00.804Z',
        updatedAt: '2024-06-18T08:57:30.046Z'
      },
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2024-07-01T15:22:17.455Z',
      updatedAt: '2024-07-01T15:22:17.855Z',
      number: 44744,
      price: 2934
    }
  };

  it('проверка состояния при запросе на отправку заказа (pending)', () => {
    const action = {
      type: fetchOrderBurger.pending.type,
      payload: testOrder
    };
    const actualState = orderSlice(
      { ...initialState, error: 'testError' },
      action
    );

    expect(actualState).toEqual({
      ...initialState,
      orderRequest: true,
      error: null
    });
  });

  it('проверка состояния при ошибке отправки заказа (rejected)', () => {
    const action = {
      type: fetchOrderBurger.rejected.type,
      error: { message: 'testError' }
    };
    const actualState = orderSlice(
      { ...initialState, orderRequest: true },
      action
    );
    expect(actualState).toEqual({ ...initialState, error: 'testError' });
  });

  it('проверка состояния при успешной отправке заказа (fulfilled)', () => {
    const action = {
      type: fetchOrderBurger.fulfilled.type,
      payload: testOrderResponse
    };
    const actualState = orderSlice(
      { ...initialState, orderRequest: true },
      action
    );
    expect(actualState.orderModalData).toEqual(testOrderResponse.order);
    expect(actualState.orderRequest).toBe(false);
    expect(actualState.error).toBeNull();
  });

  it('проверка очистки данных при закрытии модального окна заказа', () => {
    const action = {
      type: fetchOrderBurger.fulfilled.type,
      payload: testOrderResponse
    };
    const actualState = orderSlice(
      { ...initialState, orderRequest: true },
      action
    );
    const newState = orderSlice(actualState, onCloseOrderModal());
    expect(newState.orderModalData).toBeNull();
    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBeNull();
  });
});
