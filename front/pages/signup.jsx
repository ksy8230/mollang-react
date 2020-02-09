import React, { useState, useCallback } from 'react';

const SignUp = () => {
    const [userId, setUserId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

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

    const onSubmitForm = useCallback((e) => {
        e.prevetDefault();
        if (password !== password2) {
            
        }
    }, []);
    return (
        <>
            <form onSubmit={onSubmitForm}>
                <div className='input-box'>
                    <input type="text" value={userId} placeholder='아이디' onChange={onChangeUserId} />
                </div>
                <div className='input-box'>
                    <input type="text" value={nickname} placeholder='닉네임' onChange={onChangeNickname} />
                </div>
                <div className='input-box'>
                    <input type="text" value={password} placeholder='비밀번호' onChange={onChangePassword} />
                </div>
                <div className='input-box'>
                    <input type="text" value={password2} placeholder='비밀번호 확인' onChange={onChangePassword2} />
                </div>
                <button type='submit'>가입하기</button>
            </form>
        </>
    );
};

export default SignUp;