import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getConstructorItemsSelector
} from '../../slices/constructorSlice';
import {
  fetchOrderBurger,
  getOrderModalDataSelector,
  getOrderRequestSelector,
  onCloseOrderModal
} from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { authenticatedSelector, getAuthChecked } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(authenticatedSelector);

  const constructorState = useSelector(getConstructorItemsSelector);
  const constructorItems = constructorState.constructorItems;

  const orderRequest = useSelector(getOrderRequestSelector);

  const orderModalData = useSelector(getOrderModalDataSelector);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login', { replace: true });
    }
    if (constructorItems.bun && constructorItems.ingredients.length) {
      const ingredientsIdArray = constructorItems.ingredients.map(
        (item) => item._id
      );
      dispatch(
        fetchOrderBurger([
          constructorItems.bun._id,
          ...ingredientsIdArray,
          constructorItems.bun._id
        ])
      );
    }
  };
  const closeOrderModal = () => {
    dispatch(onCloseOrderModal());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
