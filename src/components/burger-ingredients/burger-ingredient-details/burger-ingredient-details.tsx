
import styles from './burger-ingredient-details.module.css';

const BurgerIngredientInfo = ({ element }: { element: element }) => {
    const { name, image_large, proteins, fat, carbohydrates, calories } = element;
    return (
        <div>
            <figure className={`${styles['burger-ingredient-details__illustration']} pb-8`}>
                <img
                    alt={`Изображение ингредиента ${name}`}
                    src={image_large}
                    className={`${styles['burger-ingredient-details__image']} pb-4`}
                />
                <figcaption
                    className={`${styles['burger-ingredient-details__caption']} text text_type_main-medium`}
                >
                    {name}
                </figcaption>
            </figure>
            <table className={`${styles['burger-ingredient-details__nutrients']}`}>
                <thead className={`pb-2`}>
                    <tr>
                        <th className={`text text_type_main-default pr-5`}>Калории,ккал</th>
                        <th className={`text text_type_main-default pr-5`}>Белки, г</th>
                        <th className={`text text_type_main-default pr-5`}>Жиры, г</th>
                        <th className={`text text_type_main-default`}>Углеводы, г</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={`text text_type_digits-default`}>{calories}</td>
                        <td className={`text text_type_digits-default`}>{proteins}</td>
                        <td className={`text text_type_digits-default`}>{fat}</td>
                        <td className={`text text_type_digits-default`}>{carbohydrates}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BurgerIngredientInfo;
