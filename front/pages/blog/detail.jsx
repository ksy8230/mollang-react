import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POST_REQUEST, DELETE_POST_REQUEST } from '../../reducers/post';
import moment from 'moment';
//moment.locale('ko');

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
    const { me } = useSelector(state => state.user);
    const [sideLinker, setSideLinker] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);

    const makeSideLinker = () => { // h태그들 추출해 aside 링커로 만들기 & h태그들 링커id값 부여
        let hTag = Array.from(document.querySelectorAll('h1,h2,h3,h4'));
        let hTagTitle = [];
        for (var i = 0; i < hTag.length; i++) {
            hTag[i].id = hTag[i].innerText.replace(/ /g,"_");
            hTagTitle.push(hTag[i].innerText.replace(/ /g,"_"));
        }
        return hTagTitle;
    };

    const onClickToTitle = (e) => { // 링커 클릭시 해당 본문 id 값으로 이동
        e.preventDefault();
        let titleTagId = e.target.getAttribute('href').replace("#","");
        document.getElementById(titleTagId).scrollIntoView({behavior: 'smooth'});
    };

    const onClickDeletePost = () => { // 포스트 삭제
        dispatch({
            type : DELETE_POST_REQUEST,
            data : id,
        });
        Router.push('/');
    };

    const onScroll = (e) => { // 스크롤 이벤트
        const currentScrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
        setScrollTop(currentScrollTop);
        const top = document.querySelector('.draft-editor-contents').getBoundingClientRect().top;
        const sideNav = document.querySelector('.sidenav');
        if (currentScrollTop >= top - 50 ) {
            sideNav.classList.add('active');
        } else {
            sideNav.classList.remove('active');
        }
    };

    useEffect(() => {
        // dispatch({
        //     type : LOAD_POST_REQUEST,
        //     data : id,
        // });
        setTimeout(() => {
            setSideLinker(makeSideLinker());
        }, 300);
    }, [id]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <Helmet 
                //title={`${singlePost.User.nickname}님의 게시글`}
                description={singlePost && singlePost.content || ''}
                meta={[{
                    name: 'description', content: singlePost && singlePost.content,
                }, {
                    //property: 'og:title', content: `${singlePost.User.nickname}님의 게시글`
                }, {
                    property: 'og:image', content: singlePost.Images[0] && `http://localhost:8080/${singlePost.Images[0].src}`
                }, {
                    property : 'og:url', content: `http://localhost:3000/blog/detail/${id}`
                }]}
            />
            <div className='contents-wrap'>  
                <div className='blog-detail'> 
                    {
                        me && me.id === 1 ?
                        <div className='admin-buttons'>
                            <button><Link href={{ pathname: '/admin/blogUpdate', query: {id : id} }} as={`/admin/blogUpdate/${id}`}><a>수정</a></Link></button>
                            <button onClick={onClickDeletePost}><a>삭제</a></button>
                        </div> 
                        : null
                    }
                    <div>
                        <h2 className='title'>{singlePost && singlePost.title}</h2>
                        {
                            singlePost && singlePost.category && <span>시리즈 포스트</span>
                        }
                        {/* <p className='date'>{singlePost && singlePost.created_at && singlePost.created_at.toString().split('T')[0]}</p> */}
                        <p className='date'>{moment(singlePost.created_at).format('YYYY.MM.DD')}</p>
                        <div className='draft-editor-contents' dangerouslySetInnerHTML={createMarkup(singlePost && singlePost.content)} />
                        <p className='post-tag'>
                            {
                                singlePost && singlePost.tag ?
                                makeTagList(singlePost.tag).map((v,i) => {
                                    return (
                                    <span key={i} style={{marginRight:10}}><Link href={{ pathname: '/tag', query : {tag : v}}} as={`/tag/${v}`} ><a>#{v}</a></Link></span>
                                    )
                                }) : null
                            }
                        </p>
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
                <div className='blog-footer'>
                    <Link href='/blog'><a>목록으로 돌아가기</a></Link>
                </div>
            </div>
        </>
    )
};

Detail.propTypes = {
    id : PropTypes.number.isRequired,
}

Detail.getInitialProps = async (context) => {
    console.log('Detail getInitialProps', context.query.id)
    const id = parseInt(context.query.id, 10);
    context.store.dispatch({
        type : LOAD_POST_REQUEST,
        data : id,
    })
    return { id : id }
};

export default Detail;