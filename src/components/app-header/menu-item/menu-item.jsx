import PropTypes from 'prop-types';

const MenuItem = (props) => {
    const { className, text, icon, isActive } = props;

    const Icon = icon;
    return (
        <li className={className} role="button">
            <Icon type={isActive ? 'primary' : 'secondary'} />
            <span className={`text text_type_main-default ${!isActive ? 'text_color_inactive' : ''} pl-2`}>{text}</span>
        </li>
    );
};

MenuItem.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    icon: PropTypes.func.isRequired,
};

export default MenuItem;
