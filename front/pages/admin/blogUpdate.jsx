import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import EditorForm from '../../Components/EditorForm';
import RemoteSubmitUpdateButton from '../../Components/RemoteSubmitUpdateButton';

const blogUpdate = ({ id }) => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const { postAdded } = useSelector(state => state.post);
    const { singlePost } = useSelector(state => state.post);
    
    const dispatch = useDispatch();

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const onChangeTag = useCallback((e) => {
        setTag(e.target.value);
    }, []);

    useEffect(() => {
        setTitle('');
        setTag('');
    }, [])

    return (
        <div className='contents-wrap'>  
            <div className='blog-editor'>
                <div className='input-box'>
                    <input type="text" placeholder={singlePost.title} value={title} onChange={onChangeTitle} />
                </div>
                <div className='editor-form-box'>
                    <EditorForm />
                </div>
                <div className='input-box tag'>
                    <input type="text" value={tag} onChange={onChangeTag} placeholder="#태그" />
                </div>
                <RemoteSubmitUpdateButton id={id} title={title} tag={tag} />
                <button><a href="/">수정 취소</a></button>
            </div>
        </div>
    );
};

blogUpdate.propTypes = {
    id : PropTypes.number.isrequired,
}

blogUpdate.getInitialProps = async (context) => {
    console.log('blogUpdate getInitialProps', context.query.id)
    return { id : parseInt(context.query.id, 10)}
};

export default blogUpdate;