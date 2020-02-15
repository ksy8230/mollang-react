import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

function createMarkup(html) {
    return {__html: html};
}

function makeTagList(value) {
    const eraseString = value.replace("[","").replace("]","");
    const eraseString2 = eraseString.replace(/"/g,"").replace(/#/g,"");
    const splitString = eraseString2.split(",");
    
    return splitString
}

const PostCard = ({ post, i, summery }) => {
    return (
        <li>
            <div className='post-description'>
                <div className='post-head'>
                    <div className='post-thumb'>
                        <Link href={{ pathname: '/blog/detail', query: {id : post.id}}} as={`/blog/detail/${post.id}`}><a>
                            <img src={ post.Images && post.Images[0] ? `http://localhost:8080/${post.Images[0].src}` : '/images/post_default_img.jpg'} alt=""/>
                        </a></Link>
                    </div>
                    <div className='post-title'>
                        <h3><Link href={{ pathname: '/blog/detail', query: {id : post.id}}} as={`/blog/detail/${post.id}`}><a>{post.title}</a></Link></h3>
                        <p className='post-date'>{post.date|| '2020.02.12'}</p>
                        {/* <p>{summery[i]}</p> */}
                    </div>
                </div>
                {/*<div className='post-content' dangerouslySetInnerHTML={createMarkup(post.content)} />*/}
                <p className='post-tag'>
                    {
                        post.tag ?
                        makeTagList(post.tag).map((v,i) => {
                            return (
                            <span style={{marginRight:10}}><Link href={{ pathname: '/tag', query : {tag : v}}} as={`/tag/${v}`} ><a>#{v}</a></Link></span>
                            )
                        }) : null
                    }
                </p>
            </div>
        </li>
    );
};

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