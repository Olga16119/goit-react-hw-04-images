import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ data, onClose }) => {
  useEffect = () => {
    window.addEventListener('keydown', event => onCloseModal(event));
    return window.removeEventListener('keydown', event => onCloseModal(event));
  };

  const onCloseModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      onClose();
    }
  };

  const { largeImageURL, tags } = data || {};
  return (
    <div onClick={onCloseModal} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  data: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default Modal;
