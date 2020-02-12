import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POST_REQUEST, DELETE_POST_REQUEST } from '../../reducers/post';
import Link from 'next/link';

function createMarkup(html) {
    return {__html: html};
}

function makeTagList(value) { // singlePost 문자열된 태그들 추출
    const eraseString = value.replace("[","").replace("]","");
    const eraseString2 = eraseString.replace(/"/g,"").replace(/#/g,"");
    const splitString = eraseString2.split(",");
    return splitString
}

const Detail = ({ id }) => {
    const dispatch = useDispatch();
    const { singlePost } = useSelector(state => state.post);
    const [sideLinker, setSideLinker] = useState([]);

    const makeSideLinker = () => { // h태그들 추출해 aside 링커로 만들기 & h태그들 링커id값 부여
        let hTag = Array.from(document.querySelectorAll('h1,h2,h3,h4'));
        let hTagTitle = [];
        for (var i = 0; i < hTag.length; i++) {
            hTag[i].id = hTag[i].innerText.replace(/ /g,"_");
            hTagTitle.push(hTag[i].innerText.replace(/ /g,"_"));
        }
        return hTagTitle;
    }

    const onClickToTitle = (e) => { // 링커 클릭시 해당 본문 id 값으로 이동
        e.preventDefault();
        let titleTagId = e.target.getAttribute('href').replace("#","");
        document.getElementById(titleTagId).scrollIntoView({behavior: 'smooth'});
    }

    const onClickDeletePost = () => {
        dispatch({
            type : DELETE_POST_REQUEST,
            data : id,
        });
        Router.push('/');
    };

    useEffect(() => {
        dispatch({
            type : LOAD_POST_REQUEST,
            data : id,
        });
        setTimeout(() => {
            setSideLinker(makeSideLinker());
        }, 300)
    }, [id]);

    return (
        <div className='contents-wrap'>
            <div className='blog-detail'> 
                <div className='admin-buttons'>
                    <button><Link href={{ pathname: '/admin/blogUpdate', query: {id : id} }} as={`/admin/blogUpdate/${id}`}><a>수정</a></Link></button>
                    <button onClick={onClickDeletePost}><a>삭제</a></button>
                </div>
                <div>
                    <h2 className='title'>{singlePost.title}</h2>
                    <span className='date'>{singlePost.created_at}</span>
                    <div className='draft-editor-contents' dangerouslySetInnerHTML={createMarkup(singlePost.content)} />
                    <p className='post-tag'>
                        {
                            singlePost.tag ?
                            makeTagList(singlePost.tag).map((v,i) => {
                                return (
                                <span key={i} style={{marginRight:10}}><Link href={{ pathname: '/tag', query : {tag : v}}} as={`/tag/${v}`} ><a>#{v}</a></Link></span>
                                )
                            }) : null
                        }
                    </p>
                </div>
            </div>
            <div className='sidenav'>
                <ul>
                    {
                        sideLinker.map((v,i) => {
                            return (
                                <li key={i}>
                                    <a href={`#${v}`} onClick={onClickToTitle}>{v}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

Detail.propTypes = {
    id : PropTypes.number.isrequired,
}

Detail.getInitialProps = async (context) => {
    console.log('Detail getInitialProps', context.query.id)
    return { id : parseInt(context.query.id, 10)}
};

export default Detail;