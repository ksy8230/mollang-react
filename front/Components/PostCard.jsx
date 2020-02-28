import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, memo } from 'react';
import { backURL } from '../config/config';
import { makeTagList } from './FunctionalComponent';
import { useRouter } from 'next/router';

const PostCard = memo(({ post, i, summery, onClickPost }) => {
    const router = useRouter();
    return (
        <li className='post-item' >
            <div className='post-description'>
                <div className='post-head'>
                    <div className='post-thumb' onClick={onClickPost}>
                        <a onClick={() => setTimeout(() => router.push( { pathname: '/blog/detail', query: {id : post.id} }, '/blog/detail/' + post.id ), 800)}>
                            <img src={ post.Images && post.Images[0] ? `${post.Images[0].src}` : '/images/post_default_img.jpg'} alt=""/>
                        </a>
                    </div>
                    <div className='post-title'>
                        {/* <h3><Link href={{ pathname: '/blog/detail', query: {id : post.id}}} as={`/blog/detail/${post.id}`}><a>{post.title}</a></Link></h3> */}
                        <h3>{post.title}</h3>
                        <p className='post-date'>{post.created_at && post.created_at.toString().split('T')[0]}</p>
                    </div>
                </div>
                <div className='post-summery'>
                    <p>{summery[i]}</p>
                </div>
                <p className='post-tag'>
                    {
                        post.tag !== 'null' && post.tag !== '' ?
                        makeTagList(post.tag).map((v,i) => {
                            return (
                            <span key={i} style={{marginRight:10}}><Link href={{ pathname: '/tag', query : {tag : v}}} as={`/tag/${v}`}><a>#{v}</a></Link></span>
                            )
                        }) : null
                    }
                </p>
            </div>
        </li>
    );
});

PostCard.propTypes = {
    post : PropTypes.shape({
        thumbImg : PropTypes.string,
        title : PropTypes.string,
        content : PropTypes.string,
        date : PropTypes.string,
        createdAt : PropTypes.object,
    }),
};

export default PostCard;