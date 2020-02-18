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
                            <p>
                                html, jQuery, scss를 이용해 레이아웃과 효과를 추가한 원페이지 형식인 다수의 캠페인 작업을 데스크탑/모바일을 한 세트로 진행하였습니다. <br/>
                                <a className='link' href='https://shop.adidas.co.kr/PF020620.action?pn=BTS' target='_blank'>백투스쿨 캠페인 </a>
                                <a className='link' href='https://shop.adidas.co.kr/html/adidas/2019/event/ultra_boost/1204/build/index.html' target='_blank'>울트라부스트 캠페인 </a>
                                <a className='link' href='https://shop.reebok.co.kr/brand/campaign/pnView.action?pn=BT21_Reebok' target='_blank'>BT21 캠페인 </a> 등...
                            </p>
                        </div>
                    </div>
                    <div className={openFutureBox ? 'feature active' : 'feature'}>
                        <p className='title' onClick={onClickOpenFutureBox}><span>아디다스 / 리복 사이트 시스템 코딩</span> <FontAwesomeIcon icon={faChevronDown} /></p>
                        <div className='detail'>
                            <p>
                                html, jQuery, scss를 이용해 레이아웃과 효과를 추가한 원페이지 형식인 다수의 캠페인 작업을 데스크탑/모바일을 한 세트로 진행하였습니다. <br/>
                                <a className='link' href='https://shop.adidas.co.kr/PF020620.action?pn=BTS' target='_blank'>백투스쿨 캠페인 </a>
                                <a className='link' href='https://shop.adidas.co.kr/html/adidas/2019/event/ultra_boost/1204/build/index.html' target='_blank'>울트라부스트 캠페인 </a>
                                <a className='link' href='https://shop.reebok.co.kr/brand/campaign/pnView.action?pn=BT21_Reebok' target='_blank'>BT21 캠페인 </a> 등...
                            </p>
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