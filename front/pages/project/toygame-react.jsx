import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const ProjectToygameReact = () => {

    return (
        <div className='contents-wrap'>
            <div className='project_detail'>
                <div className='title'>
                    <h2>냉장고 프로젝트 홈페이지</h2>
                    <p className='date'>2019.12.29</p>
                    <a href="https://github.com/ksy8230/zerocho-reactgame/tree/master/9.%EC%88%9C%EB%B2%88%EB%B0%98%EC%9D%91%EC%86%8D%EB%8F%84%EC%B2%B4%ED%81%AC" target='_blank'>https://github.com/ksy8230/zerocho-reactgame/</a>
                </div>
                <div className='visual'>
                    <img src="/images/project_detail_toygame-react.jpg" alt=""/>
                </div>
                <section className='outline'>
                    <h3>프로젝트 개요</h3>
                    <p>
                        제로초님의 '리액트로 웹게임 만들기' 강좌를 보고 복습 및 실습 차원에서 만들어본 간단한 순서 맞추기 게임이다.<br/>
                    </p>
                </section>
                <section className=''>
                    <h3>해당 작업물 구성 요소</h3>
                    <p>
                        
                        <img src="https://user-images.githubusercontent.com/24996316/71557108-eb4d9000-2a84-11ea-845d-59b26ea6e634.gif"  />
                        <br />
                    </p>
                    <span className='git'><a href='https://github.com/ksy8230/zerocho-reactgame/tree/master/9.%EC%88%9C%EB%B2%88%EB%B0%98%EC%9D%91%EC%86%8D%EB%8F%84%EC%B2%B4%ED%81%AC' target='_blank'><FontAwesomeIcon icon={faGithub} />관련 깃허브 바로가기</a></span>
                </section>
                <section className='skills'>
                    <h3>개발 스킬</h3>
                    <p>
                        프론트엔드<br />
                        - hot-loader 연결해 작업 수정 시 화면에 바로 적용되도록 하였습니다.<br />
                        - React의 훅의 기초 개념인 useState, useEffect, useCallback, memo로 구현 및 최적화 작업을 진행하였습니다.<br />
                        - Styled-Component를 이용해 props 숫자 값에 따른 색상 변경을 적용하였습니다.<br />
                        <br />
                        배포 및 형상관리<br />
                        - Git을 이용해 소스들의 버전을 유지하였습니다.<br />
                    </p>
                    <span className='issue'><Link href='/tag/리액트토이게임' ><a><FontAwesomeIcon icon={faWrench} />개발 이슈</a></Link></span>
                </section>
                <div className='footer'>
                    <Link href='/project'><a>프로젝트 페이지로 돌아가기</a></Link>
                </div>
            </div>

        </div>
    );
};

export default ProjectToygameReact;