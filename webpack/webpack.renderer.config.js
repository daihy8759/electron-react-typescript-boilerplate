const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    target: 'electron-renderer',
    entry: {
        app: './src/renderer/index.tsx',
    },
    node: {
        __dirname: true,
        __filename: process.env.NODE_ENV !== 'production',
    },
    output: {
        globalObject: 'this',
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname, '../src/renderer/utils/'),
            components: path.resolve(__dirname, '../src/renderer/components/'),
            stores: path.resolve(__dirname, '../src/renderer/stores/'),
            views: path.resolve(__dirname, '../src/renderer/views/'),
            assets: path.resolve(__dirname, '../src/renderer/assets/'),
            root: path.resolve(__dirname, '../'),
            '@': path.resolve(__dirname, '../src/renderer/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                loader: 'babel-loader',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV !== 'production',
                            modules: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {},
                            },
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV !== 'production',
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                modifyVars: {
                                    'primary-color': '#ff4d4f',
                                },
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name]--[folder].[ext]',
                    },
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: 'src/renderer/index.html',
        }),
    ],
});
