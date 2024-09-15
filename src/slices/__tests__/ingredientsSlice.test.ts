import ingredientsSlice, {
  fetchIngredients,
  initialState
} from '../ingredientsSlice';

describe('тесты загрузки ингредиентов', () => {
  it('проверка состояния при запросе данных (pending)', () => {
    const actualState = ingredientsSlice(
      { ...initialState, error: 'Test error' },
      fetchIngredients.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('проверка состояния при ошибке получения данных (rejected)', () => {
    const actualState = ingredientsSlice(
      { ...initialState, loading: true },
      fetchIngredients.rejected(new Error('testError'), '')
    );
    expect(actualState).toEqual({ ...initialState, error: 'testError' });
  });

  it('проверка состояния при успешном получении данных (fulfilled)', () => {
    const testData = [
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
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ];
    const actualState = ingredientsSlice(
      { ...initialState, loading: true },
      fetchIngredients.fulfilled(testData, '')
    );
    expect(actualState).toEqual({
      ingredients: testData,
      loading: false,
      error: null
    });
  });
});
