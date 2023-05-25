import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import React, { useRef } from 'react';

const Modal = ({ children, modalVisibility, setModalVisibility }) => {
  const modalRef = useRef(null);
  if (!modalVisibility) return null;
  return createPortal(
    <div
      className={styles.modal}
      onClick={(e) => {
        if (e.target === modalRef.current) setModalVisibility(false);
      }}
      ref={modalRef}
    >
      {children}
    </div>,
    document.body
  );
};

export default Modal;
