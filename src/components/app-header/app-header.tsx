import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import MenuItem from './menu-item/menu-item';

const AppHeader = () => {
    return (
        <header className={`${styles.appHeader} text text_type_main-default pt-4 pb-4`}>
            <nav className={styles.appHeader__menu}>
                <ul className={styles['appHeader__menu-items']}>
                    <MenuItem
                        className={`${styles['appHeader__menu-item']} pt-4 pb-4 pr-5 pl-5 mr-2`}
                        text="Конструктор"
                        icon={BurgerIcon}
                        isActive
                    />
                    <MenuItem
                        className={`${styles['appHeader__menu-item']} pt-4 pb-4 pr-5 pl-5`}
                        text="Лента заказов"
                        icon={ListIcon}
                    />
                    <li className={styles['appHeader__logo']}>
                    <a href="/"> <Logo /> </a>
                    </li>
                    <MenuItem
                        className={`${styles['appHeader__menu-item']} pt-4 pb-4 pr-5 pl-5`}
                        text="Личный кабинет"
                        icon={ProfileIcon}
                    />
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
