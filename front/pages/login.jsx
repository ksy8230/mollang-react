import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../reducers/user';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const me = useSelector(state => state.user.me);
    const onChangeUserId = useCallback((e) => {
        setUserId(e.target.value);
    });
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    });

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type : LOGIN_REQUEST,
            data : {
                userId, 
                password, 
            }
        })
    }, [userId, password]);

    const onClickLogOut = () => {
        dispatch({
            type : LOGOUT_REQUEST,
        })
    };
    
    return (
        <>  
            {
                me && me ?
                <>
                    <p>{me.nickname}</p>
                    <button onClick={onClickLogOut}>로그아웃</button>
                </>
                :
                <>
                    <form onSubmit={onSubmitForm}>
                        <div className='input-box'>
                            <input type="text" value={userId} placeholder='아이디' onChange={onChangeUserId} required />
                        </div>
                        <div className='input-box'>
                            <input type="password" value={password} placeholder='비밀번호' onChange={onChangePassword} required />
                        </div>
                        <button type='submit'>로그인</button>
                    </form>
                    <div><Link href='/signup'><a>회원가입</a></Link></div>
                </>
            }
            
        </>
    );
};

export default Login;