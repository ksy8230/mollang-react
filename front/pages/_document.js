import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Document, { Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static getInitialProps(context) {
        const page = context.renderPage((App) => (props) => <App {...props} />)
        return { ...page, helmet: Helmet.renderStatic() };
    }
    render() {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();
        return (
            <html {...htmlAttrs}>
              <head>
                {this.props.styleTags}
                {Object.values(helmet).map(el => el.toComponent())}
              </head>
              <body {...bodyAttrs}>
                <Main />
                {process.env.NODE_ENV === 'production'
                && <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />}
                <NextScript />
              </body>
            </html>
          );
    }
}

MyDocument.propTypes = {
    helmet : PropTypes.object.isRequired,
}

export default MyDocument;