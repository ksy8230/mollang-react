import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT_REQUEST } from '../reducers/user';
import Login from './Login';
import SingUp from './SingUp';

const Header = () => {
    const {me} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [accountOpen, setAccountOpen] = useState(false);
    const [layerPopup, setLayerPopup] = useState(false);
    const [visible, setVisible] = useState(false);
    const [signUp, setSingup] = useState(false);

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

    return (
        <>
            <header>
                <div className='wrapper'>
                    <div className='logo'><Link href='/'><a><img src="/images/logo_mollang.png" alt=""/></a></Link></div>
                    {/*<div className='search-box'>
                        <input type="text" placeholder='검색' />
                    </div>*/}
                    <div className='account'>
                        {
                            me && me.id ? 
                            <div className='account-user' onClick={onClickAccount}>
                                <div className='account-profile-img'><img src="/images/profile_default_img.png" alt=""/></div>
                                {me.nickname}
                                <span className='account-more'><FontAwesomeIcon icon={faAngleDown} /></span>
                                {
                                    accountOpen && <div className='account-menu'>
                                        <Link href="/admin/blog"><a >포스트 쓰기</a></Link>
                                        <Link href="/profile"><a >마이페이지</a></Link>
                                        <a onClick={onClickLogOut}>로그아웃</a>
                                    </div> 
                                }
                            </div> 
                            : <button onClick={onClickPopupOpen}><a>로그인</a></button>
                        }
                    </div>
                    <div className='links'>
                        <nav>

                            <div><Link href='/profile'><a>프로필</a></Link></div>
                            <div><Link href='/blog'><a>블로그</a></Link></div>
                            <div><Link href=''><a>깃허브</a></Link></div>
                            {/* <div><Link href='/about'><a>작품들</a></Link></div>
                            <div><Link href='/about'><a>깃허브</a></Link></div> */}
                            <div><Link href='/admin/blog'><a>블로그 관리자</a></Link></div>
                        </nav>
                    </div>
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
                                signUp ?
                                <>
                                    <SingUp />
                                    <div className='foot' onClick={onClickSignup}>이미 계정이 있나요? <a>로그인</a></div>
                                </>
                                : 
                                <>
                                    <Login />
                                    <div className='foot' onClick={onClickSignup}>아직 회원이 아니신가요? <a>회원가입</a></div>
                                </>

                            }
                            
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Header;