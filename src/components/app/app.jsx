import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import { IgredientsContext } from '../../context/igredients-сontext';
import {api} from '../api/index';
import Modal from '../modal/modal';



const App = () => {
    const [state, setState] = useState({
        ingredients: [],
        isLoading: false,
        hasError: false,
        isErrorModalOpen: false,
    });
    const closeErrModal = () => {
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
            <div className={appStyles.app}>
                <AppHeader />
                {hasError && isErrorModalOpen ? (
                    <Modal header={'Ошибка!'} onClose={closeErrModal}>
                        <p className="text text_type_main-default pt-4">Попробуйте обновить страницу.</p>
                    </Modal>
                ) : hasError ? (
                    <span>Что-то пошло не так..</span>
                    ) : (
                        <IgredientsContext.Provider value={ingredients}>
                           <main className={`${appStyles.body} pr-5 pl-5`}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                            </main>
                        </IgredientsContext.Provider>
                    
                )}
            </div>
        )}
    </React.Fragment>
        
    );
};

export default App;
