import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCaretSquareDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const Profile = () => {
    const [openPastBox, setOpenPastBox] = useState(false);
    const [openFutureBox, setOpenFutureBox] = useState(false);

    const onClickOpenPastBox = useCallback(() => {
        setOpenPastBox(!openPastBox);
        console.log(openPastBox)
    }, [openPastBox]);

    const onClickOpenFutureBox = useCallback(() => {
        setOpenFutureBox(!openFutureBox);
        console.log(openFutureBox)
    }, [openFutureBox]);

    return (
        <div className='contents-wrap'>
            <div className='profile'>
                <h2>나를 소개합니다</h2>

                <div className='box'>
                    <h3># 몰로그 개발자 소개</h3>
                    <div className={openPastBox ? 'feature active' : 'feature'}>
                        <p className='title' onClick={onClickOpenPastBox}><span>{`<class="과거"> `}</span>유지보수 업체의 퍼블리셔 <FontAwesomeIcon icon={faChevronDown} /></p>
                        <div className='detail'>
                            <p>
                                저는 아디다스 내부로 파견된 유지보수 업체의 퍼블리셔로 3년간 근무를 하였습니다.<br/>
                                유효기간이 있는 홍보성 페이지인 <a className='link' href='https://shop.adidas.co.kr/html/adidas/2019/event/originals/superstar/build/index.html' target='_blank'>캠페인</a> 단위로 단타성 작업을 많이 하였고, 회원가입 / 로그인 / 마이페이지 등과 같은 <a href='https://shop.adidas.co.kr/html/adidas/register_kakao.html' target='_blank'>시스템 코딩</a> 업무도 겸하였습니다.<br/>
                                작업 방식은 내부적으로는 <span>GIT</span>을 이용한 형상관리툴로 로컬 파일들의 버전을 관리하였으며 다른 파견 업체의 개발자들과 AWS 워크스페이스로 가상 데스크탑에서 <span>SVN</span>을 통해 협업하였습니다.<br/>
                                업무가 주어지는 방식은 캠페인 하나당 디자이너 1명 퍼블리셔 1명으로 배정되어 진행되었고, 모든 업무는 협업관리툴인 <span>트렐로</span>에 공유가 되었습니다. (자세한 내용은 프로젝트 메뉴에 기재하였습니다)
                            </p>
                        </div>
                    </div>
                    <div className={openFutureBox ? 'feature active' : 'feature'}>
                        <p className='title' onClick={onClickOpenFutureBox}><span>{`<class="현재"> `}</span>프론트엔드 개발자 준비생 <FontAwesomeIcon icon={faChevronDown} /></p>
                        <div className='detail'>
                            <p>이전 회사에서의 업무를 진행하며 느꼈던 프론트단에 대한 구현 갈증은 인프런 혹은 노마드코더 강의 사이트를 통해 채우기 시작했습니다.</p><br/>
                            <h4>흐름 파악이 중요한 사람</h4>
                            <p>
                                프론트엔드단과 백엔드단 그리고 배포까지 전반적인 흐름을 알고 싶어 수강한 강좌를 통해 <span>vanilaJS</span> <span>nodeJS</span> <span>express</span> 를 기반으로 한 <a href='https://damp-hamlet-01736.herokuapp.com/' target='_blank'>냉장고프로젝트</a> 사이트를 만들어보았습니다. (참고 강의 : 노마드님의 [풀스택] 유튜브 만들기)
                            </p><br/>
                            <h4>트렌드 기술에 관심이 많아요</h4>
                            <p>
                                냉장고프로젝트 작업 이후 메뉴 화면 이동시 새로고침이 되는 화면이 아닌 상태값을 유지하며 라우터가 이동되는 SPA(Single Page Application)을 만들어 보고 싶어 <span>REACT</span> 관련 강좌를 토대로 <Link href='/project/drleesf'><a>이박사물회</a></Link> 사이트를 만들게 됐습니다. (참고 강의 : 제로초님의 리액트로 웹게임 만들기)
                            </p><br/>
                            <h4>더 나은 구현물에 욕심이 나요</h4>
                            <p>
                                단순히 보여지는 소개용 페이지들에서 더 나아가 컨텐츠를 추가하고 조회하고 수정하고 삭제하는 기능이 있는 사이트를 만들어 보고 싶어 리액트 관련 강좌를 토대로 이전에 만들었던 냉장고프로젝트의 리액트 버전인 <Link href='/project/rgproject-react'><a>냉장고 프로젝트 리액트</a></Link> 사이트를 만들었습니다. (참고 강의 : 제로초님의 리액트로 노드버드 만들기)<br/>
                                해당 프로젝트를 진행하며 컨텐츠의 데이터베이스 적용을 위해 비동기 방식 처리가 필요한 부분은 <span>ReduxSaga</span>를 이용했고 초기의 로딩 속도 개선을 위해 <span>SSR</span>(Server Side Rendering)을 적용하였습니다.
                            </p><br/>
                            <h4>기록은 나의 성장 발판</h4>
                            <p>
                                어떤 개발자가 되고 싶은지에 대한 고민을 많이 해보았습니다.<br/>
                                구글을 검색하며 좋은 개발자에 대한 글도 읽어보았고 프론트엔드 개발자가 갖춰야할 기술 파악도 해보았지만<br/>
                                가장 중요한 건 복습과 기록을 통해 내가 배울 것이 얼마나 많은지 상기하는 것이었습니다.<br />
                                기본이 튼튼한 개발자가 되기 위해 <Link href='/project/mollog'><a>몰로그</a></Link>를 만들게 되었고 <br />
                                동작하는 코드를 끝이 아닌 시작으로 놓고 개선점을 찾아가는 개발자가 되기 위해 노력합니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='box skill'>
                    <h3># 기술 스택</h3>
                    <div className='feature'>
                        <p className='title'><span>{`<id="프론트엔드"> `}</span>퍼블리싱과 SPA 프레임워크</p>
                        <div className='detail'>
                            <ul>
                                <li>
                                    <div><img src="/images/skill_html.png" alt=""/></div>
                                    <div className='description'>
                                        <strong>HTML</strong><span>실무</span>
                                        <p>태그를 활용한 마크업</p>
                                    </div>
                                </li>
                                <li>
                                    <div><img src="/images/skill_pug.png" alt=""/></div>
                                    <div className='description'>
                                        <strong>PUG</strong><span>토이</span>
                                        <p>태그를 활용한 마크업</p>
                                    </div>
                                </li>
                                <li>
                                    <div><img src="/images/skill_scss.png" alt=""/></div>
                                    <div className='description'>
                                        <strong>SCSS/CSS</strong><span>실무</span>
                                        <p>PSD 화면 퍼블리싱 & 공통된 값 변수 처리하여 사용 & mixin 사용</p>
                                    </div>
                                </li>
                                <li>
                                    <div><img src="/images/skill_javascript.png" alt=""/></div>
                                    <div className='description'>
                                        <strong>JAVASCRIPT</strong><span>토이</span>
                                        <p>VanillaJS·ES6 기본 문법 활용</p>
                                    </div>
                                </li>
                                <li>
                                    <div><img src="/images/skill_react.png" alt=""/></div>
                                    <div className='description'>
                                        <strong>REACT</strong><span>토이</span>
                                        <p>Hooks 문법 & NEXT 프레임워크 사용한 동적 라우터 사용·getInitialProps이용한 서버사이드 렌더링</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='feature'>
                        <p className='title'><span>{`<id="백엔드"> `}</span>RestAPI 서버 구축</p>
                        <div className='detail'>
                            <ul>
                                <li>
                                    <div><img src="/images/skill_node.png" alt=""/></div>
                                    <div className='description'>
                                        <strong>nodeJS</strong><span>토이</span>
                                        <p>Express기반의 REST API 구축</p>
                                    </div>
                                </li>
                                <li>
                                    <div><img src="/images/skill_mysql.png" alt=""/></div>
                                    <div className='description'>
                                        <strong>MySQL</strong><span>토이</span>
                                        <p>Sequelize 사용한 db 테이블 구성</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='feature'>
                        <p className='title'><span>{`<id="배포"> `}</span>형상관리와 유지보수와 서버 구축</p>
                        <div className='detail'>
                            <ul>
                                <li>
                                    <div><img src="/images/skill_aws.png" alt=""/></div>
                                    <div className='description'>
                                        <strong>AWS</strong><span>토이</span>
                                        <p>EC2·Route53·S3 를 이용한 서버 구축 및 관리</p>
                                    </div>
                                </li>
                                <li>
                                    <div><img src="/images/skill_git.png" alt=""/></div>
                                    <div className='description'>
                                        <strong>GIT</strong><span>실무</span>
                                        <p>프로젝트를 진행하면서 형상관리 툴 경험</p>
                                    </div>
                                </li>
                                <li>
                                    <div><img src="/images/skill_svn.png" alt=""/></div>
                                    <div className='description'>
                                        <strong>SVN</strong><span>실무</span>
                                        <p>프로젝트를 진행하면서 형상관리 툴 경험</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;