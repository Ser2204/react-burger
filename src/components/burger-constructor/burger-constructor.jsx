import { useContext, useState } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Context } from '../../context/context';
import { nanoid } from 'nanoid';
const ORDER_ID = '034536';

const BurgerConstructor = () => {
    const ingredients = useContext(Context);
    const [state, setState] = useState({
        isOrderNeedsBeShown: false,
    });
    
    const bun = ingredients.find((ingredient) => {
        return ingredient.type === 'bun';
    });
    const totalPrice =
        bun &&
        bun.price +
            ingredients.reduce((price, ingredient) => {
                if (ingredient.type !== 'bun') {
                    price += ingredient.price;
                }
                return price;
            }, 0);

    const sendOrderHandler = () => {
        setState({ ...state, isOrderNeedsBeShown: true });
    };
    const closeOrderDetails = () => {
        setState({ ...state, isOrderNeedsBeShown: false });
    };

    return (
        <section className={`${burgerConstructorStyles['burger-constructor']} pt-25 pb-10 pl-10`}>
            <section className={`${burgerConstructorStyles['burger-constructor__list']} pb-10`}>
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
                <ul className={`${burgerConstructorStyles['burger-constructor__fillings']}`}>
                    {ingredients
                        .filter((ingredient) => {
                            return ingredient.type !== 'bun';
                        })
                        .map((ingredient, index) => {
                            return (
                                <li
                                    className={`${burgerConstructorStyles['burger-constructor__filling']} ${
                                        index === 0 ? '' : 'pt-4'
                                    } pr-2`}
                                    key={nanoid()}
                                >
                                    <DragIcon />
                                    <ConstructorElement
                                        key={nanoid()}
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                        extraClass="ml-2"
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
            <section className={`${burgerConstructorStyles['burger-constructor__total']} pr-4`}>
                <div className={`${burgerConstructorStyles['burger-constructor__amount-container']} pr-10`}>
                    <p className={`text text_type_digits-medium pr-2`}>{totalPrice}</p>
                    <CurrencyIcon />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={sendOrderHandler}>
                    Оформить заказ
                </Button>
            </section>
            {state.isOrderNeedsBeShown && (
                <Modal onClose={closeOrderDetails}>
                    <OrderDetails orderId={ORDER_ID} />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;
