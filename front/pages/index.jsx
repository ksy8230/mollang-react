import React, { useEffect } from 'react';
import PostCard from '../Components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS } from '../reducers/user';

const Home = () => {
    const dispatch = useDispatch(); // v.7.1> 리액트리덕스 훅스 사용 가능
    const { user, isLoggedIn } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);
    useEffect(() => {
        dispatch({
            type : LOGIN_SUCCESS,
            data : {
                nickname : '몰랑이'
            }
        })
    }, []);
    return (
        <>
            {isLoggedIn ? <>{user.nickname} 로그인 완료 </> : <>로그아웃 상태</>}
            <h2>배운 것을 기록하자</h2>
            <div className='post-list'>
                <ul>
                    {
                        mainPosts.map((v,i) => {
                            return (
                                <PostCard 
                                    post={v}
                                    key={i}
                                />
                            )
                        })
                    }
                </ul>
            </div>
        </>
    );
};

export default Home;