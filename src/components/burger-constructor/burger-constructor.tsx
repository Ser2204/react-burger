import { useContext, useState, useReducer } from 'react';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IgredientsContext } from '../../context/igredients-сontext';
import { api } from '../api';
import TotalPrice from './total-price/total-price';
import { TotalPriceContext } from '../../context/total-price-context';

const totalPriceReducer = (state: { totalPrice: number }, action: { type: string; changedAmount: number }) => {
    switch (action.type) {
        case 'add':
            return { totalPrice: state.totalPrice + action.changedAmount };
        case 'remove':
            return { totalPrice: state.totalPrice - action.changedAmount };
        default:
            return state;
    }
};

const selectedIngredientsReducer = (
    state: { elements: element[] },
    action: { type: string; element: element },
) => {
    switch (action.type) {
        case 'add':
            return { elements: state.elements.concat([action.element]) };
        case 'delete':
            return {
                elements: state.elements.filter((element) => {
                    return element._id !== action.element._id;
                }),
            };
        default:
            return state;
    }
};
const BurgerConstructor = () => {
    const elements: element[] = useContext(IgredientsContext);
    const initialState: { isOrderNeedsBeShown: boolean; orderId: null | number } = {
        isOrderNeedsBeShown: false,
        orderId: null,
    };
    const [state, setState] = useState(initialState);
    const bun = elements.find((element) => {
        return element.type === 'bun';
    });
    const selectedIngredients = elements.filter((element) => {
        return element.type !== 'bun';
    });
    const allIngredients = (bun ? [bun] : []).concat(selectedIngredients);
    const [selectedIngredientsState, selectedIngredientsDispatcher] = useReducer(
        selectedIngredientsReducer,
        { elements: allIngredients },
    );
    const initialTotalPrice =
        (bun ? bun.price * 2 : 0) +
        elements.reduce((price, element) => {
            if (element.type !== 'bun') {
                price += element.price;
            }
            return price;
        }, 0);
    const [totalPriceState, totalPriceDispatcher] = useReducer(totalPriceReducer, { totalPrice: initialTotalPrice });

    const sendOrderHandler = () => {
        const elements = (bun ? [bun._id] : []).concat(
            selectedIngredients.map((element) => {
                return element._id;
            }),
        );
        api.setOrder({ ingredientIdentifiers: elements })
            .then((data: orderSuccessServiceResponse) => {
                console.log(data);
                setState({ ...state, orderId: data.order.number, isOrderNeedsBeShown: true });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const closeOrderDetails = () => {
        setState({ ...state, isOrderNeedsBeShown: false });
    };
    const deleteIngredient = (id: string) => {
        const ingredientToDelete = elements.find((element) => {
            return element._id === id;
        });
        if (ingredientToDelete) {
            selectedIngredientsDispatcher({ type: 'delete', element: ingredientToDelete });
            totalPriceDispatcher({ changedAmount: ingredientToDelete.price, type: 'remove' });
        }
    };

    return (
        <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
            <section className={`${styles['burger-constructor']} pt-25 pb-10 pl-10`}>
                <section className={`${styles['burger-constructor__list']} pb-10`}>
                    {bun && (
                        <div>
                            <ConstructorElement
                                text={`${bun.name} (верх)`}
                                isLocked
                                price={bun.price}
                                thumbnail={bun.image}
                                type="top"
                                extraClass="ml-8 mb-4"
                            />
                        </div>
                    )}
                    <ul className={`${styles['burger-constructor__elements']}`}>
                        {selectedIngredientsState.elements.map((element, index) => {
                            return (
                                <li
                                    className={`${styles['burger-constructor__element']} ${
                                        index === 0 ? '' : 'pt-4'
                                    } pr-2`}
                                    key={element._id}
                                >
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                        key={element._id}
                                        text={element.name}
                                        price={element.price}
                                        thumbnail={element.image}
                                        extraClass="ml-2"
                                        handleClose={() => {
                                            deleteIngredient(element._id);
                                        }}
                                    />
                                </li>
                            );
                        })}
                    </ul>

                    {bun && (
                        <div>
                            <ConstructorElement
                                text={`${bun.name} (низ)`}
                                isLocked
                                price={bun.price}
                                thumbnail={bun.image}
                                type="bottom"
                                extraClass="ml-8 mt-4"
                            />
                        </div>
                    )}
                </section>
                <section className={`${styles['burger-constructor__total']} pr-4`}>
                    <TotalPrice />
                    <Button htmlType="button" type="primary" size="large" onClick={sendOrderHandler}>
                        Оформить заказ
                    </Button>
                </section>
                {state.isOrderNeedsBeShown && state.orderId && (
                    <Modal onClose={closeOrderDetails}>
                        <OrderDetails orderId={state.orderId} />
                    </Modal>
                )}
            </section>
        </TotalPriceContext.Provider>
    );
};

export default BurgerConstructor;
