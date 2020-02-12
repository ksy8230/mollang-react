import React, { useEffect, useState, useCallback } from 'react';
import { dummy } from '.';

import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import PostCard from '../../Components/PostCard';
import StackGrid from "react-stack-grid";

const Blog = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editorContentHtml, setEditorContentHtml] = useState('');
    const { mainPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [summery, setSummery] = useState([]);

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

    useEffect(() => {
        // 포스트들 요약글 만들기
        summerySetFunction()
    }, [mainPosts]);

    const summerySetFunction = () => {
        const contentArray = mainPosts.map((v,i) => {
            return v.content;
        });
        //console.log(contentArray)
        const summeryArray = contentArray.map((v,i) => {
            return v.replace(/(<([^>]+)>)/ig,"");
        });
        //console.log(summeryArray)
        const subStringSummeryArray = summeryArray.map((v,i) => {
            console.log(v.length)
            if(v.length>= 100) {
                return v.substr(0,100)+"...";
            } else {
                return v;
            }
        })
        setSummery(subStringSummeryArray);
    };

    return (
        <div className='contents-wrap'>
            <div className='blog'>
            <div className='blog-title'>
                <h2>다양한 이야기를 기록하고 있어요</h2>
            </div>
            {/*<div className='tags-list'> 태그 :  
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
            </div>*/}
            <div className='post-list'>
                <ul>
                    <StackGrid
                        columnWidth={330}
                    >
                    {
                        mainPosts.map((v,i) => {
                            return (
                                <PostCard 
                                    post={v}
                                    i={i}
                                    summery={summery}
                                />
                            )
                        })
                    }
                    </StackGrid>
                </ul>
            </div>
        </div>
        </div>
    );
};

export default Blog;