import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
    return <div onClick={onClose} className={`${modalOverlayStyles['modal-overlay']}`}></div>;
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
