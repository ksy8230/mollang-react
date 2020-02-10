import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import AppLayout from '../Components/AppLayout';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const Mollang = ({ Component, store, pageProps }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>mollang</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta charSet="utf-8" />
                {/* 공통으로 사용하는 css */}
                <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css' />

                {/* 공통으로 사용하는 js */}
            </Head>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Provider>
    );
};

Mollang.propTypes = {
    Component : PropTypes.elementType,
    store : PropTypes.object.isRequired,
};

Mollang.getInitialProps = async (context) => {
    const { ctx, Component } = context;
    //console.log('ctx', ctx)
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await context.Component.getInitialProps(ctx); 
    }
    return {pageProps};
};

export default withRedux((initialState, options) => {
    // middlewares는 state와 리듀서 사이에 껴서 비동기식 동작에 관여한다 (데브툴즈 포함)
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    // enhancer로 리덕스 기능을 미들웨어들로 향상시키는 개념
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(
        applyMiddleware(...middlewares)
    );
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
})(Mollang);