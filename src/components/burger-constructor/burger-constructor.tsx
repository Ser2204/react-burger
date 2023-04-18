import { useDrop } from 'react-dnd';
import TotalPrice from './total-price/total-price';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { addIngredient, setOrderRequestStatusIdle } from '../../services/reducers/burger';
import { setOrder } from '../../services/actions/burger';
import { BUN_TYPE, DND_TYPES } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../services/store';
import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import cs from 'classnames';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = () => {
    const dispatch = useAppDispatch();
    const {
        currentOrder,
        addedElements,
        orderRequestStatus,
    }: {
        elements: initialState['elements'];
        currentOrder: initialState['currentOrder'];
        addedElements: initialState['addedElements'];
        orderRequestStatus: initialState['orderRequestStatus'];
    } = useAppSelector((state) => state.burger);

    const [{ isDragOver }, dropTarget] = useDrop({
        accept: DND_TYPES.element,
        drop(element: element) {
            dispatch(addIngredient(element));
        },
        collect: (monitor) => ({
            isDragOver: monitor.isOver(),
        }),
    });

    const sendOrderHandler = () => {
        const ingredientIdentifiers = addedElements.map((element) => {
            return element._id;
        });
        dispatch(setOrder({ ingredientIdentifiers }));
    };
    const closeOrderDetails = () => {
        dispatch(setOrderRequestStatusIdle());
    };

    const bun = addedElements.find((element) => {
        return element.type === BUN_TYPE;
    });
    const otherIngredients = addedElements.filter((element) => {
        return element.type !== BUN_TYPE;
    });
<section className={`${styles['burger-ingredients']} pt-10 pb-10`}></section>
    return (
        <section className={`${styles['burger-constructor']} pt-25 pb-10 pl-10`}>
            <section
                className={cs(styles['burger-constructor__list'], {
                    [styles['burger-constructor__list_isEmpty']]: addedElements.length === 0,
                    [styles['burger-constructor__list_isDragHover']]: isDragOver,
                })}
                ref={dropTarget}
            >
                {bun && (
                    <BurgerConstructorElement
                        element={bun}
                        isLocked
                        text={`${bun.name} (верх)`}
                        extraClass="ml-8 mb-4"
                        type="top"
                    />
                )}
                <ul className={`${styles['burger-constructor__fillings']}`}>
                    {otherIngredients.map((element, index) => {
                        return (
                            <li
                                className={cs(styles['burger-constructor__filling'], index === 0 ? '' : 'pt-4', 'pr-2')}
                                key={element.uniqueId}
                            >
                                <BurgerConstructorElement element={element} extraClass="ml-2" />
                            </li>
                        );
                    })}
                </ul>

                {bun && (
                    <BurgerConstructorElement
                        element={bun}
                        isLocked
                        text={`${bun.name} (низ)`}
                        extraClass="ml-8 mt-4"
                        type="bottom"
                    />
                )}
            </section>
            <section className={`${styles['burger-constructor__total']} pr-4 pt-10`}>
                <TotalPrice />
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    disabled={addedElements.length === 0}
                    onClick={sendOrderHandler}
                >
                    Оформить заказ
                </Button>
            </section>
            {orderRequestStatus === 'fulfilled' && currentOrder && (
                <Modal onClose={closeOrderDetails}>
                    <OrderDetails orderId={currentOrder.order.number} />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;