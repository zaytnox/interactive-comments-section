import { useEffect, useReducer } from 'react';

const initialState = {
  comments: JSON.parse(localStorage.comments || '[]'),
  currentId: 4,
  loading: true,
  error: false,
  methods: {},
};

const actionTypes = {
  setComments: 'SET_COMMENTS',
  error: 'ERROR',
};

const reducerObject = (state, payload) => ({
  [actionTypes.setComments]: {
    ...state,
    comments: payload?.comments,
    currentId: payload?.currentId ?? state.currentId,
    loading: false,
  },
  [actionTypes.error]: {
    ...state,
    loading: false,
    error: true,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)?.[action.type] ?? state;
};

const findIndexCommentById = (comments, id) =>
  comments.findIndex((comment) => {
    let index = -1;
    if (comment.replies?.length > 0) {
      index = findIndexCommentById(comment.replies, id);
    }
    if (index !== -1) return true;
    return comment.id === id;
  });

const useComments = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onError = () => dispatch({ type: actionTypes.error });

  const addComment = (comment) => {
    const newComments = [...state.comments, comment];
    setComments({ comments: newComments, currentId: state.currentId + 1 });
  };

  const addReply = (comment, id) => {
    const newComments = state.comments;
    const index = findIndexCommentById(state.comments, id);
    newComments[index].replies.push(comment);
    setComments({ comments: newComments, currentId: state.currentId + 1 });
  };

  const updateComment = ({ id, data = {} }) => {
    const indexComment = findIndexCommentById(state.comments, id);
    const comment = state.comments[indexComment];
    const newComments = [...state.comments];

    if (comment.id !== id) {
      const indexReply = findIndexCommentById(comment.replies, id);
      const reply = comment.replies[indexReply];
      newComments[indexComment].replies[indexReply] = {
        ...reply,
        ...data,
      };
    } else {
      newComments[indexComment] = {
        ...comment,
        ...data,
      };
    }
    setComments({ comments: newComments });
  };

  const deleteComment = (id) => {
    const indexComment = findIndexCommentById(state.comments, id);
    const comments = [...state.comments];
    const comment = state.comments[indexComment];
    if (comment.id !== id) {
      const indexReply = findIndexCommentById(comment.replies, id);
      comments[indexComment].replies.splice(indexReply, 1);
    } else {
      comments.splice(indexComment, 1);
    }
    setComments({ comments });
  };

  const setComments = (payload) => {
    localStorage.comments = JSON.stringify(payload.comments);
    dispatch({ type: actionTypes.setComments, payload });
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await import('../../data.json');
        const data = response.default;
        setComments({ comments: data.comments });
      } catch (error) {
        onError();
      }
    };
    if (!localStorage.comments) getComments();
  }, []);
  return {
    state,
    methods: { addComment, addReply, updateComment, deleteComment },
  };
};

export { useComments };
