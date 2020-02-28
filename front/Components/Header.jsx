import React, { useState, useCallback, useEffect, memo } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT_REQUEST } from '../reducers/user';
import Login from './Login';
import SingUp from './SingUp';
import Router from 'next/router';

const Header = memo(() => {
    const {me, isLoggedIn, isSignedUp} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [accountOpen, setAccountOpen] = useState(false);
    const [layerPopup, setLayerPopup] = useState(false);
    const [visible, setVisible] = useState(false);
    const [signUp, setSingup] = useState(false);
    const [menuOn, setMenuOn] = useState('');
    const [mobileMenu, setMobileMenu] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

    const onClickAccount = useCallback(() => {
        setAccountOpen(!accountOpen);
    }, [accountOpen]);

    const onClickPopupOpen = useCallback(() => {
        setLayerPopup(!layerPopup);
        setTimeout(() => {
            setVisible(!visible);
        }, 300);
    }, [layerPopup]);

    const onClickPopupClose = useCallback(() => {
        setVisible(!visible);
        setTimeout(() => {
            setLayerPopup(!layerPopup);
            setSingup(false);
        }, 300);

    }, [layerPopup, visible]);

    const onClickLogOut = () => {
        dispatch({
            type : LOGOUT_REQUEST,
        })
    };

    const onClickSignup = useCallback(() => {
        setSingup(!signUp);
    }, [signUp]);

    const onClickHome = useCallback(() => { setMenuOn(''); }, [menuOn]);
    const onClickProfile = useCallback(() => { setMenuOn('profile'); setMobileMenu(!mobileMenu); }, [menuOn, mobileMenu]);
    const onClickBlog = useCallback(() => { setMenuOn('blog'); setMobileMenu(!mobileMenu); }, [menuOn, mobileMenu]);
    const onClickProject = useCallback(() => { setMenuOn('project'); setMobileMenu(!mobileMenu); }, [menuOn, mobileMenu]);
    const onClickGithub = useCallback(() => { setMenuOn('github'); }, [menuOn]);

    const onClickMobileMenu = useCallback(() => { setMobileMenu(!mobileMenu); }, [mobileMenu]);

    const onScroll = (e) => { // 스크롤 이벤트
        const currentScrollTop = ('scroll', window.pageYOffset || e.srcElement.scrollingElement.scrollTop);
        const header = document.querySelector('header');
        setScrollTop(currentScrollTop);
        if (currentScrollTop > 0) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if(isLoggedIn || isSignedUp) {
            
            setTimeout(() => {
                setVisible(!visible);
                setTimeout(() => {
                    setLayerPopup(!layerPopup);
                }, 300);
            }, 1000);
            
        }
    }, [isLoggedIn, isSignedUp, me && me.id]);

    return (
        <>
            <header>
                <div className='wrapper'>
                    <div className='logo' onClick={onClickHome}><Link href='/'><a><img src="/images/logo_mollang.png" alt=""/></a></Link></div>
                    <div className={mobileMenu ? 'mobile-button active' : 'mobile-button'} onClick={onClickMobileMenu}>
                        <span></span><span></span><span></span>
                    </div>
                    <div className='account'>
                        {
                            me && me.id ? 
                            <div className='account-user' onClick={onClickAccount}>
                                <div className='account-profile-img'><img src="/images/profile_default_img.png" alt=""/></div>
                                {me.nickname}
                                <span className='account-more'><FontAwesomeIcon icon={faAngleDown} /></span>
                                {
                                    accountOpen && <div className='account-menu'>
                                        {
                                            me && me.id === 1 ?
                                            <Link href="/admin/blog"><a >포스트 쓰기</a></Link>
                                            : null
                                        }
                                        <Link href={{pathname:'/user', query : {id : me.id}} }><a >마이페이지</a></Link>
                                        <a onClick={onClickLogOut}>로그아웃</a>
                                    </div> 
                                }
                            </div> 
                            : <button onClick={onClickPopupOpen}><a>로그인</a></button>
                        }
                    </div>
                    <div className='links'>
                        <nav>
                            <div className={menuOn === 'profile' ? 'active' : ''} onClick={onClickProfile}><Link href='/profile' prefetch><a>프로필</a></Link></div>
                            <div className={menuOn === 'blog' ? 'active' : ''} onClick={onClickBlog}><Link href={{ pathname: '/blog/index'}} as={'/blog'} prefetch><a>블로그</a></Link></div>
                            <div className={menuOn === 'project' ? 'active' : ''} onClick={onClickProject}><Link href={{ pathname: '/project/index'}} as={'/project'} prefetch><a>프로젝트</a></Link></div>
                            <div className={menuOn === 'github' ? 'active' : ''} onClick={onClickGithub}><Link href='https://github.com/ksy8230'><a target='_blank'>깃허브</a></Link></div>
                            {/*<div><a href='/Editor_test_with_draft'>draft test1</a></div>*/}
                            {/*<div><a href='/Editor_test_with_wysiwyg'>draft test2</a></div>*/}
                            {
                                me && me.id === 1 ?
                                <div><Link href={{ pathname: '/admin/index'}} as={'/admin'}><a>블로그 관리자</a></Link></div>
                                : null
                            }
                        </nav>
                    </div>
                </div>
                <div className={mobileMenu ? 'mobile-links active' : 'mobile-links'}>
                    <nav>
                        <div className={menuOn === 'profile' ? 'active' : ''} onClick={onClickProfile}><Link href='/profile' prefetch><a>프로필</a></Link></div>
                        <div className={menuOn === 'blog' ? 'active' : ''} onClick={onClickBlog}><Link href={{ pathname: '/blog/index'}} as={'/blog'} prefetch><a>블로그</a></Link></div>
                        <div className={menuOn === 'project' ? 'active' : ''} onClick={onClickProject}><Link href={{ pathname: '/project/index'}} as={'/project'} prefetch><a>프로젝트</a></Link></div>
                        <div className={menuOn === 'github' ? 'active' : ''} onClick={onClickGithub}><Link href='https://github.com/ksy8230'><a target='_blank'>깃허브</a></Link></div>
                        {/*<div><a href='/Editor_test_with_draft'>draft test1</a></div>*/}
                        {/*<div><a href='/Editor_test_with_wysiwyg'>draft test2</a></div>*/}
                        {
                            me && me.id === 1 ?
                            <div><Link href={{ pathname: '/admin/index'}} as={'/admin'}><a>블로그 관리자</a></Link></div>
                            : null
                        }
                    </nav>
                </div>
                
            </header>
            {
                layerPopup && 
                <div className={visible ? 'layer-popup account active' : 'layer-popup account'}>
                    <div className='overlay' onClick={onClickPopupClose}></div>
                    <div className='wapper'>
                        <span className='layer-popup-close' onClick={onClickPopupClose}><FontAwesomeIcon icon={faTimes} /></span>
                        <div className='layer-popup-cotent'>
                            {/* <Login /> */}
                            {
                                signUp && !me ?
                                <>
                                    <SingUp />
                                    <div className='foot' onClick={onClickSignup}>이미 계정이 있나요? <a>로그인</a></div>
                                </>
                                : !signUp && !me ?
                                <>
                                    <Login />
                                    <div className='foot' onClick={onClickSignup}>아직 회원이 아니신가요? <a>회원가입</a></div>
                                </>
                                : me.id && <div className='confirm-alert'><p>반갑습니다. {me.nickname} 님!</p></div>
                                //isLoggedIn && <div className='confirm-alert'><p>반갑습니다. {me.nickname} 님!</p></div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
});

export default Header;