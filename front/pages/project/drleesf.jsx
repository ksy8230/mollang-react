import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const ProjectDrleesf = () => {

    return (
        <div className='contents-wrap'>
            <div className='project_detail'>
                <div className='title'>
                    <h2>이박사 물회 홈페이지</h2>
                    <p className='date'>2019.12.31 ~ 2020.01.10</p>
                    <a href="http://drleesf.co.kr.s3-website.ap-northeast-2.amazonaws.com/" target='_blank'>http://drleesf.co.kr.s3-website.ap-northeast-2.amazonaws.com/</a>
                </div>
                <div className='visual'>
                    <img src="/images/project_detail_drleesf.jpg" alt=""/>
                </div>
                <section className='outline'>
                    <h3>프로젝트 개요</h3>
                    <p>
                        지인이 운영하는 소개용 횟집 사이트로 2019년 8월 경에 html로 만들었던 사이트를 SPA로 업데이트 해보았다.<br/>
                        React를 배우고 처음으로 레이아웃을 잡고 슬라이더나 팝업을 적용해본 프로젝트이다.
                    </p>
                </section>
                <section className=''>
                    <h3>해당 작업물 구성 요소</h3>
                    <p>
                        홈 화면<br />
                        - 대표메뉴 삼인방을 상단에 슬라이더로 구현하였습니다.<br />
                        - 각 메뉴들은 see more 버튼을 누르면 팝업으로 관련 이미지들이 슬라이더로 보입니다.<br />
                        - 하단에 카카오 지도 API가 연결되어 있습니다.<br />
                        <br />
                        소개 화면<br />
                        - 해당 사이트의 인사말이 담겨있습니다.<br />
                        <br />
                        메뉴 화면<br />
                        - 해당 사이트의 메뉴 정보가 담겨있습니다.<br />
                        <br />
                        오시는 길 화면<br />
                        - 해당 사이트의 위치 정보가 담겨있고 카카오 지도 API가 연결되어 있습니다.<br />
                        <br />
                        오시는 길 화면<br />
                        - 해당 사이트의 위치 정보가 담겨있고 카카오 지도 API가 연결되어 있습니다.<br />
                        <br />
                        시설 및 영업 안내 화면<br />
                        - 시설 관련 사진을 슬라이드로 보여줍니다.<br />
                        <br />
                        반응형<br />
                    </p>
                    <span className='git'><a href='https://github.com/ksy8230/drleesf' target='_blank'><FontAwesomeIcon icon={faGithub} />관련 깃허브 바로가기</a></span>
                </section>
                <section className=''>
                    <h3>개발 스킬</h3>
                    <p>
                        프론트엔드<br />
                        - CSS 전처리기 SCSS를 연결해 스타일링 작업에 사용했습니다.<br />
                        - SPA 구현을 위해 React로 레이아웃을 잡았습니다.<br />
                        - hot-loader 연결해 작업 수정 시 화면에 바로 적용되도록 하였습니다.<br />
                        <br />
                        배포 및 형상관리<br />
                        - Git을 이용해 소스들의 버전을 유지하였습니다.<br />
                        - AWS S3 이용해 정적 웹호스팅을 사용하였습니다.<br />
                    </p>
                    <span className='issue'><Link href='/tag/이박사물회' ><a><FontAwesomeIcon icon={faWrench} />개발 이슈</a></Link></span>
                </section>
                <div className='footer'>
                    <Link href='/project'><a>프로젝트 페이지로 돌아가기</a></Link>
                </div>
            </div>

        </div>
    );
};

export default ProjectDrleesf;