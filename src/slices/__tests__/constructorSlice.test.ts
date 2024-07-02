import { TUser } from '@utils-types';

import constructorSlice, {
  addIngredient,
  removeIngredient,
  moveDownIngredient,
  moveUpIngredient,
  clearConstructor
} from '../constructorSlice';

const mockConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: [
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '1'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: '2'
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        id: '3'
      }
    ]
  }
};

const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  id: '2'
};

const newIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const newBun = {
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
};

describe('тесты для constructorSlice', () => {
  it('проверка добавления ингредиента addIngredient', () => {
    const actualState = constructorSlice(
      mockConstructorState,
      addIngredient(newIngredient)
    );
    expect(actualState.constructorItems.ingredients).toHaveLength(4);
    expect(actualState.constructorItems.ingredients[3]._id).toBe(
      '643d69a5c3f7b9001cfa0941'
    );
  });

  it('проверка добавления булочки addIngredient', () => {
    const actualState = constructorSlice(
      mockConstructorState,
      addIngredient(newBun)
    );
    expect(actualState.constructorItems.bun).toBeTruthy();
  });

  it('проверка удаления ингредиента', () => {
    const actualState = constructorSlice(
      mockConstructorState,
      removeIngredient(mockIngredient)
    );
    expect(actualState.constructorItems.ingredients).toHaveLength(2);
  });

  it('проверка перемещения ингредиента вниз', () => {
    const actualState = constructorSlice(
      mockConstructorState,
      moveDownIngredient(1)
    );
    expect(actualState.constructorItems.ingredients[2]).toEqual(mockIngredient);
  });

  it('проверка перемещения ингредиента вверх', () => {
    const actualState = constructorSlice(
      mockConstructorState,
      moveUpIngredient(1)
    );
    expect(actualState.constructorItems.ingredients[0]).toEqual(mockIngredient);
  });

  it('проверка очистки конструктора', () => {
    const actualState = constructorSlice(
      mockConstructorState,
      clearConstructor()
    );
    expect(actualState.constructorItems.ingredients).toHaveLength(0);
    expect(actualState.constructorItems.bun).toBeNull;
  });

});
