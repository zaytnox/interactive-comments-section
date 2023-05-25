import React, { useContext, useState } from 'react';
import Comment from '../../components/Comment';
import styles from './Comments.module.css';
import Replies from '../Replies';
import { CommentsContext } from '../../contexts/CommentsContext';

const Comments = () => {
  const { comments } = useContext(CommentsContext);
  const [isReplying, setIsReplying] = useState(false);
  return (
    <ul className={styles.comments}>
      {comments.map((comment) => {
        const { replies } = comment;
        return (
          <React.Fragment key={comment.id}>
            <Comment
              {...comment}
              key={comment.id}
              isReplying={isReplying}
              setIsReplying={setIsReplying}
            >
              {replies.length > 0 && (
                <Replies
                  replies={replies}
                  isReplying={isReplying}
                  setIsReplying={setIsReplying}
                />
              )}
            </Comment>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Comments;
