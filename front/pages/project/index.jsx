import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCaretSquareDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const Project = () => {
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
            <div className='project'>
                <h2>나의 프로젝트들을 소개합니다</h2>

                <div className='box'>
                    <h3># 회사 프로젝트</h3>
                    <p>구성원으로서 진행을 했던 업무 및 프로젝트 입니다.</p>
                    <div className={openPastBox ? 'feature active' : 'feature'}>
                        <p className='title' onClick={onClickOpenPastBox}><span>아디다스 / 리복 캠페인 페이지</span> <FontAwesomeIcon icon={faChevronDown} /></p>
                        <div className='detail'>
                            <h4>어떤 페이지인가요?</h4>
                            <p>
                                html, jQuery, css를 이용해 레이아웃과 효과를 추가한 원페이지 형식의 단타성 홍보 페이지입니다. 데스크탑/모바일을 한 세트로 진행하였습니다. <br/>
                                <a className='link' href='https://shop.adidas.co.kr/PF020620.action?pn=BTS' target='_blank'>백투스쿨 캠페인 </a>
                                <a className='link' href='https://shop.adidas.co.kr/PF020620.action?pn=BTS' target='_blank'>백투스쿨 캠페인 </a>
                                <a className='link' href='https://shop.adidas.co.kr/html/adidas/2019/event/ultra_boost/1204/build/index.html' target='_blank'>울트라부스트 캠페인 </a>
                                <a className='link' href='https://shop.reebok.co.kr/brand/campaign/pnView.action?pn=BT21_Reebok' target='_blank'>BT21 캠페인 </a> 등...
                            </p><br/>
                            <h4>구체적인 작업 방식은 어떻게 되나요?</h4>
                            <p>
                                1. html, scss로 전달 받은 디자인을 보며 코딩 작업 후, gulp로 scss를 컴파일링하여 해당 캠페인의 빌드 폴더 안에 css가 삽입된 html이 생성됩니다.<br />
                                2. 그 html 파일을 수작업으로 캠페인이름.html 파일로 변경 후 배포용(pn)폴더에 추가하여 AWS WorkSpace를 통해 데브로 1차 배포합니다. <br />
                                2-1. '캠페인이름' 파라미터 값을 ajax로 받아 해당 html이 아디다스 내부 페이지에 삽입이 되는 식이며 'https://dev.adidas.co.kr/PF020620.action?pn=캠페인이름'의 url이 생성됩니다. <br />
                                3. 담당 디자이너에게 데브 url 공유 후 컨펌이 되면 내부 관리자인 PM 실장님에게 최종 컨펌을 받습니다.<br />
                                4. 피드백과 최종 수정 후 라이브로 2차 배포하여 'https://shop.adidas.co.kr/PF020620.action?pn=캠페인이름'이 최종으로 생성됩니다.<br />
                            </p><br/>
                            <h4>전체 작업 흐름 중 본인의 기여도는 어디까지인가요?</h4>
                            <p>주된 작업은 html, css로 PSD를 보며 퍼블리싱을 하는 것이었고 개발팀에서 세팅해준 자동화 빌드 및 배포 환경인 젠킨스로 데브 배포, 라이브 배포를 진행하였습니다.<br />
                                캠페인 내 발생하는 디자인 수정과 효과 관련한 스크립트 오류 수정 및 IE 버전 10까지 호환하는 작업도 겸하였습니다.
                            </p><br/>
                            <h4>하나의 캠페인을 기준으로 작업 진행 속도는 어떻게 되나요?</h4>
                            <p>캠페인 프로젝트는 광고 쪽과 연관된 프로젝트라 일정은 늘 타이트한 편이었습니다.<br/>
                            단순한 레이아웃 페이지는 웹, 모바일 세트로 일정에 따라 반나절만에 작업물이 나오기도 하고, 컨텐츠가 많은 경우 웹 1일 모바일 1일 식으로 총 2일 내에 한 세트가 만들어지는 편이었습니다.<br/> 
                            </p><br/> 
                            <h4>협업은 어떻게 이루어졌나요?</h4>
                            <p>프로젝트 하나 당 코더 1명 디자이너 1명으로 배분되었고, 기간 내에 가능한 간단한 스크립트 혹은 css 효과에 관련한 커뮤니케이션을 디자이너와 주로 하였습니다.
                            </p><br/> 
                        </div>
                    </div>
                    <div className={openFutureBox ? 'feature active' : 'feature'}>
                        <p className='title' onClick={onClickOpenFutureBox}><span>아디다스 / 리복 사이트 시스템 코딩</span> <FontAwesomeIcon icon={faChevronDown} /></p>
                        <div className='detail'>
                            <h4>어떤 페이지인가요?</h4>
                            <p>
                                시스템 및 내부 요청에 따른 페이지들 코딩을 진행하였습니다.<br/>
                                <a className='link' href='https://shop.adidas.co.kr/html/adidas/register_kakao.html' target='_blank'>회원가입</a>
                                <a className='link' href='https://shop.adidas.co.kr/html/adidas/mypage_08_01mypage_edit_2.html' target='_blank'>마이페이지</a>
                                <a className='link' href='https://shop.adidas.co.kr/html/adidas/product_list_sale.html' target='_blank'>상품 리스트</a> 
                                <a className='link' href='https://shop.adidas.co.kr/html/adidas/recruit.html' target='_blank'>채용 페이지</a> 
                                <a className='link' href='https://shop.adidas.co.kr/html/adidas/runbase_seoul_res01.html' target='_blank'>런베이스 예약 페이지</a> 
                            </p><br/>
                            <h4>구체적인 작업 방식은 어떻게 되나요?</h4>
                            <p>
                                1. html, css로 전달 받은 디자인을 보며 코딩 작업 후 AWS WorkSpace를 통해 데브로 1차 배포합니다. <br />
                                2. https://dev.adidas.co.kr/html/adidas/회원가입.html 식의 html url을 메일로 담당 개발자에게 공유합니다.<br />
                            </p><br/>
                            <h4>전체 작업 흐름 중 본인의 기여도는 어디까지인가요?</h4>
                            <p>주된 작업은 캠페인 프로젝트와 마찬가지로 html, css 퍼블리싱이 주였습니다.
                            </p><br/>
                            <h4>작업 진행 속도는 어떻게 되나요?</h4>
                            <p>2018년 1월 경에 마이페이지 전체 리뉴얼을 담당하였고 당시에 주어진 작업 기한은 5일이었으며 총 작업한 페이지 수는 24장이었습니다.
                            </p><br/>
                            <h4>협업은 어떻게 이루어졌나요?</h4>
                            <p>다른 파견 업체의 개발자 분과 스카이프로 커뮤니케이션을 진행하였습니다.<br/>
                            기획안이 따로 존재하지 않아 작업 도중 생기는 의문 사항(예를 들어 데이터가 없는 케이스의 페이지 디자인은 추가로 따로 코딩을 하여 전달해야 할지 아니면 개발상에서 알럿으로 처리를 할지)은 PM 실장님을 참조로 넣어 전체 메일로 공유하는 식으로 추가 작업이 진행되었고,<br/>
                            개발 도중 디자인이 틀어지는 부분에 대한 공유 메일을 받고 전달한 코딩본의 태그와 실제 입혀진 태그를 비교하여 피드백하는 일을 주로 하였습니다.
                            </p><br/> 
                        </div>
                    </div>
                </div>

                <div className='box'>
                    <h3># 개인 프로젝트</h3>
                    <p>다양한 기술을 학습하기 위해 만들어진 프로젝트입니다.</p>
                    <div className='project-list'>
                        <div className='project'>
                            <Link href='/project/mollog'><a></a></Link>
                            <img src="/images/project_mollog.jpg" alt=""/>
                            <div className='project-description'>
                                <strong>몰로그 홈페이지</strong>
                                <p>Next, React, NodeJS, Express, MySQL, AWS</p>
                                <p className='date'>2020.02.08 ~ </p>
                            </div>
                        </div>
                        <div className='project'>
                            <Link href='/project/rgproject-react'><a></a></Link>
                            <img src="/images/project_rgproject.jpg" alt=""/>
                            <div className='project-description'>
                                <strong>냉장고프로젝트 홈페이지</strong>
                                <p>Next, React, NodeJS, Express, MySQL, AWS</p>
                                <p className='date'>2020.01.14 ~ 2020.02.03</p>
                            </div>
                        </div>
                        <div className='project'>
                            <Link href='/project/drleesf'><a></a></Link>
                            <img src="/images/project_drleesf.jpg" alt=""/>
                            <div className='project-description'>
                                <strong>이박사물회 홈페이지</strong>
                                <p>React, AWS</p>
                                <p className='date'>2019.12.31 ~ 2020.01.10</p>
                            </div>
                        </div>
                        <div className='project'>
                            <Link href='/project/toygame-react'><a></a></Link>
                            <img src="/images/project_reduxtoygame.jpg" alt=""/>
                            <div className='project-description'>
                                <strong>리액트 토이 게임</strong>
                                <p>React</p>
                                <p className='date'>2019.12.29</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;