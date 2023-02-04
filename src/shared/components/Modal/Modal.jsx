import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from '../Modal/Modal.module.css';
const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }
  // currentTarget - це оверлей, target - як оверлей так і щось всередині
  // code - код клавіши яку натиснули
  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };
  render() {
    const { children, close } = this.props;
    const { closeModal } = this;
    return createPortal(
      // перший аргумент - що відмалювати, другим - куди
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal} onClick={close}>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired,
};
