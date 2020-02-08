import React from 'react';
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

const RemoteSubmitButton = ( ) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {draft} = useSelector(state => state.form);
  console.log(draft.values.editorText)
  const onClickEvent = () => {
    dispatch({
        type : ADD_POST_REQUEST,
        data : {
          date : '2020-02-08',
          content : draft.values.editorText
        }
    });
  }

  return (
    <>
    <button
      type="button"
      style={style}
      //onClick={() => dispatch(submit('draft'))}
      onClick={onClickEvent}
      //                              ^^^^^^^^^^^^ name of the form
    >
      Submit
    </button>
    <div>결과2:{draft.values.editorText}</div>
    
    </>
  )
};

export default connect()(RemoteSubmitButton);