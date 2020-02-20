import React, { useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { submit } from 'redux-form';
import { ADD_POST_REQUEST } from '../reducers/post';

const style = {
  padding: '10px 20px',
  width: 140,
  display: 'block',
  margin: '20px auto',
  fontSize: '16px',
};

const RemoteSubmitButton = ({ title, tag, category }) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const { thumbImagePath } = useSelector(state => state.post);
  const {draft} = useSelector(state => state.form);
  //console.log(draft.values.editorText)

  const onClickEvent = useCallback(() => {
    const formData = new FormData();
    thumbImagePath.forEach((i) => {
      formData.append('thumbimage', i)
    });
    formData.append('title', title);
    formData.append('category', category);
    formData.append('tag', tag);
    formData.append('content', draft.values.editorText);
    dispatch({
        type : ADD_POST_REQUEST,
        data : formData
    });
  }, [title, category, tag, thumbImagePath ]);

  return (
    <>
    <button
      type="button"
      style={style}
      //onClick={() => dispatch(submit('draft'))}
      onClick={onClickEvent}
      //                              ^^^^^^^^^^^^ name of the form
    >
      업로드
    </button>
    <div>{draft.values.editorText}</div>
    
    </>
  )
};

export default connect()(RemoteSubmitButton);