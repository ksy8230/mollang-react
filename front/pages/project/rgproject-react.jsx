import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const ProjectRgProject = () => {

    return (
        <div className='contents-wrap'>
            <div className='project_detail'>
                <div className='title'>
                    <h2>냉장고 프로젝트 홈페이지</h2>
                    <p className='date'>2020.01.14 ~ 2020.02.03</p>
                    <a href="http://rgproject.co.kr/" target='_blank'>http://rgproject.co.kr/</a>
                </div>
                <div className='visual'>
                    <img src="/images/project_detail_rgproject-react.jpg" alt=""/>
                </div>
                <section className='outline'>
                    <h3>프로젝트 개요</h3>
                    <p>
                        나니아 월드 같이 옷장 문을 열면 새로운 세계가 펼쳐지는 냉장고로 만들고 싶지 않아 기획한 프로젝트입니다.<br/>
                        2019년 11월 21일에 Javascript 와 Express로 만들었던 <a href='https://damp-hamlet-01736.herokuapp.com/' target='_blank'>냉장고 프로젝트</a> 작업물을 SPA로 다시 제작해보았습니다.<br/>
                        해당 프로젝트는 제로초님의 'React로 노드버드 만들기' 강좌를 기반한 실습용 프로젝트이기도 합니다.<br/>
                        모바일 사이즈에 맞춰져있습니다.<br/>
                    </p>
                </section>
                <section className=''>
                    <h3>해당 작업물 구성 요소</h3>
                    <p>
                        홈 화면<br />
                        - 냉장실 냉동실1 냉동실2로 나뉜 영역에 음식 리스트들이 보여집니다.<br />
                        - 상단 태그 클릭시 해당하는 음식 리스트들이 영역별로 보여집니다.<br />
                        <br />
                        홈 화면 > 네비게이션 메뉴<br />
                        - 로그인 후 음식을 추가할 수 있는 영역이 보여집니다.<br />
                        - 음식 분류 선택시 해당하는 디폴트 아이콘이 썸네일로 보여지고, 커스텀 썸네일을 원할 경우 이미지를 직접 업로드하면 가능합니다.<br />
                        <br />
                        음식 상세 화면<br />
                        - 등록된 음식의 상세 정보가 보여집니다.<br />
                        - 등록된 음식의 이미지 클릭시 크게 보기가 가능하며 여러장이 등록된 경우 슬라이드가 가능합니다.<br />
                        - 유통기한으로부터 남은 날짜가 표기됩니다.<br />
                        - 로그인된 상태일 시 수정 및 삭제가 가능합니다.<br />
                        - 로그인된 상태일 시 해당 음식에 관한 댓글 추가 및 삭제가 가능합니다.<br />

                        <br />
                        검색 기능<br />
                        회원가입 및 간편 로그인 기능<br />
                        반응형<br />
                    </p>
                    <span className='git'><a href='https://github.com/ksy8230/rgProfect-react' target='_blank'><FontAwesomeIcon icon={faGithub} />관련 깃허브 바로가기</a></span>
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
                        - CSS 전처리기 SCSS를 연결해 스타일링 작업에 사용했습니다.<br />
                        <br />
                        백엔드<br />
                        - NodeJS(Express)를 연결해 REST API를 구축했습니다. <br />
                        - Sequelize를 이용해 MySQL문을 작성하였고 DB 테이블을 설계했습니다. <br />
                        - npm 모듈에서 제공된 passport를 이용해 로그인 로직을 적용했습니다. <br />
                        <br />
                        배포 및 형상관리<br />
                        - Git을 이용해 소스들의 버전을 유지하였습니다.<br />
                        - AWS S2 이용해 우분투 사용<br />
                        - AWS Route53 이용해 닷홈 도메인 연결<br />
                        - AWS S3 이용해 이미지 업로드<br />
                    </p>
                    <span className='issue'><Link href='/tag/냉장고프로젝트' ><a><FontAwesomeIcon icon={faWrench} />개발 이슈</a></Link></span>
                </section>
                <div className='footer'>
                    <Link href='/project'><a>프로젝트 페이지로 돌아가기</a></Link>
                </div>
            </div>

        </div>
    );
};

export default ProjectRgProject;