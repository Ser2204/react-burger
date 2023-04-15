import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../../utils/types';

const BurgerIngredient = ({
    data,
    onClick,
}: {
    data: element;
    onClick: (event: React.MouseEvent, selectedIngredient: element) => void;
}) => {
    const { image, name, price } = data;
    return (
        <li
            className={`${styles['burger-ingredient__card']}`}
            onClick={(event) => onClick(event, data)}
        >
            <figure className={`${styles['burger-ingredient__item']}`}>
                <img
                    alt={`Изображение ингредиента ${name}`}
                    src={image}
                    className={`${styles['burger-ingredient__image']} pr-4 pl-4`}
                />
                <div className={`${styles['burger-ingredient__price-container']} pt-1 pb-1`}>
                    <p
                        className={`${styles['burger-ingredient__price']} text text_type_digits-default pr-2`}
                    >
                        {price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <figcaption
                    className={`${styles['burger-ingredient__name']} text text_type_main-default`}
                >
                    {name}
                </figcaption>
                <Counter count={1} />
            </figure>
        </li>
    );
};

BurgerIngredient.propTypes = {
    data: PropTypes.shape(IngredientType).isRequired,
};

export default BurgerIngredient;
