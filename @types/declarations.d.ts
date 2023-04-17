type element = {
    _id: string,
    name: string,
    image_large: string,
    image: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    type: string,
    uniqueId?: string
}

type orderSuccessServiceResponse = {
    name: string,
    order: {
        number: number,
    },
    success: boolean,
  }

  type RequestStatus = 'pending' | 'fulfilled' | 'rejected' | 'idle';

type initialState = {
    elements: element[];
    addedElements: element[];
    currentElement: null | element;
    currentOrder: null | orderSuccessServiceResponse;
    orderPrice: number;
    orderRequestStatus: RequestStatus;
    ingredientsRequestStatus: RequestStatus;
};
type draggedAddedIngredient = { index: number };

type RootState = ReturnType<typeof import('../src/services/store').getState>;
type AppDispatch = ReturnType<typeof import('../src/services/store').dispatch>;
