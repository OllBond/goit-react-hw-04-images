import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from '../Modal/Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  // currentTarget - це оверлей, target - як оверлей так і щось всередині
  // code - код клавіши яку натиснули
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };
  useEffect(() => {
    // створюємо ф-ю close, вішаємо після першого відмалювання
    document.addEventListener('keydown', closeModal);

    // якщо повертаємо ф-ю реак запам'ятовує і викликає під час розмонтування
    // прибираємо, коли вона зникає
    return () => document.removeEventListener('keydown', closeModal);
  }, []);

  return createPortal(
    // перший аргумент - що відмалювати, другим - куди
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal} onClick={close}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired,
};
