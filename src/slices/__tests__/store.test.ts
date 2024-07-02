import ingredientsSlice from '../ingredientsSlice';
import constructorSlice from '../constructorSlice';
import feedsSlice from '../feedsSlice';
import userSlice from '../userSlice';
import orderSlice from '../orderSlice';
import { rootReducer } from '../../services/store';

describe('rootReducer', () => {
  it('правильная инициализация rootReducer', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, action);
    expect(initialState).toEqual({
        ingredients: ingredientsSlice(undefined, action),
        burgerConstructor: constructorSlice(undefined, action),
        feeds: feedsSlice(undefined, action),
        user: userSlice(undefined, action),
        userOrder: orderSlice(undefined, action),
      });
  });
});