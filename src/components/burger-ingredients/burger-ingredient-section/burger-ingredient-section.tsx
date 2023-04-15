import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredient-section.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Modal from '../../modal/modal';
import BurgerIngredientInfo from '../burger-ingredient-details/burger-ingredient-details';
import { IgredientsContext } from '../../../context/igredients-сontext';

const BurgerIngredientSection = ({ type, typeName }: { type: string; typeName: string }) => {
    const elements = useContext(IgredientsContext);
    const [selectedIngredient, setSelectedIngredient] = useState<null | element>(null);
    const ingredientClickHandler = (event: React.MouseEvent, selectedIngredient: element) => {
        event.stopPropagation();
        setSelectedIngredient(selectedIngredient);
    };
    const closeDetail = () => {
        setSelectedIngredient(null);
    };
    const ingredientsWithSelectedType = useMemo(() => {
        return elements.filter((element: element) => {
            return element.type === type;
        });
    }, [elements, type]);
    return (
        <React.Fragment>
            <li>
                <h3 className="text text_type_main-medium">{typeName}</h3>
                <ul className={`${styles['burger-ingredient-section__list']} pt-6 pb-10 pr-4 pl-4`}>
                    {ingredientsWithSelectedType.map((element: element) => {
                        return (
                            <React.Fragment key={element._id}>
                                <BurgerIngredient data={element} onClick={ingredientClickHandler} />
                            </React.Fragment>
                        );
                    })}
                </ul>
            </li>
            {selectedIngredient && (
                <Modal header="Детали ингредиента" onClose={closeDetail}>
                    <BurgerIngredientInfo element={selectedIngredient} />
                </Modal>
            )}
        </React.Fragment>
    );
};

BurgerIngredientSection.propTypes = {
    type: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
};

export default BurgerIngredientSection;
