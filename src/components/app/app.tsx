import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { getIngredients } from '../../services/reducers/burger';
import { setIngredientsRequestStatusIdle } from '../../services/reducers/burger';
import { MODAL_NAMES } from '../../utils/constants';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const App = () => {
    const dispatch = useAppDispatch();
    const { ingredientsRequestStatus } = useAppSelector((state) => state.burger);

    const closeErrorModal = () => {
        dispatch(setIngredientsRequestStatusIdle());
    };

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <React.Fragment>
            {ingredientsRequestStatus === 'pending' ? (
               <span>Загружаем ингредиенты...</span>
            ) : (
                <div className={`${styles.app}`}>
                    <AppHeader />
                    {ingredientsRequestStatus === 'rejected' ? (
                        <Modal header={MODAL_NAMES.error} onClose={closeErrorModal}>
                            <p className="text text_type_main-default pt-4">Попробуйте обновить страницу.</p>
                        </Modal>
                    ) : ingredientsRequestStatus === 'idle' ? (
                        <span>Что-то пошло не так..</span>
                    ) : (
                    <main className={`${styles.body} pr-5 pl-5`}>
                          <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                          </DndProvider>
                            </main>
                       
                    )}
                </div>
            )}
        </React.Fragment>
    );
};

export default App;
