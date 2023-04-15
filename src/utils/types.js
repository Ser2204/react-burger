import PropTypes from 'prop-types';

export const IngredientType = {
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
};
