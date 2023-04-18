import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientSection from './burger-ingredient-section/burger-ingredient-section';
import { MutableRefObject, useRef } from 'react';
import { BUN_TYPE, MAIN_TYPE, SAUCE_TYPE, BUN_TYPE_NAME, MAIN_TYPE_NAME, SAUCE_TYPE_NAME } from '../../utils/constants';

const BurgerIngredients = () => {
    const bunTabRefForScroll = useRef<HTMLLIElement>(null);
    const sauceTabRefForScroll = useRef<HTMLLIElement>(null);
    const mainTabRefForScroll = useRef<HTMLLIElement>(null);
    const [bunTabRefForInView, bunsInView] = useInView({
        threshold: 0.2,
        initialInView: true,
    });

    const [sauceTabRefForInView, sausesInView] = useInView({
        threshold: 0.2,
    });
    const [mainTabRefForInView, mainsInView] = useInView({
        threshold: 0.2,
    });
    const getCurrentTab = () => {
        if (bunsInView) {
            return BUN_TYPE;
        } else if (sausesInView) {
            return SAUCE_TYPE;
        } else if (mainsInView) {
            return MAIN_TYPE;
        }
    };
    const tabOnClickHandler = (ref: React.RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const prepareRefs = (
        element: HTMLElement,
        refForScroll: React.RefObject<HTMLElement>,
        refForInView: (node?: Element | null | undefined) => void,
    ) => {
        (refForScroll as MutableRefObject<HTMLLIElement>).current = element as HTMLLIElement;
        return refForInView(element);
    };
    return (
        <section className={`${styles['burger-ingredients']} pt-10 pb-10`}>
            <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
            <nav className={`${styles['burger-ingredients__menu']} pt-5 pb-10`}>
                <Tab  value={BUN_TYPE}
                    active={getCurrentTab() === BUN_TYPE}
                    onClick={() => {
                        tabOnClickHandler(bunTabRefForScroll);
                    }}
                >
                    {BUN_TYPE_NAME}
                </Tab>
                <Tab value={SAUCE_TYPE}
                    active={getCurrentTab() === SAUCE_TYPE}
                    onClick={() => {
                        tabOnClickHandler(sauceTabRefForScroll);
                    }}
                >
                    {SAUCE_TYPE_NAME}
                </Tab>
                <Tab value={MAIN_TYPE}
                    active={getCurrentTab() === MAIN_TYPE}
                    onClick={() => {
                        tabOnClickHandler(mainTabRefForScroll);
                    }}
                >
                    {MAIN_TYPE_NAME}
                </Tab>
            </nav>
            <ul className={`${styles['burger-ingredients__section']}`}>
            <BurgerIngredientSection type={BUN_TYPE}
                    typeName={BUN_TYPE_NAME}
                    ref={(element) => {
                        element && prepareRefs(element, bunTabRefForScroll, bunTabRefForInView);
                    }} />
                <BurgerIngredientSection type={SAUCE_TYPE}
                    typeName={SAUCE_TYPE_NAME}
                    ref={(element) => {
                        element && prepareRefs(element, sauceTabRefForScroll, sauceTabRefForInView);
                    }} />
                <BurgerIngredientSection  type={MAIN_TYPE}
                    typeName={MAIN_TYPE_NAME}
                    ref={(element) => {
                        element && prepareRefs(element, mainTabRefForScroll, mainTabRefForInView);
                    }} />
            </ul>
        </section>
    );
};

export default BurgerIngredients;
