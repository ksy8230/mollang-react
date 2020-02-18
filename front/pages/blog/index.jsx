import React, { useEffect, useState, useCallback, useRef } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import PostCard from '../../Components/PostCard';
import StackGrid from "react-stack-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchForm from '../../Components/SearchForm';
import Router from 'next/router';

export function summary (postsState, summaryState) {
    const contentArray = postsState.map((v,i) => {
        return v.content;
    });
    const summeryArray = contentArray.map((v,i) => {
        return v.replace(/(<([^>]+)>)/ig,"");
    });
    const subStringSummeryArray = summeryArray.map((v,i) => {
        if(v.length>= 100) {
            return v.substr(0,100)+"...";
        } else {
            return v;
        }
    });
    summaryState(subStringSummeryArray);
}

const Blog = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editorContentHtml, setEditorContentHtml] = useState('');
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const countRef = useRef([]);
    const [summery, setSummery] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const onScroll = useCallback(() => {
        // 현재 scroll 값, 윈도우 현재 창 높이값, 전체 화면 높이값
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePost) {
                const lastId = mainPosts[mainPosts.length - 1].id;                
                if (!countRef.current.includes(lastId)) {
                    // lastId가 countRef에 속해있지 않으면 다음 포스트들 로드
                    console.log('countRef.current', countRef.current)
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    });
                    countRef.current.push(lastId);
                    // 한번 요청을 보낸 lastId들을 countRef 배열에 담아
                    // 다음 요청 때 if문에서 걸러지도록 만들기
                }
            } else {
                countRef.current = [];
            }
        }
    }, [hasMorePost, mainPosts.length, countRef]);

    useEffect(() => {
        // 포스트들 요약글 만들기
        //summerySetFunction();
        summary(mainPosts, setSummery);        
    }, [mainPosts]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts.length]);

    const onChangeSearch = useCallback((e) => {
        setSearchValue(e.target.value);
    }, []);

    const onSubmitSearch = useCallback((e) => {
        e.preventDefault();
        if ( !searchValue || !searchValue.trim() ) {
            return alert('검색어를 입력하세요.');
        }
        Router.push({ pathname : '/tag', query: { tag: searchValue}}, `/tag/${searchValue}`);
    }, [searchValue]);

    return (
        <div className='contents-wrap'>
            <div className='blog'>
                <div className='blog-head'>
                    <div className='blog-title'>
                        <h2>다양한 이야기를 기록하고 있어요</h2>
                    </div>
                    <div class="input-box">
                        <SearchForm 
                            onSubmitSearch={onSubmitSearch}
                            onChangeSearch={onChangeSearch}
                        />
                    </div>
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
                            columnWidth={337.5}
                            // duration={0}
                            monitorImagesLoaded ={true}
                        >
                        {
                            mainPosts.map((v,i) => {
                                return (
                                    <PostCard 
                                        post={v}
                                        i={i}
                                        key={i}
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

Blog.getInitialProps = async (context) => {
    console.log(Object.keys(context));
    context.store.dispatch({
        type : LOAD_POSTS_REQUEST,
        lastId : 0,
    });
};

export default Blog;