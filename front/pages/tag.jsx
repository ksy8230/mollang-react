import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_TAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../Components/PostCard';
import StackGrid from "react-stack-grid";

const Tag = ({ tag }) => {
    const dispatch = useDispatch();
    const {mainPosts, hasMorePost} = useSelector(state => state.post);

    const onScroll = useCallback(() => {
        // 현재 scroll 값, 윈도우 현재 창 높이값, 전체 화면 높이값
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePost) {
                dispatch({
                    type: LOAD_TAG_POSTS_REQUEST,
                    lastId: mainPosts[mainPosts.length - 1].id,
                    data : tag,
                });
            }
        }
    }, [hasMorePost, mainPosts.length]);

    useEffect(() => {
        dispatch({
            type : LOAD_TAG_POSTS_REQUEST,
            data : tag,
            //lastId: mainPosts[mainPosts.length - 1].id,
        });
    }, [tag]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts.length]);

    return (
        <>
            <div className='blog'>
                <div># {tag}</div>
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
                                    key={i}
                                    //summery={summery}
                                />
                            )
                        })
                    }
                    </StackGrid>
                </ul>
                </div>
            </div>
        </>
    )
};

Tag.propTypes = {
    tag : PropTypes.string.isrequired,
}

Tag.getInitialProps = async (context) => {
    console.log('Tag getInitialProps', context)
    return { tag : context.query.tag }
};

export default Tag;