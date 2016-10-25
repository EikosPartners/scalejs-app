const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'public'),
    entry: {
        webpack: 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        app: [path.resolve(__dirname, 'public/src/app/app.js'),'webpack-hot-middleware/client?path=/__webpack_hmr'] // entry point location to app
    },
    resolve: {
        root: [__dirname, path.join(__dirname, 'public/src/')],
        alias: {
            // scalejs
            'scalejs.application': path.join(__dirname, 'node_modules/scalejs/dist/scalejs.application.js'),
            'scalejs.core': path.join(__dirname, 'node_modules/scalejs/dist/scalejs.core.js'),
            'scalejs.sandbox': path.join(__dirname, 'node_modules/scalejs/dist/scalejs.sandbox.js'),

            // extensions
        }
    },
    output: {
        path: __dirname,
        publicPath: '/build/',
        filename: '[name].bundle.js'
    },
    _resolveLoader: {
        alias: {
            'hot-loader': path.join(__dirname, 'public/loaders/hot-loader')
        }
    },
    module: {
        preLoaders: [
            /*{
                test: [
                    /Module\.js$/
                ],
                loader: 'hot-loader'
            },*/
            {
                test: [
                    path.join(__dirname, 'node_modules/scalejs')
                ],
                loader: 'source-map-loader'
            }
        ],
        loaders: [
            {
                loader: 'babel-loader',
                test: [
                    path.join(__dirname, 'public/src')
                ],
                exclude: /\.html?$/,
                query: {
                  presets: 'es2015',
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader',
            },
            {
                test: /\.woff|\.woff2|\.svg|.eot|\.png|\.jpg|\.ttf/,
                loader: 'url?prefix=font/&limit=10000'
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //new ExtractTextPlugin('main.css') // TODO: move to production config
    ],
    // Create Sourcemaps for the bundle
    devtool: 'source-map'
};
