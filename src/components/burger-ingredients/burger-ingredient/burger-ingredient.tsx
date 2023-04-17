import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector } from '../../../services/store';
import { DND_TYPES } from '../../../utils/constants';
import cs from 'classnames';


const BurgerIngredient = ({
    element,
    onClick,
}: {
    element: element;
    onClick: (event: React.MouseEvent, selectedIngredient: element) => void;
}) => {
    const addedElements: element[] = useAppSelector((state) => state.burger.addedElements);
    const [{ isDragged }, dragRef, preview] = useDrag(() => ({
        type: DND_TYPES.element,
        item: element,
        collect: (monitor) => ({
            isDragged: monitor.isDragging(),
        }),
    }));
    const { image, name, price, _id } = element;
    const counterOfSuchIngredients = addedElements.filter((addedElement) => {
        return addedElement._id === _id;
    }).length;
    return (
        <React.Fragment>
            <li className={cs(styles['burger-ingredient__card'], {
                    [styles['burger-ingredient__card_dragged']]: isDragged,
                })}
                ref={dragRef}
                onClick={(event) => onClick(event, element)}
        >
              <DragPreviewImage connect={preview} src={image} />
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
                {counterOfSuchIngredients && <Counter count={counterOfSuchIngredients} />}
            </figure>
        </li>
        </React.Fragment>
        
    );
};

export default BurgerIngredient;
