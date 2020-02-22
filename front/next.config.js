// const withSass = require('@zeit/next-sass');
// module.exports = withSass({
//     cssModules: true
// });
const webpack = require('webpack');
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === 'true',
});
const withSass = require('@zeit/next-sass');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer(withSass({
    distDir : '.next',
    webpack(config) {
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [
            ...config.plugins,
            new MomentLocalesPlugin({
               localesToKeep: ['ko'],
           }),
           //new webpack.IgnorePlugin(/jsdom$/),
         ];
        if (prod) {
            plugins.push(new CompressionPlugin()); // gz 로 압축
        }
        return {
            ...config,
            mode : prod ? 'production' : 'development',
            devtool : prod ? 'hidden-source-map' : 'eval',
            plugins,
        }
    }
}));