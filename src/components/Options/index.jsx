import React, { useContext, useState } from 'react';
import deleteIco from '/images/icon-delete.svg';
import editIco from '/images/icon-edit.svg';
import reply from '/images/icon-reply.svg';
import styles from './Options.module.css';
import { UserContext } from '../../contexts/UserContext';
import { ModalContext } from '../../contexts/ModalContext';
import Modal from '../../layouts/Modal';
import ModalBox from '../ModalBox';

const Options = ({
  id,
  user,
  setIsReplying,
  type = '',
  setUpdateVisibility,
}) => {
  const { currentUser } = useContext(UserContext);
  const [modalVisibility, setModalVisibility] = useState(false);

  const onDelete = () => setModalVisibility(true);
  const onEdit = () => {
    setUpdateVisibility((prevState) => !prevState);
  };

  if (currentUser.username === user.username)
    return (
      <>
        <Modal
          modalVisibility={modalVisibility}
          setModalVisibility={setModalVisibility}
        >
          <ModalBox setModalVisibility={setModalVisibility} commentId={id} />
        </Modal>

        <div className={`${styles.options} ${styles[type] || ''}`}>
          <button
            className={`${styles.option} ${styles.delete}`}
            onClick={onDelete}
          >
            <img src={deleteIco} alt="" />
            Delete
          </button>
          <button className={styles.option} onClick={onEdit}>
            <img src={editIco} alt="" />
            Edit
          </button>
        </div>
      </>
    );

  return (
    <div className={`${styles.options} ${styles[type] || ''}`}>
      <button
        className={`${styles.option}`}
        onClick={() => {
          setIsReplying((prevState) => ({
            value: prevState.id === id ? !prevState.value : true,
            id,
          }));
        }}
      >
        <img src={reply} alt="" />
        Reply
      </button>
    </div>
  );
};

export default Options;
