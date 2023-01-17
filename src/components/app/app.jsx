import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
 import { Context } from '../../context/context';
import { config } from '../../utils/constants';
import Api from '../api/api';
import Modal from '../modal/modal';

const api = new Api({ baseUrl: config.baseUrl, headers: config.headers });
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
        <Context.Provider value={ingredients}>
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
                    <main className={`${appStyles.body} pr-5 pl-5`}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                    </main>
                )}
            </div>
        )}
    </Context.Provider>
        
    );
};

export default App;
