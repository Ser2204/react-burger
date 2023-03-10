import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientSection from './burger-ingredient-section/burger-ingredient-section';

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState();
    return (
        <section className={`${burgerIngredientsStyles['burger-ingredients']} pt-10 pb-10`}>
            <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
            <nav className={`${burgerIngredientsStyles['burger-ingredients__menu']} pt-5 pb-10`}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </nav>
            <ul className={`${burgerIngredientsStyles['burger-ingredients__section-list']}`}>
                <BurgerIngredientSection type="bun" typeName="Булки" />
                <BurgerIngredientSection type="sauce" typeName="Соусы" />
                <BurgerIngredientSection type="main" typeName="Начинки" />
            </ul>
        </section>
    );
};

export default BurgerIngredients;
