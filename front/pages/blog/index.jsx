import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import PostCard from '../../Components/PostCard';
import StackGrid from "react-stack-grid";
import SearchForm from '../../Components/SearchForm';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { summary, makeUniqueTagList } from '../../Components/FunctionalComponent';
//import NProgress from 'nprogress';

export const onClickPost = (e) => {
    let post = e.currentTarget.parentNode.parentNode.parentNode;
    let posts = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    const lis = posts.querySelectorAll('li');
    const lisarray = Array.prototype.slice.call(lis);
    lisarray.map(v => {
        v.classList.add('no')
    })
    post.classList.add('active')
};

const Blog = () => {
    const { mainPosts, hasMorePost, isLoadPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const countRef = useRef([]);
    const [summery, setSummery] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [categoryList, setCategoryList] = useState('post');
    const [stackGrid, setStackGrid] = useState();
    const router = useRouter();
    const onScroll = useCallback(() => {
        // 현재 scroll 값, 윈도우 현재 창 높이값, 전체 화면 높이값
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePost) {
                console.log(hasMorePost)
                const lastId = mainPosts[mainPosts.length - 1].id;                
                if (!countRef.current.includes(lastId)) {
                    // lastId가 countRef에 속해있지 않으면 다음 포스트들 로드
                    console.log('countRef.current', countRef.current)
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                        limit : 10,
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

    const onClickSeriesList = useCallback(() => {
        setCategoryList('category');
    }, [categoryList]);
    const onClickPostList = useCallback(() => {
        setCategoryList('post');
    }, [categoryList]);
    const onClickTagList = useCallback(() => {
        setCategoryList('tag');
    }, [categoryList]);

    return (
        <div className={isLoadPosts ? 'contents-wrap loading' : 'contents-wrap'}>           
            <div className='blog'>
                <div className='blog-head'>
                    <div className='blog-title'>
                        <h2>다양한 이야기를 기록하고 있어요</h2>
                    </div>
                    <div className="input-box">
                        <SearchForm 
                            onSubmitSearch={onSubmitSearch}
                            onChangeSearch={onChangeSearch}
                        />
                    </div>
                </div>
                <div className='blog-filter'>
                    <div className={categoryList === 'post' ? 'active' : ''} onClick={onClickPostList}>포스트</div>
                    <div className={categoryList === 'category' ? 'active' : ''} onClick={onClickSeriesList}>시리즈</div>
                    <div className={categoryList === 'tag' ? 'active' : ''} onClick={onClickTagList}>태그</div>
                </div>
                {
                    categoryList === 'category' ? 
                    <div className='series-list'>
                        {
                            Array.from(new Set(mainPosts.map( v => v.category ))).map((v,i) => {
                                if (v !== '') {
                                    return (
                                        <div key={v.id}>
                                            <p className='title'>
                                            <Link href={{ pathname: '/blog/series', query : {category : v}}} as={`/blog/series/${v}`} >
                                                {v}
                                            </Link>
                                            </p>
                                            <p>{mainPosts.filter(c => c.category === v).map(c => c).length}개의 포스트</p>
                                        </div>
                                    )
                                }  
                            })
                        }
                    </div>
                    : categoryList === 'post' ?
                    <div className='post-list'>
                        <ul>
                            <StackGrid
                                columnWidth={337.5}
                                gridRef={grid => setStackGrid(grid)}
                                // duration={0}
                                monitorImagesLoaded ={true}
                            >
                            {
                                mainPosts.map((v,i) => {
                                    return (
                                        <PostCard 
                                            post={v}
                                            i={i}
                                            key={v.id}
                                            summery={summery}
                                            onClickPost={onClickPost}
                                        />
                                    )
                                })
                            }
                            </StackGrid>
                        </ul>
                    </div>
                    : categoryList === 'tag' ?
                    <div className='tag-list'>
                        {
                            makeUniqueTagList(mainPosts).map((v,i) => {
                                if (v !== 'null' && v !=='') {
                                    return (
                                        <span className='tag' key={v.id}>
                                            <Link href={{ pathname: '/tag', query : {tag : v}}} as={`/tag/${v}`}>
                                                <a>#{v}</a>
                                            </Link>
                                        </span>
                                    )
                                }
                            })
                        }
                    </div>
                    : null
                }            
            </div>
        </div>
    );
};

Blog.getInitialProps = async (context) => {
    //console.log(Object.keys(context));
    context.store.dispatch({
        type : LOAD_POSTS_REQUEST,
        lastId : 0,
        limit : 10,
    });
};

export default Blog;