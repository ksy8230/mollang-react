import Link from 'next/link';
import PropTypes from 'prop-types';

function createMarkup(html) {
    return {__html: html};
  }

const PostCard = ({ post }) => {
    return (
        <li>
            <div className='post-thumb'>
                <img src={post.thumbImg} alt=""/>
            </div>
            <div className='post-description'>
                <h3>{post.title}</h3>
                <p dangerouslySetInnerHTML={createMarkup(post.content)} />
                <p className='post-date'>{post.date}</p>
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
    })
};

export default PostCard;