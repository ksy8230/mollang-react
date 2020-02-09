import Link from 'next/link';
import PropTypes from 'prop-types';

function createMarkup(html) {
    return {__html: html};
}

function makeTagList(value) {
    const eraseString = value.replace("[","").replace("]","");
    const eraseString2 = eraseString.replace(/"/g,"").replace(/#/g,"");
    const splitString = eraseString2.split(",");
    return splitString
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
                <p className='post-tag'>
                    {
                        post.tag ?
                        makeTagList(post.tag).map((v,i) => {
                            return (
                            <span>#{v} </span>
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
    })
};

export default PostCard;