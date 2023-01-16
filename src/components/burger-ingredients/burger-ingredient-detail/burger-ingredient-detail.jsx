import burgerIngredientDetailStyles from './burger-ingredient-detail.module.css';
import IngredientType from '../../../utils/prop-types';
// import PropTypes from 'prop-types';

const BurgerIngredientDetailes = (props) => {
    const { name, image_large, calories, proteins, fat, carbohydrates} = props.ingredient;
    return (
        <div>
            <div className={`${burgerIngredientDetailStyles['burger-ingredient-detail__illustration']} pb-8`}>
                <img
                    className={`pb-4`}
                    src={image_large}
                    alt={`Изображение ингредиента ${name}`}                                   
                ></img>
                <h2
                    className={`text text_type_main-medium`}
                >
                    {name}
                </h2>
            </div>
            <table className={`${burgerIngredientDetailStyles['burger-ingredient-detail__nutrients']}`} cols="4">
                <thead className={`pb-2`}>
                    <tr>
                        <th className={`text text_type_main-default pr-5`}>Калории, ккал</th>
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

// BurgerIngredientDetailes.propTypes = {
//     ingredient: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         image_large: PropTypes.string.isRequired,
//         proteins: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         carbohydrates: PropTypes.number.isRequired,
//         calories: PropTypes.number.isRequired,
//     }).isRequired,
// };

BurgerIngredientDetailes.propTypes = {
    props: IngredientType.isRequired,
  };

export default BurgerIngredientDetailes;
