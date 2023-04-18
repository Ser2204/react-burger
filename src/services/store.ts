import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { reducer as burgerReducer } from './reducers/burger';

export const store = configureStore({
    reducer: {
        burger: burgerReducer,
    },
});

export const useAppDispatch : () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
