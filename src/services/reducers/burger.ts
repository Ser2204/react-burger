import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { BUN_TYPE } from '../../utils/constants';
import { nanoid } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { getIngredients, setOrder } from '../actions/burger';

const slice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        addIngredient: (state, { payload: element }: PayloadAction<element>) => {
            let updatedAddedIngeidients: element[] = [...state.addedElements];
            if (element.type === BUN_TYPE) {
                updatedAddedIngeidients = updatedAddedIngeidients.filter((addedElement) => {
                    return addedElement.type !== BUN_TYPE;
                });
            }
            updatedAddedIngeidients.push({ ...element, uniqueId: nanoid() });
            state.addedElements = updatedAddedIngeidients;
            slice.caseReducers.calculateOrderPrice(state);
        },
        removeIngredient: (state, { payload: element }: PayloadAction<element>) => {
            const updatedAddedIngeidients = [
                ...state.addedElements.filter((addedElement) => {
                    return addedElement.uniqueId !== element.uniqueId;
                }),
            ];
            state.addedElements = updatedAddedIngeidients;
            slice.caseReducers.calculateOrderPrice(state);
        },
        moveIngredient: (state, { payload: [draggedIndex, hoveredIndex] }: PayloadAction<[number, number]>) => {
            if (draggedIndex === hoveredIndex) {
                return;
            }
            const addedElements: element[] = [...state.addedElements];
            const updatedAddedElements: element[] = update(addedElements, {
                $splice: [
                    [draggedIndex, 1],
                    [hoveredIndex, 0, addedElements[draggedIndex]],
                ]
            });
            state.addedElements = updatedAddedElements;
        },
        selectIngredient: (state, { payload: element }: PayloadAction<element>) => {
            state.currentElement = element;
        },
        calculateOrderPrice: (state) => {
            state.orderPrice = state.addedElements.reduce((price, element) => {
                if (element.type === BUN_TYPE) {
                    price += element.price * 2;
                } else {
                    price += element.price;
                }
                return price;
            }, 0);
        },
        resetSelectedIngredient: (state) => {
            state.currentElement = initialState.currentElement;
        },
        resetCurrentOrder: (state) => {
            state.currentOrder = initialState.currentOrder;
        },
        resetAddedElements: (state) => {
            state.addedElements = [...initialState.addedElements];
        },
        resetOrderPrice: (state) => {
            state.orderPrice = initialState.orderPrice;
        },
        setOrderRequestStatusIdle: (state) => {
            state.orderRequestStatus = 'idle';
        },
        setIngredientsRequestStatusIdle: (state) => {
            state.ingredientsRequestStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.ingredientsRequestStatus = 'pending';
            })
            .addCase(getIngredients.fulfilled, (state, { payload: elements }: PayloadAction<element[]>) => {
                state.ingredientsRequestStatus = 'fulfilled';
                state.elements = [...elements];
            })
            .addCase(getIngredients.rejected, (state) => {
                state.ingredientsRequestStatus = 'rejected';
            });
        builder
            .addCase(setOrder.pending, (state) => {
                state.orderRequestStatus = 'pending';
            })
            .addCase(setOrder.fulfilled, (state, { payload: data }: PayloadAction<orderSuccessServiceResponse>) => {
                slice.caseReducers.resetAddedElements(state);
                slice.caseReducers.resetOrderPrice(state);
                state.orderRequestStatus = 'fulfilled';
                state.currentOrder = {...data};
            })
            .addCase(setOrder.rejected, (state) => {
                slice.caseReducers.resetCurrentOrder(state);
                state.currentOrder = initialState.currentOrder;
                state.orderRequestStatus = 'rejected';
            });
    },
});

const { reducer } = slice;

export { reducer, getIngredients };

export const {
    selectIngredient,
    resetSelectedIngredient,
    addIngredient,
    removeIngredient,
    moveIngredient,
    calculateOrderPrice,
    setOrderRequestStatusIdle,
    setIngredientsRequestStatusIdle,
} = slice.actions;
