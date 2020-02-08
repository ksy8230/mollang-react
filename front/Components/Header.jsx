import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <>
            <div><Link href='/'><a>로고</a></Link></div>
            <div className='search-box'>
                <input type="text" placeholder='검색' />
            </div>
            <div className='header links'>
                <nav>
                    <div><Link href='/profile'><a>프로필</a></Link></div>
                    <div><Link href='/blog'><a>블로그</a></Link></div>
                    {/* <div><Link href='/about'><a>작품들</a></Link></div>
                    <div><Link href='/about'><a>깃허브</a></Link></div> */}

                    <div><Link href='/blogAdmin'><a>블로그 관리자</a></Link></div>
                </nav>
            </div>
            <div className='header account'>
                <a href='/'>로그인</a>
            </div>
        </>
    );
};

export default Header;