import React, { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_USER_REQUEST, EDIT_USER_REQUEST } from '../reducers/user';

const User = ({ id }) => {
    const dispatch = useDispatch();
    const {me} = useSelector(state => state.user);
    const [nickname, setNickname] = useState('');
    const [editMode, setEditMode] = useState(false);
    const editSubmitButton = useRef();

    const onClickEditUserMode = useCallback(() => {
        setEditMode(!editMode);
    }, [editMode]);

    const onChangeNickname = useCallback((e) => {
        setNickname(e.target.value);
    }, [nickname]);

    const onClickEditUser = useCallback(() => {
        editSubmitButton.current.click();

        console.log(id)
    }, []);

    const onSubmitEditUser = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type : EDIT_USER_REQUEST,
            data : {
                id : id,
                nickname : nickname
            }
        });
        setEditMode(false);
    }, [id, nickname]);

    return (
        <div className='contents-wrap'>
            <div className='user'>
                <h2>회원님의 정보를 확인하거나<br/>변경할 수 있어요</h2>
                <div className='user_box'>
                    <p className="title">회원정보</p>
                    <div className='user_box-info'>
                        <p><span>아이디</span>{me && me.userId || '가입 안 한 유저'}</p>
                        <p><span>닉네임</span>{
                            editMode ? 
                            <form onSubmit={onSubmitEditUser}>
                                <div className='input-box'><input type="text" value={nickname} onChange={onChangeNickname} /></div>
                                <button ref={editSubmitButton} hidden></button>
                            </form>
                            : me && me.nickname || '가입 안 한 유저'
                        }</p>
                        <p><span>가입일</span>{
                            me && me.createdAt && me.createdAt.split('T')[0] || '가입 안 한 유저'
                        }</p>
                    </div>
                </div>
                <div className='user-edit'>
                    {
                        editMode ? <>
                            <button onClick={onClickEditUser}><a>확인</a></button>
                            <button onClick={onClickEditUserMode}><a>취소</a></button>
                            </>
                        :
                        <button onClick={onClickEditUserMode}><a>수정</a></button>
                    }
                </div>
            </div>
        </div>
    )
};

User.PropTypes = {
    id : PropTypes.number.isRequired,
};

User.getInitialProps = async (context) => {
    const id = parseInt(context.query.id, 10);
    console.log('User getInitialProps', id)
    context.store.dispatch({
        type : LOAD_USER_REQUEST,
        data : id,
    })
    return { id }
};

export default User;