import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import { IgredientsContext } from '../../context/igredients-сontext';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import { api } from '../api';

const App = () => {
    const [state, setState] = useState({
        ingredients: [],
        isLoading: false,
        hasError: false,
        isErrorModalOpen: false,
    });

    const closeErrorModal = () => {
        setState({ ...state, isErrorModalOpen: false });
    };

    useEffect(() => {
        setState({ ...state, hasError: false, isLoading: true });
        api.getIngredients()
            .then((data) => setState({ ...state, ingredients: data.data, isLoading: false }))
            .catch((error) => {
                console.log(error);
                setState({ ...state, hasError: true, isLoading: false, isErrorModalOpen: true });
            });
    }, []);

    const { ingredients, isLoading, hasError, isErrorModalOpen } = state;

    return (
        <React.Fragment>
            {isLoading ? (
               <span>Загружаем ингредиенты...</span>
            ) : (
                <div className={styles.app}>
                    <AppHeader />
                    {hasError && isErrorModalOpen ? (
                        <Modal header={'Ошибка!'} onClose={closeErrorModal}>
                            <p className="text text_type_main-default pt-4">Попробуйте обновить страницу.</p>
                        </Modal>
                    ) : hasError ? (
                        <span>Что-то пошло не так..</span>
                    ) : (
                        <IgredientsContext.Provider value={ingredients}>
                          <main className={`${styles.body} pr-5 pl-5`}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                            </main>
                        </IgredientsContext.Provider>
                    )}
                </div>
            )}
        </React.Fragment>
    );
};

export default App;
