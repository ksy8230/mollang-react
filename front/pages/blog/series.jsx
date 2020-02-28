import React, { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_TAG_POSTS_REQUEST, LOAD_SERIES_POSTS_REQUEST } from '../../reducers/post';
import Router from 'next/router';
import { summary } from '../../Components/FunctionalComponent';
import Link from 'next/link';
import { backURL } from '../../config/config';

const Category = ({ category }) => {
    const dispatch = useDispatch();
    const {mainPosts} = useSelector(state => state.post);
    const [summery, setSummery] = useState([]);

    useEffect(() => {
        // 포스트들 요약글 만들기   
        summary(mainPosts, setSummery);
    }, [mainPosts]);

    return (
        <div className='contents-wrap'>
            <div className='blog'>
                <div className='blog-head'>
                    <h2>{category} 시리즈 페이지</h2>
                </div>
                <div className='blog-series'>
                    {
                        mainPosts.filter(c => c.category === category).map((v,i) => {
                            return (
                                <div className='series' key={i}>
                                    <Link href={{ pathname: '/blog/detail', query: {id : v.id}}} as={`/blog/detail/${v.id}`}><a></a></Link>
                                    <div className='series-thumb'><img src={ v.Images && v.Images[0] ? `${v.Images[0].src}` : '/images/post_default_img.jpg'} alt=""/></div>
                                    <div className='series-info'>
                                        <p className='summary'>{summery[i]}</p>
                                        <p>{v.created_at && v.created_at.toString().split('T')[0]}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='blog-footer'>
                    <Link href='/blog'><a>목록으로 돌아가기</a></Link>
                </div>
            </div>
        </div>
    )
};

Category.propTypes = {
    category: PropTypes.string.isRequired,
}

Category.getInitialProps = async (context) => {
    const category = context.query.category;
    console.log('category', category)
    context.store.dispatch({
        type : LOAD_SERIES_POSTS_REQUEST,
        data : category,
        //lastId : 0,
    })
    return { category }
};

export default Category;