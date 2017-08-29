const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const BrowserSyncPlugin = IS_PRODUCTION ? null : require('browser-sync-webpack-plugin');
const path = require('path');

exports.lintStyles = () => ({
    plugins: [
        new StyleLintPlugin({
            failOnError: false,
        }),
    ],
});

exports.loadJavaScript = ({ isDev, include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: isDev,
                    },
                },
            },
        ],
    },
});

exports.lintJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                enforce: 'pre',
                use: 'eslint-loader',
            },
        ],
    },
});

exports.loadStyles = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            sourceMap: true,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.join(__dirname, 'styles')],
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
});

exports.extractStyles = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                sourceMap: true,
                                minimize: true,
                            },
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [path.join(__dirname, 'styles')],
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].css',
        }),
    ],
});

exports.devServer = () => ({
    devServer: {
        publicPath: '/public/build/',
        historyApiFallback: true,
        hot: true,
        stats: 'errors-only',
        overlay: {
            errors: true,
            warnings: true,
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
});

exports.devTool = (devtool) => ({
    devtool,
});

exports.defineGlobals = (items) => {
    const globalConsts = Object.keys(items).reduce((obj, key) => {
        obj[key] = JSON.stringify(items[key]);
        return obj;
    }, {});

    return {
        plugins: [
            new webpack.DefinePlugin(globalConsts),
        ],
    };
};

exports.browserSync = () => {
    return BrowserSyncPlugin ? {
        plugins: [
            new BrowserSyncPlugin(
                {
                    host: 'localhost',
                    port: 3000,
                    proxy: 'http://localhost:8080/',
                },
                {
                    reload: false,
                }
            ),
        ],
    } : null;
};
