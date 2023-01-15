import { useContext, useState } from 'react';
import burgerIngredientSectionStyles from './burger-ingredient-section.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Modal from '../../modal/modal';
import BurgerIngredientDetailes from '../burger-ingredient-detail/burger-ingredient-detail';
import { Context } from '../../../context/context';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const BurgerIngredientSection = (props) => {
    const ingredients = useContext(Context);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const { type, typeName } = props;
    const ingredientClickHandler = (event, selectedIngredient) => {
        event.stopPropagation();
        setSelectedIngredient(selectedIngredient);
    };
    const closeDetail = () => {
        setSelectedIngredient(null);
    };
    return (
        <>
            <li>
                <h3 className="text text_type_main-medium">{typeName}</h3>
                <ul className={`${burgerIngredientSectionStyles['burger-ingredient-section__list']} pt-6 pb-10 pr-4 pl-4`}>
                    {ingredients
                        .filter((ingredient) => {
                            return ingredient.type === type;
                        })
                        .map((ingredient) => {
                            return (
                                <BurgerIngredient
                                    key={nanoid()}
                                    data={ingredient}
                                    onClick={ingredientClickHandler}
                                ></BurgerIngredient>
                            );
                        })}
                </ul>
            </li>
            {selectedIngredient && (
                <Modal header="Детали ингредиента" onClose={closeDetail}>
                    <BurgerIngredientDetailes ingredient={selectedIngredient} />
                </Modal>
            )}
        </>
    );
};

BurgerIngredientSection.propTypes = {
    type: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
};

export default BurgerIngredientSection;
