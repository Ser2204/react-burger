import { useContext } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './total-price.module.css';
import { TotalPriceContext } from '../../../context/total-price-context';

const TotalPrice = () => {
    const { totalPriceState } = useContext(TotalPriceContext);
    return (
        <div className={`${styles['total-price-container']} pr-10`}>
            <p className={`text text_type_digits-medium pr-2`}>{totalPriceState.totalPrice}</p>
            <CurrencyIcon type="primary" />
        </div>
    );
};

export default TotalPrice;
