import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './total-price.module.css';

import { useAppSelector } from '../../../services/store';

const TotalPrice = () => {
    const orderPrice = useAppSelector((state) => state.burger.orderPrice);
    return (
        <div className={`${styles['total-price-container']} pr-10`}>
            <p className={`text text_type_digits-medium pr-2`}>{orderPrice}</p>
            <CurrencyIcon type="primary" />
        </div>
    );
};

export default TotalPrice;
