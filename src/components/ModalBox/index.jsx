import React, { useContext } from 'react';
import styles from './ModalBox.module.css';
import { CommentsContext } from '../../contexts/CommentsContext';

const ModalBox = ({ setModalVisibility, commentId }) => {
  const closeModal = () => setModalVisibility(false);
  const { deleteComment } = useContext(CommentsContext);

  return (
    <div className={styles.box}>
      <span>Delete comment</span>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div className={styles.buttons}>
        <button onClick={closeModal}>NO, CANCEL</button>
        <button
          className={styles.delete}
          onClick={() => {
            closeModal();
            deleteComment(commentId);
          }}
        >
          YES, DELETE
        </button>
      </div>
    </div>
  );
};

export default ModalBox;
