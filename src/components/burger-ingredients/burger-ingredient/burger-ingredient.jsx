import IngredientType from '../../../utils/prop-types';
import burgerIngredientStyles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredient = (props) => {
    const { image, name, price } = props.data;
    const onClick = (event) => {
        props.onClick(event, props.data);
    };
    return (
        <li className={`${burgerIngredientStyles['burger-ingredient__card']}`} onClick={onClick}>
            <figure className={`${burgerIngredientStyles['burger-ingredient__item']}`}>
                <img
                    alt={`Изображение ингредиента ${name}`}
                    src={image}
                    className={`${burgerIngredientStyles['burger-ingredient__image']} pr-4 pl-4`}
                ></img>
                <div className={`${burgerIngredientStyles['burger-ingredient__price']} pt-2 pb-2`}>
                    <p
                        className={`${burgerIngredientStyles['burger-ingredient__price']} text text_type_digits-default pr-2`}
                    >
                        {price}
                    </p>
                    <CurrencyIcon />
                </div>
                <figcaption
                    className={`${burgerIngredientStyles['burger-ingredient__name']} text text_type_main-default`}
                >
                    {name}
                </figcaption>
                <Counter count={1} />
            </figure>
        </li>
    );
};


BurgerIngredient.propTypes = {
    props: IngredientType.isRequired,
  };
export default BurgerIngredient;
