import React, { useContext, useState } from 'react';
import styles from './UpdateComment.module.css';
import PrimaryButton from '../PrimaryButton';
import { CommentsContext } from '../../contexts/CommentsContext';

const UpdateComment = ({
  content,
  replyingTo,
  commentId,
  setUpdateVisibility,
}) => {
  const [value, setValue] = useState(content);
  const { updateComment } = useContext(CommentsContext);
  const username = !!replyingTo ? `@${replyingTo} ` : '';

  return (
    <div className={styles.updateComment}>
      <textarea
        name=""
        id=""
        value={username + value}
        rows={4}
        onChange={(e) => {
          setValue(e.target.value.substring(username.length));
        }}
      ></textarea>
      <PrimaryButton
        onClick={() => {
          updateComment({ id: commentId, data: { content: value } });
          setUpdateVisibility(false);
        }}
      >
        UPDATE
      </PrimaryButton>
    </div>
  );
};

export default UpdateComment;
