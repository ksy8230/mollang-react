import React, { useCallback, useState, useEffect } from 'react';
import EditorContainer from '../Components/EditorContainer';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';
import EditorForm from '../Components/EditorForm';
import RemoteSubmitButton from '../Components/RemoteSubmitButton';

const Blog = () => {
    const [text, setText] = useState('');
    const { postAdded } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type : ADD_POST_REQUEST,
            data : {
                text
            }
        });
        //console.log(action.data)
    }, []);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    useEffect(() => {
        setText('');
    }, [postAdded])

    return (
        <>
            <div>
                <form onSubmit={onSubmitForm}>
                    <input type="text" value={text} onChange={onChangeText} />
                    <button>글쓰기</button>
                </form>
            </div>
            관리자가 사용하는 에디터
            
            리덕스-폼을 이용한 작동 방식
            <EditorForm dispatch={dispatch} />
            <RemoteSubmitButton />
        </>
    );
};

export default Blog;