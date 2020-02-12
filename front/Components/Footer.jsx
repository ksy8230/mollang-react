import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className='logo'><img src="/images/logo_mollang.png" alt=""/></div>
            <div className='contact'>
                <span><img src="/images/icon_email.png" alt=""/></span>
                <span><img src="/images/icon_talk.png" alt=""/></span>
                <span><img src="/images/ico_github.png" alt=""/></span>
            </div>
            <p>Copyright ⓒ 2020 Mollang All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;