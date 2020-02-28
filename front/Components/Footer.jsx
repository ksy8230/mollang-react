import React, { useState, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    
    top: -130%
  }
  to {
    top: -150%
  }
`;

const Pop = styled.div`
    position: absolute;
    width: 120px;
    top: -130%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 180px;
    padding: 1rem;
    background:rgba(255,255,255,0.8);
    box-shadow: rgba(0,0,0,0.1) 0px 0px 8px;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
    p {
        color:#252525;
    }
`;

const Footer = () => {
    const [mailPop, setMailPop] = useState(false);
    const [talkPop, setTalkPop] = useState(false);
    const [animate, setAnimate] = useState(false);

    const onClickMail = useCallback(() => {
        setMailPop(!mailPop);
        setTalkPop(false);
        setAnimate(true);
        setTimeout(() => setMailPop(false), 5000);
    }, [mailPop, talkPop]);
    const onClickTalk = useCallback(() => {
        setMailPop(false);
        setTalkPop(!talkPop);
        setTimeout(() => setTalkPop(false), 5000);
    }, [mailPop, talkPop]);

    return (
        <footer>
            <div className='logo'><img src="/images/logo_mollang.png" alt=""/></div>
            <div className='contact'>
                <span onClick={onClickMail}><img src="/images/icon_email.png" alt=""/></span>
                {mailPop ? <Pop><p><a href='mailto:mollog8230@gmail.com'>mollog8230@gmail.com</a></p></Pop> : null}
                <span onClick={onClickTalk}><img src="/images/icon_talk.png" alt=""/></span>
                {talkPop ? <Pop><p>asdf8230</p></Pop> : null}
                <span><a href='https://github.com/ksy8230' target='_blank'><img src="/images/ico_github.png" alt=""/></a></span>
            </div>
            <p>Copyright ⓒ 2020 Mollang All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;