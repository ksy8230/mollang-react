import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditorForm from '../../Components/EditorForm';
import RemoteSubmitButton from '../../Components/RemoteSubmitButton';

const Blog = () => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const { postAdded } = useSelector(state => state.post);

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const onChangeTag = useCallback((e) => {
        setTag(e.target.value);
    }, []);

    useEffect(() => {
        setTitle('');
        setTag('');
    }, [postAdded])

    return (
        <>  
            관리자가 사용하는 에디터입니다
            <div>
                <input type="text" value={title} onChange={onChangeTitle} placeholder="제목" />
            </div>
            <EditorForm />
            <div>
                <input type="text" value={tag} onChange={onChangeTag} placeholder="태그" />
            </div>
            <RemoteSubmitButton title={title} tag={tag} />
        </>
    );
};

export default Blog;