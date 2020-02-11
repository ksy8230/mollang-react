import React, { useEffect } from 'react';
import Router from 'next/router';
import { connect, useDispatch, useSelector } from 'react-redux';
import { submit } from 'redux-form';
import { EDIT_POST_REQUEST } from '../reducers/post';

const RemoteSubmitUpdateButton = ({ title, tag, id }) => {
  const dispatch = useDispatch();
  const postEdited = useSelector(state => state.post.postEdited);
  const me = useSelector(state => state.user.me);
  const {draft} = useSelector(state => state.form);
  console.log(draft.values.editorText)
  
  const onClickEvent = () => {
    dispatch({
        type : EDIT_POST_REQUEST,
        data : {
            PostId: id,
            content : draft.values.editorText,
            title,
            tag,
        }
    });
  }
  useEffect(() => {
    console.log(postEdited)
    if (postEdited === true) {
      Router.push(`/blog/detail/${id}`);
    }
  }, [me, postEdited])

  return (
    <>
    <button
      type="button"
      onClick={onClickEvent}
    >
      수정 완료
    </button>
    {/*<div>결과2:{draft.values.editorText}</div>*/}
    
    </>
  )
};

export default connect()(RemoteSubmitUpdateButton);