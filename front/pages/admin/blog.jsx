import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditorForm from '../../Components/EditorForm';
import RemoteSubmitButton from '../../Components/RemoteSubmitButton';
import {UPLOAD_THUMB_IMAGE_REQUEST} from '../../reducers/post';

const Blog = () => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const { postAdded, thumbImagePath } = useSelector(state => state.post);
    const refThumbImageInput = useRef();
    const dispatch = useDispatch();

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const onChangeTag = useCallback((e) => {
        setTag(e.target.value);
    }, []);

    const onClickUploadThumbImage = useCallback(() => {
        refThumbImageInput.current.click();
    }, [refThumbImageInput.current]);

    const onChangeThumbImage = useCallback((e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            console.log('f',f)
            imageFormData.append('thumbimage', f);
        });
        //imageFormData.append('thumbimage', e.target.files.filename);
        console.log(e.target.files)
        console.log('imageFormData', imageFormData)
        dispatch({
            type : UPLOAD_THUMB_IMAGE_REQUEST,
            data : imageFormData,
        });
    }, []);

    useEffect(() => {
        setTitle('');
        setTag('');
    }, [postAdded])

    return (
        <div className='contents-wrap'> 
            <div className='blog-editor'>
                <div className='input-box'>
                    <input type="text" value={title} onChange={onChangeTitle} placeholder="제목" required />
                </div>
                <div className='editor-form-box'>
                    <EditorForm />
                </div>
                <div className='input-box tag'>
                    <input type="text" value={tag} onChange={onChangeTag} placeholder="#태그" />
                </div>
                <div className='thumb-preview-box'>
                    <div>
                        <img src={
                            thumbImagePath && thumbImagePath[0] === undefined ? '/images/thumbnail_default_img.jpg': `http://localhost:8080/${thumbImagePath && thumbImagePath[0]}`
                            } alt=""/>
                    </div>
                    <form encType='multipart/form-data'>
                        <input type="file" multiple hidden ref={refThumbImageInput} onChange={onChangeThumbImage} />
                    </form>
                    <button onClick={onClickUploadThumbImage}><a>썸네일 이미지 업로드</a></button>
                </div>

                <RemoteSubmitButton title={title} tag={tag} />
            </div>
        </div>
    );
};

export default Blog;