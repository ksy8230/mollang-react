import React, { useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGNUP_REQUEST } from '../reducers/user';

const SignUp = memo(() => {
    const [userId, setUserId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState(false);
    const { signUpErrorReason } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onChangeUserId = useCallback((e) => {
        setUserId(e.target.value);
    });
    const onChangeNickname = useCallback((e) => {
        setNickname(e.target.value);
    });
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    });
    const onChangePassword2 = useCallback((e) => {
        setPassword2(e.target.value);
    });

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if( password !== password2 ) {
            return setPasswordCheckError(true);
        }
        dispatch({
            type : SIGNUP_REQUEST,
            data : {
                userId, 
                password, 
                nickname
            }
        });
    }, [userId, password, password2, nickname]);

    return (
        <div className='login'>
            <form onSubmit={onSubmit}>
                <div className='input-box'>
                    <input type='text' value={userId} placeholder='아이디' onChange={onChangeUserId} required />
                </div>
                <div className='input-box'>
                    <input type='text' value={nickname} placeholder='닉네임' onChange={onChangeNickname} required />
                </div>
                <div className='input-box'>
                    <input type='password' value={password} placeholder='비밀번호' onChange={onChangePassword} required />
                </div>
                <div className='input-box'>
                    <input type='password' value={password2} placeholder='비밀번호 확인' onChange={onChangePassword2} required />
                </div>
                {passwordCheckError && <p>비밀번호가 일치하지 않습니다.</p>}
                <p>{signUpErrorReason}</p>
                <button htmltype='submit'><a>가입하기</a></button>
            </form>
        </div>
    );
});

export default SignUp;