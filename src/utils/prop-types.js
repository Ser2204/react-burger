import PropTypes from "prop-types";

const { shape, number, string } = PropTypes;

const IngredientType = shape({
  name: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
});

export default IngredientType;
