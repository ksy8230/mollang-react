import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_TAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../Components/PostCard';

const Tag = ({ tag }) => {
    const dispatch = useDispatch();
    const {mainPosts} = useSelector(state => state.post);
    useEffect(() => {
        dispatch({
            type : LOAD_TAG_POSTS_REQUEST,
            data : tag
        });
    }, [tag]);

    return (
        <>
            <div># {tag}</div>
            <div>
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