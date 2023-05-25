import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from './NewComment.module.css';
import PrimaryButton from '../PrimaryButton';
import { useComments } from '../../hooks/useComments';
import { CommentsContext } from '../../contexts/CommentsContext';

const NewComment = ({ type, replyingTo, setIsReplying }) => {
  const { currentId, addComment, addReply } = useContext(CommentsContext);
  const { currentUser } = useContext(UserContext);
  const [value, setValue] = useState('');
  const username = replyingTo?.user ? `@${replyingTo.user} ` : '';

  const onChange = (e) => {
    setValue(e.target.value.substring(username.length));
  };

  return (
    <div className={`${styles.newComment} ${styles[type] || ''}`}>
      <textarea
        cols="10"
        rows="4"
        placeholder="Add a comment..."
        value={username + value}
        onChange={onChange}
      ></textarea>
      <div>
        <img
          src={currentUser.image?.webp}
          alt={`Avatar of ${currentUser.username}`}
        />
        <textarea
          className={styles.textareaDesktop}
          cols="10"
          rows="4"
          placeholder="Add a comment..."
          value={username + value}
          onChange={onChange}
        ></textarea>
        <PrimaryButton
          onClick={() => {
            const comment = {
              id: currentId + 1,
              content: value,
              createdAt: '1 minute ago',
              score: 0,
              user: currentUser,
            };
            if (type === 'reply') {
              setIsReplying({ value: false, id: replyingTo.id });
              addReply(
                {
                  ...comment,
                  replyingTo: replyingTo.user,
                },
                replyingTo.id
              );
            } else {
              addComment({ ...comment, replies: [] });
            }
            setValue('');
          }}
          aria-label={type === 'reply' ? 'reply button' : 'send button'}
        >
          {type === 'reply' ? 'REPLY' : 'SEND'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default NewComment;
