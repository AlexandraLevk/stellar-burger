import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

interface TConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: Array<TConstructorIngredient>;
  };
}

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorItems.bun = action.payload)
          : state.constructorItems.ingredients.push(action.payload);
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (b) => b.id !== action.payload.id
        );
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload + 1]
      ] = [
        state.constructorItems.ingredients[action.payload + 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload - 1]
      ] = [
        state.constructorItems.ingredients[action.payload - 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    clearConstructor(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  },
  selectors: {
    getConstructorItemsSelector: (state) => state
  }
});

export default constructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveDownIngredient,
  moveUpIngredient,
  clearConstructor
} = constructorSlice.actions;
export const { getConstructorItemsSelector } = constructorSlice.selectors;
