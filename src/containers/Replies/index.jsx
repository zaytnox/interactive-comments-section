import React from 'react';
import Comment from '../../components/Comment';
import styles from './Replies.module.css';

const Replies = ({ replies, isReplying, setIsReplying }) => {
  return (
    <ul className={styles.replies}>
      {replies.map((reply) => (
        <Comment
          {...reply}
          key={reply.id}
          type="reply"
          isReplying={isReplying}
          setIsReplying={setIsReplying}
        />
      ))}
    </ul>
  );
};

export default Replies;
