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
    type: string
}

type orderSuccessServiceResponse = {
    name: string,
    order: {
        number: number,
    },
    success: boolean,
  }
