import React, { useContext, useRef, useState } from 'react';
import Score from '../Score';
import styles from './Comment.module.css';
import Options from '../Options';
import { UserContext } from '../../contexts/UserContext';
import NewComment from '../NewComment';
import UpdateComment from '../UpdateComment';

const Comment = (props) => {
  const {
    id,
    user,
    createdAt,
    replyingTo,
    content,
    isReplying,
    setIsReplying,
    children,
    score,
    vote = 'none',
  } = props;

  const [updateVisibility, setUpdateVisibility] = useState(false);
  const { currentUser } = useContext(UserContext);
  const commentRef = useRef(null);

  return (
    <li ref={commentRef}>
      <div className={styles.comment}>
        <Score commentId={id} score={score} type="desktop" vote={vote} />
        <div className={styles.commentContent}>
          <div className={styles.containerUser}>
            <div className={styles.user}>
              <img src={user.image.webp} alt={`Avatar of ${user.username}`} />
              <div className={styles.username}>
                <span>{user.username}</span>
                {user.username === currentUser.username && (
                  <span className={styles.userLabel}>you</span>
                )}
              </div>
              <p>{createdAt}</p>
            </div>
            <Options
              user={user}
              id={id}
              setIsReplying={setIsReplying}
              setUpdateVisibility={setUpdateVisibility}
              type="desktop"
            />
          </div>
          <div>
            {(user.username === currentUser.username && updateVisibility && (
              <UpdateComment
                content={content}
                replyingTo={replyingTo}
                commentId={id}
                setUpdateVisibility={setUpdateVisibility}
              />
            )) || (
              <p>
                {replyingTo && (
                  <span className={styles.replyingTo}>@{replyingTo} </span>
                )}
                {content}
              </p>
            )}
          </div>
        </div>
        <div className={styles.commentButtons}>
          <Score commentId={id} score={score} vote={vote} />
          <Options
            user={user}
            id={id}
            setIsReplying={setIsReplying}
            setUpdateVisibility={setUpdateVisibility}
          />
        </div>
      </div>
      {isReplying?.value && isReplying?.id === id && (
        <NewComment
          type="reply"
          replyingTo={{ user: user.username, id }}
          setIsReplying={setIsReplying}
        />
      )}
      {children}
    </li>
  );
};

export default Comment;
