import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Document, { Main, NextScript, Head } from 'next/document';
import {readFileSync} from 'fs';
import {join} from 'path';

class NextHeadWithInInlineCss extends Head {
  getInlineCss() {
    const {files} = this.context._documentProps;
    console.log(files);
    if (!files || files.length === 0) return null;
    return files.filter(file => /\.css$/.test(file)).map(file => (
      <style key={file} dangerouslySetInnerHTML={{
              __html: readFileSync(join(process.cwd(), '.next', file), 'utf-8'), // .next 경로부터 읽어오기 위함.
          }}
      />
    ))  
    // css 파일만 사용
                    
  }

  render() {
    return this.getInlineCss();
  }
}

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
              <NextHeadWithInInlineCss/>
              <head>
                
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