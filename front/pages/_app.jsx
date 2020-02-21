import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import AppLayout from '../Components/AppLayout';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import '../assets/styles.scss';
import axios from 'axios';
import Helmet from 'react-helmet';
import App, { Container } from 'next/app';
import { LOAD_USER_REQUEST } from '../reducers/user';

const Mollang = ({ Component, store, pageProps }) => {
    return (
        <Container>
            <Provider store={store}>
            <Helmet
                title="mollang"
                htmlAttributes={{ lang: 'ko' }}
                meta={[{
                    charset: 'UTF-8',
                }, {
                    name: 'viewport',
                    content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
                }, {
                    'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
                }, {
                    name: 'description', content: '몰로그의 블로그',
                }, {
                    name: 'og:title', content: 'mollang',
                }, {
                    name: 'og:description', content: '몰로그의 블로그',
                }, {
                    property: 'og:type', content: 'website',
                }, {
                    property: 'og:image', content: '/images/favicon.ico',
                }]}
                link={[{
                    rel: 'shortcut icon', href: '/images/favicon.ico',
                }, {
                    rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
                },{
                    rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css',
                }, {
                    rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/tui-calendar/1.12.7/tui-calendar.css',
                }, {
                    rel: 'stylesheet', href: 'https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css',
                }, {
                    rel: 'stylesheet', href: 'https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.css',
                },{
                    rel : 'stylesheet', type : 'text/css', href: '/_next/static/css/styles.chunk.css',
                }, ]}
                script={[{
                    src: 'https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js'
                }]}
                />
            {/*<Head>
                <title>mollang</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta charSet="utf-8" />
                <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css' />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> 

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tui-calendar/1.12.7/tui-calendar.css" />
                <link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
                <link rel="stylesheet" href="https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.css" />
                <script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
                
            </Head>*/}
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Provider>
        </Container>
    );
};

Mollang.propTypes = {
    Component : PropTypes.elementType,
    store : PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
};

Mollang.getInitialProps = async (context) => {
    const { ctx, Component } = context;
    let pageProps = {};
    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
    if (ctx.isServer) {
        axios.defaults.headers.Cookie = '';
    }
    if (ctx.isServer && cookie) {
        axios.defaults.headers.Cookie = cookie;
        // 토큰 설정도 이곳에서 가능
    }
    if (!state.user.me) {
        ctx.store.dispatch({
            type : LOAD_USER_REQUEST,
        });
    } // 내 정보를 먼저 가져오고
    if (Component.getInitialProps) { 
        pageProps = await context.Component.getInitialProps(ctx); // 페이지들의 getInitialProps를 실행
    }

    return {pageProps};
};

export default withRedux((initialState, options) => {
    // middlewares는 state와 리듀서 사이에 껴서 비동기식 동작에 관여한다 (데브툴즈 포함)
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
        console.log(action);
        next(action);
    }];
    // enhancer로 리덕스 기능을 미들웨어들로 향상시키는 개념
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(
        applyMiddleware(...middlewares)
    );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
})(withReduxSaga(Mollang));