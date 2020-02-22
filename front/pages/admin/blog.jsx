import React, { useCallback, useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import EditorForm from '../../Components/EditorForm';
import RemoteSubmitButton from '../../Components/RemoteSubmitButton';
import {UPLOAD_THUMB_IMAGE_REQUEST} from '../../reducers/post';
import AdminMenu from '../../Components/AdminMenu';
import { Router } from 'next/router';
import { LOAD_USER_REQUEST } from '../../reducers/user';

const Blog = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState('');
    const { postAdded, thumbImagePath } = useSelector(state => state.post);
    const { me } = useSelector(state => state.user);
    const refThumbImageInput = useRef();
    const dispatch = useDispatch();

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const onChangeCategory = useCallback((e) => {
        setCategory(e.target.value);
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
    }, [postAdded]);

    // useEffect(() => {
    //     useDispatch({
    //       type : LOAD_USER_REQUEST
    //     })
    // }, [me]);

    useEffect(() => {
        if ( me == null || me.id !== 1 ){
            alert('관리자 권한이 없습니다.');
            Router.push('/');
        }
    }, [me && me.id]);



    return (
        <div className='admin'> 
            <AdminMenu />
            <div className='admin-content'>
                <div className='blog-editor'>
                <div className='input-box'>
                    <input type="text" value={title} onChange={onChangeTitle} placeholder="제목" required />
                </div>
                <div className='input-box'>
                    <input type="text" value={category} onChange={onChangeCategory} placeholder="새로운 시리즈" />
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

                <RemoteSubmitButton title={title} tag={tag} category={category} />
            </div>
            </div>
        </div>
    );
};

export default Blog;