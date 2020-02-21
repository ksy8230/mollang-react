// const withSass = require('@zeit/next-sass');
// module.exports = withSass({
//     cssModules: true
// });
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withSass = require('@zeit/next-sass');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer(withSass({
    distDir : '.next',
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    },
    webpack(config) {
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [
            ...config.plugins,
            new MomentLocalesPlugin({
               localesToKeep: ['ko'],
           }),
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