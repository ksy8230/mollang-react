import React, { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_TAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../Components/PostCard';
import StackGrid from "react-stack-grid";
import { summary } from '../Components/FunctionalComponent';
import SearchForm from '../Components/SearchForm';
import Router from 'next/router';
import Link from 'next/link';
import { onClickPost } from './blog';

const Tag = ({ tag }) => {
    const dispatch = useDispatch();
    const {mainPosts, hasMoreTagPost} = useSelector(state => state.post);
    const countRef = useRef([]);
    const [summery, setSummery] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const onScroll = useCallback(() => {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMoreTagPost) {
                const lastId = mainPosts[mainPosts.length - 1].id || 0;
                if (!countRef.current.includes(lastId)) {
                    //console.log('countRef.current', countRef.current)
                    dispatch({
                        type: LOAD_TAG_POSTS_REQUEST,
                        data : tag,
                        lastId,
                        limit : 10,
                    });
                    countRef.current.push(lastId);
                } 
            } else {
                countRef.current = [];
            }
        }
    }, [hasMoreTagPost, mainPosts.length, countRef ]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        // 포스트들 요약글 만들기
        summary(mainPosts, setSummery);
        return () => {
            window.removeEventListener('scroll', onScroll);
            countRef.current = [];
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
                        <h2>{tag} 관련 포스트</h2>
                    </div>
                    <div class="input-box">
                        <SearchForm 
                            onSubmitSearch={onSubmitSearch}
                            onChangeSearch={onChangeSearch}
                        />
                    </div>
                </div>
                <div className='post-list'>
                    <ul>
                    <StackGrid
                        columnWidth={337.5}
                        duration={0}
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
                                    onClickPost={onClickPost}
                                />
                            )
                        })
                    }
                    </StackGrid>
                </ul>
                </div>
                <div className='blog-footer'>
                    <Link href='/blog'><a>목록으로 돌아가기</a></Link>
                </div>
            </div>
        </div>
    )
};

Tag.propTypes = {
    tag: PropTypes.string.isRequired,
}

Tag.getInitialProps = async (context) => {
    const tag = context.query.tag;
    console.log('Tag getInitialProps', tag)
    context.store.dispatch({
        type : LOAD_TAG_POSTS_REQUEST,
        data : tag,
        lastId : 0,
        limit : 10,
    })
    return { tag }
};

export default Tag;