import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_TAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../Components/PostCard';
import StackGrid from "react-stack-grid";

const Tag = ({ tag }) => {
    const dispatch = useDispatch();
    const {mainPosts, hasMoreTagPost} = useSelector(state => state.post);
    const countRef = useRef([]);

    const onScroll = useCallback(() => {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMoreTagPost) {
                const lastId = mainPosts[mainPosts.length - 1].id;
                if (!countRef.current.includes(lastId)) {
                    console.log('countRef.current', countRef.current)
                    dispatch({
                        type: LOAD_TAG_POSTS_REQUEST,
                        lastId,
                        data : tag,
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
        console.log('hasMorePost',hasMoreTagPost)
        return () => {
            window.removeEventListener('scroll', onScroll);
            countRef.current = [];
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
    tag: PropTypes.string.isRequired,
}

Tag.getInitialProps = async (context) => {
    const tag = context.query.tag;
    console.log('Tag getInitialProps', tag)
    context.store.dispatch({
        type : LOAD_TAG_POSTS_REQUEST,
        data : tag,
        lastId : 0,
    })
    return { tag }
};

export default Tag;