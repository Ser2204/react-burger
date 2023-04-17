import React, { useMemo } from 'react';

import styles from './burger-ingredient-section.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Modal from '../../modal/modal';
import BurgerIngredientInfo from '../burger-ingredient-details/burger-ingredient-details';
import { useAppSelector, useAppDispatch } from '../../../services/store';
import { MODAL_NAMES } from '../../../utils/constants';

import { selectIngredient, resetSelectedIngredient } from '../../../services/reducers/burger';

const BurgerIngredientSection = React.forwardRef<HTMLLIElement, { type: string; typeName: string }>(
    ({ type, typeName }, ref) => {
        const dispatch = useAppDispatch();
        const { elements, currentElement }: { elements: element[]; currentElement: element } =
            useAppSelector((state) => state.burger);
        const ingredientClickHandler = (event: React.MouseEvent, selectedIngredient: element) => {
            event.stopPropagation();
            dispatch(selectIngredient(selectedIngredient));
        };
        const closeDetail = () => {
            dispatch(resetSelectedIngredient());
        };
        const ingredientsWithSelectedType = useMemo(() => {
            return elements.filter((element: element) => {
                return element.type === type;
            });
        }, [elements, type]);
    return (
        <React.Fragment>
            <li ref={ref}>
                <h3 className="text text_type_main-medium">{typeName}</h3>
                <ul className={`${styles['burger-ingredient-section__list']} pt-6 pb-10 pr-4 pl-4`}>
                    {ingredientsWithSelectedType.map((element: element) => {
                        return (
                            <React.Fragment key={element._id}>
                                    <BurgerIngredient element={element} onClick={ingredientClickHandler} />
                                </React.Fragment>
                        );
                    })}
                </ul>
            </li>
            {currentElement && (
                <Modal header={MODAL_NAMES.ingredientDetails} onClose={closeDetail}>
                    <BurgerIngredientInfo element={currentElement} />
                </Modal>
            )}
        </React.Fragment>
    );
}, );

export default BurgerIngredientSection;
