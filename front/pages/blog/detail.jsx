import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POST_REQUEST, DELETE_POST_REQUEST, ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST, EDIT_COMMENT_REQUEST, DELETE_COMMENT_REQUEST } from '../../reducers/post';
import moment from 'moment';
import { backURL } from '../../config/config';
moment.locale('ko');

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
    const { isLoadPost, commentEdited } = useSelector(state => state.post);
    //const { me } = useSelector(state => state.user);
    const me = useSelector(state => state.user.me);
    //const meId = useSelector(state => state.user.me.id);
    const singlePost = useSelector(state => state.post.singlePost);
    const Comments = useSelector(state => state.post.singlePost.Comments);
    //const commentUserId = useSelector(state => state.post.singlePost.Comments.User.id);
    const [sideLinker, setSideLinker] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [sidenavOn, setSideNavOn] = useState(false);
    const [comment, setComment] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState('');
    const [editId, setEditId] = useState('');

    const makeSideLinker = () => { // h태그들 추출해 aside 링커로 만들기 & h태그들 링커id값 부여
        let hTag = Array.from(document.querySelectorAll('h1,h2,h3,h4'));
        let hTagTitle = [];
        for (var i = 0; i < hTag.length; i++) {
            hTag[i].id = hTag[i].innerText.replace(/ /g," ");
            hTagTitle.push(hTag[i].innerText.replace(/ /g," "));
        }
        return hTagTitle;
    };

    const onClickToTitle = (e) => { // 링커 클릭시 해당 본문 id 값으로 이동
        e.preventDefault();
        let titleTagId = e.target.getAttribute('href').replace("#","");
        document.getElementById(titleTagId).scrollIntoView({behavior: 'smooth'});
        setTimeout(() => {
            const header = document.querySelector('header');
            header.classList.add('fade');
        }, 500);
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
        if (currentScrollTop >= top - 50 ) {
            setSideNavOn(true);
        } else {
            setSideNavOn(false);
        }
    };
    
    useEffect(() => { // 링커 클래스 유무에 따른 헤더
        const header = document.querySelector('header');
        if (sidenavOn) {
            header.classList.add('fade');
        } else {
            header.classList.remove('fade');
        }
        return () => {
            header.classList.remove('fade');
        }
    }, [sidenavOn]);

    const onChangeComment = useCallback((e) => {
        setComment(e.target.value);
    },[comment]);

    const onSubmitComment = useCallback((e) => { // 댓글 업로드
        e.preventDefault();
        if ( !me ) {
            return alert('로그인이 필요합니다.');
        }
        dispatch({
            type : ADD_COMMENT_REQUEST,
            data : {
                postId : id,
                content: comment
            }
        })
    }, [me && me.id, comment]);

    useEffect(() => {
        setTimeout(() => {
            setSideLinker(makeSideLinker());
        }, 300);
        dispatch({ // 댓글 로드
            type : LOAD_COMMENTS_REQUEST,
            data : id,
        });
    }, [id]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onClickEditComment = useCallback((i) => {
        setEditId(i);
        let commentIndex = Comments.findIndex(v => v.id === i);
        setEditValue(Comments[commentIndex].content);
        setEditMode(true);
    }, [editId, editValue, isLoadPost]);

    const onClickCancelEditMode = () => {
        setEditId('');
        setEditValue('');
        setEditMode(false);
    };

    const onChangeEditValue = useCallback((e) => {
        setEditValue(e.target.value);
    }, [editValue]);

    const onSubmitEditComment = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type : EDIT_COMMENT_REQUEST,
            data : {
                postId : id,
                id : editId,
                content : editValue
            }
        });
    }, [editId, editValue, editMode]);

    useEffect(() => {
        if (commentEdited) {
            setEditMode(false);
        }
    }, [commentEdited]);

    const onClickDeleteComment = useCallback((i) => {
        dispatch({
            type: DELETE_COMMENT_REQUEST,
            data : {
                postId : id,
                id : i,
            }
        })
    }, [editId, editValue]);

    return (
        <>
            <Helmet 
                description={singlePost && singlePost.content || ''}
                meta={[{
                    name: 'description', content: singlePost && singlePost.content,
                }, {
                    //property: 'og:title', content: `${singlePost.User.nickname}님의 게시글`
                }, {
                    property: 'og:image', content: singlePost.Images && singlePost.Images[0] ? `${singlePost.Images && singlePost.Images[0].src}` : 'http://mollog.co.kr/images/favicon.ico',
                }, {
                    property : 'og:url', content: `http://mollog.co.kr/blog/detail/${id}`
                }]}
            />
            <div className={isLoadPost ? 'contents-wrap loading' : 'contents-wrap'}>  
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
                            singlePost && singlePost.category && <span className='series'><Link href={{ pathname : '/blog/series', query: {category : singlePost.category}}} as={`/blog/series/${singlePost.category}`}><a>{singlePost.category} 시리즈</a></Link></span>
                        }
                        {/* <p className='date'>{singlePost && singlePost.created_at && singlePost.created_at.toString().split('T')[0]}</p> */}
                        <p className='date'>{moment(singlePost.created_at).format('YYYY.MM.DD')}</p>
                        <div className='draft-editor-contents' dangerouslySetInnerHTML={createMarkup(singlePost && singlePost.content)} />
                        <p className='post-tag'>
                            {
                                singlePost && singlePost.tag ?
                                makeTagList(singlePost.tag).map((v,i) => {
                                    return (
                                        v !== 'null' ? 
                                        <span key={i} style={{marginRight:10}}><Link href={{ pathname: '/tag', query : {tag : v}}} as={`/tag/${v}`} ><a>#{v}</a></Link></span> 
                                        : null
                                    )
                                }) : null
                            }
                        </p>
                    </div>
                    <div className={sidenavOn ? 'sidenav active' : 'sidenav'}>
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
                <div className='comment'>
                    <div className='comment-length'>
                        <p><span>{singlePost.Comments && Comments.length}</span>개의 댓글</p>
                    </div>
                    <div className='comment-form'>
                        <form onSubmit={onSubmitComment}>
                            <div>
                                <textarea type="text" placeholder='로그인 후 이용해 주세요.' value={comment} onChange={onChangeComment} />
                            </div>
                            <button htmltype="submit"><a>댓글 작성</a></button>
                        </form>
                    </div>
                    <div className='comments-list'>
                        <ul>
                            {
                                singlePost.Comments && Comments.map((v, i) => {
                                    return(
                                        <li key={i}>
                                            <div>
                                                <div className='profile'>
                                                    <a href="">
                                                        <div class="account-profile-img"><img src="/images/profile_default_img.png" alt="" /></div>
                                                    </a>
                                                    <div className='profile-info'>
                                                        <p>{v.User.nickname}</p>
                                                        <span>{moment(moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss")).fromNow()}</span>
                                                    </div>
                                                    {
                                                        me !== null && me.id === v.UserId ? // 내가 쓴 댓글 액션 유무
                                                        <>
                                                            {
                                                                v.id === editId && editMode ? null // 해당하는 댓글에 한해서 && 수정모드에 따라 댓글 액션 유무
                                                                :
                                                                <div className='action'>
                                                                    <span onClick={() => onClickEditComment(v.id)}>수정 </span>
                                                                    <span onClick={() => onClickDeleteComment(v.id)}>삭제</span>
                                                                </div> 
                                                            }
                                                        </>
                                                        : null
                                                    }
                                                </div>
                                                {
                                                    v.id === editId && editMode ? 
                                                    <div className='comment-form'>
                                                        <form onSubmit={onSubmitEditComment}>
                                                            <textarea type="text" value={editValue} onChange={onChangeEditValue} />
                                                            <button htmltype="submit"><a>댓글 수정</a></button>
                                                            <button className='cancel' onClick={onClickCancelEditMode}><a>취소</a></button>
                                                        </form>
                                                    </div>
                                                    : <div className='comments_content'>{v.content}</div>
                                                }
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
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