import React, { useState, useCallback, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../reducers/user';

const Login = memo(() => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const me = useSelector(state => state.user.me);
    const logInErrorReason = useSelector(state => state.user.logInErrorReason);
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
        });
    }, [userId, password]);

    return (
        <div className='login'>  
            {
                <div>
                    <form onSubmit={onSubmitForm}>
                        <div className='input-box'>
                            <input type="text" value={userId} placeholder='아이디' onChange={onChangeUserId} required />
                        </div>
                        <div className='input-box'>
                            <input type="password" value={password} placeholder='비밀번호' onChange={onChangePassword} required />
                        </div>
                        <button type='submit'><a>로그인</a></button>
                    </form>
                    {logInErrorReason}
                    <p><a href='http://localhost:8080/auth/kakao'>카카오로 간편 로그인</a></p>
                    
                </div>
            }
            
        </div>
    );
});

export default Login;