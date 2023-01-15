import { useMemo, useContext, useState } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Context } from '../../context/context';
import { nanoid } from 'nanoid';
const ORDER_ID = '034536';

const BurgerConstructor = () => {
    const ingredients = useContext(Context);
    const [state, setState] = useState({
        ModalIsVisible: false,
    });
    const bun = ingredients.find((item) => item.type === "bun");
    const totalPrice = useMemo(() => {
        return ingredients.reduce((price, item) => price + item.price, 0);
      }, [ingredients]);

    const sendOrderHandler = () => {
        setState({ ...state, ModalIsVisible: true });
    };
    const closeOrderDetails = () => {
        setState({ ...state, ModalIsVisible: false });
    };

    return (
        <section className={`${burgerConstructorStyles['burger-constructor']} pt-25 pb-10 pl-10`}>
            <section className={`${burgerConstructorStyles['burger-constructor__list']} pb-10`}>
                {bun && (
                    <div className="ml-8 mb-4">
                        <ConstructorElement
                            text={`${bun.name} (верх)`}
                            isLocked
                            price={bun.price}
                            thumbnail={bun.image}
                            type="top"                            
                        />
                    </div>
                )}
                <ul className={`${burgerConstructorStyles['burger-constructor__elements']}`}>
                    {ingredients
                        .filter((item) => {
                            return item.type !== 'bun';
                        })
                        .map((item, index) => {
                            return (
                                <li
                                    className={`${burgerConstructorStyles['burger-constructor__element']} ${
                                        index === 0 ? '' : 'pt-4'
                                    } pr-2 ml-2`}
                                    key={nanoid()}
                                >
                                    <DragIcon />
                                    <ConstructorElement
                                        key={nanoid()}
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>
                            );
                        })}
                </ul>

                {bun && (
                    <div className="ml-8 mt-4" >
                        <ConstructorElement
                            text={`${bun.name} (низ)`}
                            isLocked
                            price={bun.price}
                            thumbnail={bun.image}
                            type="bottom"
                        />
                    </div>
                )}
            </section>
            <section className={`${burgerConstructorStyles['burger-constructor__total']} pr-4`}>
                <div className={`${burgerConstructorStyles['burger-constructor__amount']} pr-10`}>
                    <p className={`text text_type_digits-medium pr-2`}>{totalPrice}</p>
                    <CurrencyIcon />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={sendOrderHandler}>
                    Оформить заказ
                </Button>
            </section>
            {state.ModalIsVisible && (
                <Modal onClose={closeOrderDetails}>
                    <OrderDetails orderId={ORDER_ID} />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;
