const webpack = require('webpack');
const webpackConfig = require('./../webpack.config.js');
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
    const compiler = webpack(webpackConfig);
    let bundleStart = null;

    compiler.plugin('compile', () => {
        bundleStart = Date.now();
        console.log('building... ', bundleStart);
    });

    compiler.plugin('done', () => {
        console.log('building complete in ', Date.now() - bundleStart);
    });

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        quiet: false,
        noInfo: false,
        stats: {
            colors: true
        }
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
};
