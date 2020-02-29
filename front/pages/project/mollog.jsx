import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const ProjectMollog = () => {

    return (
        <div className='contents-wrap'>
            <div className='project_detail'>
                <div className='title'>
                    <h2>몰로그 홈페이지</h2>
                    <p className='date'>2020.02.08 ~ 2020.02.99</p>
                    <a href="">http://mollog.co.kr/</a>
                </div>
                <div className='visual'>
                    <img src="/images/project_detail_mollog.jpg" alt=""/>
                </div>
                <section className='outline'>
                    <h3>프로젝트 개요</h3>
                    <p>
                        기록을 좋아하는 저에게 개인 블로그라는 컨텐츠는 언젠가 반드시 만들게 됐을 프로젝트 타입 중 하나입니다.<br/>
                        강의를 보며 만든 냉장고 프로젝트 이후 복습을 위한 작업물이자 조금 더 업그레이를 시킨 작업물로, draft-js 편집기와 toast-ui calendar 일정관리툴이 추가된 관리자단이 생성되었습니다.
                    </p>
                </section>
                <section className=''>
                    <h3>해당 작업물 구성 요소</h3>
                    <p>
                        홈 화면<br />
                        - 간략한 소개와 타이핑 효과가 추가되었습니다. <br /><br />
                        프로필 화면<br />
                        - 몰로그 개발자 소개와 기술 스택 정보를 전달합니다.<br/><br />
                        
                        블로그 화면<br />
                        - 포스팅된 게시글들이 보이는 화면으로 그리드 레이아웃 효과가 추가되었습니다.<br />
                        - 포스팅 10개를 기준으로 스크롤하면 그 다음 포스트들이 보이는 형식인 인피니트 스크롤링이 추가되었습니다.<br />
                        - 포스트들은 시리즈 혹은 태그별로 볼 수 있습니다.<br />
                        - 각 포스트들 클릭시 포스트 상세 페이지로 넘어갑니다.<br /><br />
                        <img src="/images/project_mollog_blog.jpg" alt=""/><br /><br />
                        
                        포스트 상세 화면<br />
                        - h태그를 기준으로 우측에 해당 포스트의 제목별 링커가 생성되어 해당하는 위치로 스크롤이 가능합니다.<br />
                        - 댓글 기능이 추가되어있습니다.<br /><br />
                        <img src="/images/project_mollog_detail.jpg" alt=""/><br /><br />

                        프로젝트 화면<br />
                        - 근무시 진행했던 작업사항들과 개인적으로 만든 프로젝트들에 대한 정보를 전달합니다.<br /><br />
                        <img src="/images/project_mollog_project.jpg" alt=""/><br /><br />

                        관리자 화면<br />
                        - admin ID로만 접근 가능한 페이지로 블로그 컨텐츠와 관련된 정보와 도메인 및 서버 비용을 보여줍니다.<br /><br />
                        <img src="/images/project_mollog_admin_main.jpg" alt=""/><br /><br />
                        - 관리자로 로그인 시 포스트 상세 페이지에서 포스트 수정 삭제가 가능하고, 관리자 페이지에서 새로운 포스트 작성이 가능합니다.<br /><br />
                        <img src="/images/project_mollog_post.jpg" alt=""/><br /><br />
                        - 일정관리탭에서 일정 추가 수정 삭제가 가능합니다.<br /><br />
                        <img src="/images/project_mollog_calendar.jpg" alt=""/><br /><br />

                        회원가입 및 간편 로그인 기능<br />
                        반응형<br />
                        ie 11 호환<br />
                    </p>
                    <span className='git'><a href='https://github.com/ksy8230/mollang-react' target='_blank'><FontAwesomeIcon icon={faGithub} />관련 깃허브 바로가기</a></span>
                </section>
                <section className='skills'>
                    <h3>개발 스킬</h3>
                    <p>
                        프론트엔드<br />
                        - SPA 구현을 위해 React·Next로 레이아웃을 잡았습니다.<br />
                        - Next에서 제공하는 라우터를 이용해 페이지를 이동합니다.<br />
                        - NodeJS(Express)를 연결해 동적 라우터를 구현하였습니다. <br />
                        - Next에서 제공하는 getInitialProps를 이용해 SSR방식으로 화면에 데이터를 불러왔습니다.<br />
                        - 백엔드로 요청을 보내는 API는 ReduxSaga를 이용해 비동기 처리를 하였습니다.<br />
                        - 편집기의 컴포넌트에 Redux-Form을 연결해 해당 state 값을 사용하였습니다.<br />
                        - CSS 전처리기 SCSS를 연결해 스타일링 작업에 사용했습니다.<br />
                        <br />
                        백엔드<br />
                        - NodeJS(Express)를 연결해 REST API를 구축했습니다. <br />
                        - Sequelize를 이용해 MySQL문을 작성하였고 DB 테이블을 설계했습니다. <br />
                        - npm 모듈에서 제공된 passport를 이용해 로그인 로직을 적용했습니다. <br />
                        <br />
                        배포 및 형상관리<br />
                        - Git을 이용해 소스들을 업로드 및 관리하였습니다.<br />
                        - AWS EC2 이용해 우분투 서버로 데이터를 저장하였습니다.<br />
                        - AWS Route53 이용해 도메인을 연결하였습니다.<br />
                        - AWS S3 서버로 업로드한 이미지들을 저장하였습니다.<br />
                    </p>
                    <span className='issue'><Link href='/tag/mollog' ><a><FontAwesomeIcon icon={faWrench} />개발 이슈</a></Link></span>
                </section>
                <div className='footer'>
                    <Link href='/project'><a>프로젝트 페이지로 돌아가기</a></Link>
                </div>
            </div>

        </div>
    );
};

export default ProjectMollog;