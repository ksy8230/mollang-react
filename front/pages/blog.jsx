import React, { useEffect, useState, useCallback } from 'react';
import { dummy } from '.';
import PostCard from '../Components/PostCard';
import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

function createMarkup(html) {
    return {__html: html};
}

const Blog = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editorContentHtml, setEditorContentHtml] = useState('');
    const { mainPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        /*const rawEditorData = getSavedEditorData(); //savedData 
        console.log('로컬데이터 가져오기',rawEditorData)
        if (rawEditorData !== null) {
            const contentState = convertFromRaw(rawEditorData);
            console.log('가져온 로컬데이터 ContentState로 변환',contentState)
            setEditorState(EditorState.createWithContent(contentState));
            console.log(editorState)
            setEditorContentHtml(stateToHTML(contentState));
        }*/
        dispatch({
            type : LOAD_POSTS_REQUEST,
        })
    }, []);

    /*const getSavedEditorData = () => {
        const savedData = localStorage.getItem('content');
        console.log('savedData', savedData)
        return savedData ? JSON.parse(savedData) : null;
    };*/

    return (
        <div className='blog'>
            <h2>다양한 이야기를 기록하고 있어요</h2>
            <div className='tags-list'> 태그 :  
                {
                    mainPosts.map((v,i) => {
                        return (
                        <span>
                            {
                                // console.log(v.tag)
                                //JSON.parse(v.tag).map(v => v)
                                //console.log(JSON.parse(v.tag))
                            }
                        </span>
                        )
                    })
                }
            </div>
            
            <div dangerouslySetInnerHTML={createMarkup(editorContentHtml)} />
            <div className='post-list'>
                <ul>
                    {
                        mainPosts.map((v,i) => {
                            return (
                                <PostCard 
                                    post={v}
                                    key={i}
                                />
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default Blog;