import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from "react-dom";
import PostCard from '../Components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOAD_USER_REQUEST } from '../reducers/user';
//import ReactTypingEffect from 'react-typing-effect';
//import Typing from 'react-typing-animation';
import useTypewriter from "react-typewriter-hook";

const MagicOcean = [
    "새로운 기술이 재밌고 신나요.",
    "이 블로그는 리액트 기반으로 만들어졌습니다.",
    "개발 공부 관련한 포스트를 작성할 예정입니다.",
    "배운 것을 기록합니다."
];
let index = 0;

const Home = () => {
    const dispatch = useDispatch(); // v.7.1> 리액트리덕스 훅스 사용 가능
    const { isLoggedIn, me } = useSelector(state => state.user);

    const [magicName, setMagicName] = useState(" 안녕하세요. 이곳은 몰로그입니다.");
    const intervalRef = useRef({});
    const name = useTypewriter(magicName);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
          // index = index + 1 > 2 ? 0 : ++index + 1;
          index = index > 2 ? 0 : ++index;
          setMagicName(MagicOcean[index]);
        }, 5000);
        return function clear() {
          clearInterval(intervalRef.current);
        };
      }, [magicName]);
    useEffect(() => {
        if (!me) {
            dispatch({
                type : LOAD_USER_REQUEST,
            });
        };
    }, [me]);


    return (
        <div className='home'>
            {/*me && me.id ? <>{me.nickname} 로그인 완료 </> : <>로그아웃 상태</>*/}
            <h2>몰로그</h2>
            <p>개발 관련 공부 및 스케줄 관리를 합니다.</p>
            <div className='typing-effect'><p>{name}</p></div>
            <pre>{`
                <span>Hello<span>,   
                World.
            `}</pre>
            <div className='features'>
                <div className='feature'>
                    <h3>안녕하세요! 몰랑입니다.</h3>
                    <p>
                        <span>{`<class="과거"> `}</span>
                        저는 유지보수 업체의 퍼블리셔로 3년간 근무를 하였습니다.   
                        <span>{`<class="성향"> `}</span>
                        코드를 짜면 원하는 대로 페이지에 구현되는 것이 아직까지도 재밌고 이 분야에 많은 흥미와 보람을 느낍니다.
                        <span>{`<class="계기"> `}</span>
                        단순히 디자인을 그려넣는 프론트단 화면이 아닌 나의 데이터를 만들고 수정하고 삭제할 수 있는 동적인 분야에 관심이 생겨 리액트를 공부하게 됐습니다.
                        <span>{`<class="최근"> `}</span>
                        본격적으로 리액트 기반의 개인 프로젝트들를 만든지는 2개월이 조금 넘어 현재까지는 배웠던 부분을 복습해가며 관련된 지식을 위주로 넓혀가는 중입니다.  
                        <span>{`<class="방향성"> `}</span>
                        새로운 분야를 뛰어든 초심자에게 있어 가장 좋은 친구는 기록이라 생각합니다. 그리고 이 블로그는 저에게 그런 역할이 될 것입니다.
                    </p>

                </div>
                <div className='feature'>
                    <h3>프로젝트</h3>
                    <div>
                        <p># 냉장고 프로젝트</p>
                        <p># 몰로그</p>
                        <p># 리덕스 토이 프로젝트</p>
                    </div>
                </div>
                <div className='feature'>
                    <h3>관심사</h3>
                    <p>
                        <span>{`#REACT`}</span>, <span>{`#JAVASCRIPT`}</span>, 
                        <span>{`#EXPRESS`}</span>, <span>{`#NEXT`}</span>, 
                        <span>{`#VUE`}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;