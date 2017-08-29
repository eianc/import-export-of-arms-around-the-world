const webpack = require('webpack');
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'javascript', 'app'),
    build: path.join(__dirname, 'public', 'build'),
    public: path.join(__dirname, 'public'),
};

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

var commonConfig = merge([
    {
        entry: {
            app: PATHS.app,
        },
        output: {
            path: PATHS.build,
            publicPath: '/public/build/',
            filename: '[name].js',
        },
        plugins: [
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor',
            //     minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
            // }),
            new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: true,
            }),
        ],
        stats: {
            hash: false,
            version: false,
            children: false,
        },
        resolve: {
            extensions: ['.scss', '.js'],
            modules: ['node_modules', 'javascript', 'styles'],
        },
    },
    parts.defineGlobals({
        'process.env.NODE_ENV': process.env.NODE_ENV || 'development',
        '__DEV__': !IS_PRODUCTION,
    }),
    parts.lintStyles(),
    parts.lintJavaScript({ include: PATHS.app }),
    parts.loadJavaScript({ isDev: !IS_PRODUCTION, exclude: [/node_modules/, /vendor/] }),
]);

const developmentConfig = merge([
    parts.devTool('eval-source-map'),
    parts.devServer(),
    parts.loadStyles(),
    parts.browserSync(),
]);

const productionConfig = merge([
    {
        output: {
            filename: '[name].[chunkhash:8].js',
        },
        plugins: [
            new CleanWebpackPlugin([PATHS.build], {
                verbose: false,
            }),
            new ManifestPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false,
                },
                output: {
                    comments: false,
                },
            }),
        ],
    },
    parts.devTool('source-map'),
    parts.extractStyles(),
]);

module.exports = merge(commonConfig, IS_PRODUCTION ? productionConfig : developmentConfig);
