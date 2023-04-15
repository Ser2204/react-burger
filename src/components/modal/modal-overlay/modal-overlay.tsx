import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }: { onClose: React.MouseEventHandler }) => {
    return <div onClick={onClose} className={`${styles['modal-overlay']}`} />;
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
