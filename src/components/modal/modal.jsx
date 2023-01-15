import ReactDOM from 'react-dom';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';

const Modal = ({ children, header, onClose }) => {
    const modalRoot = document.getElementById('modal-root');
    const modalElementRef = useRef(null);
    useEffect(() => {
        const escHandler = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', escHandler);
        if (modalElementRef.current) {
            modalElementRef.current.focus();
        }
        return () => {
            document.removeEventListener('keydown', escHandler);
        };
    });
    return ReactDOM.createPortal(
        <>
            <div className={`${modalStyles['modal']}`}>
                <ModalOverlay onClose={onClose} />
                <div
                    className={`${modalStyles['modal__container']} pr-10 pl-10 pt-10 pb-15`}
                    ref={modalElementRef}
                    tabIndex={0}
                >
                    <div className={`${modalStyles['modal__header']}`}>
                        <h2 className={`${modalStyles['modal__title']} text text_type_main-large`}>{header}</h2>
                        <button
                            className={`${modalStyles['modal__close-btn']}`}
                            aria-label="Закрыть форму"
                            type="button"
                            onClick={onClose}
                        >
                            <CloseIcon type="primary" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>,
        modalRoot,
    );
};

Modal.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.func,
      ]).isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
