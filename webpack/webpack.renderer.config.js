const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
    target: 'electron-renderer',
    entry: {
        app: './src/renderer/index.tsx'
    },
    node: {
        __dirname: true,
        __filename: process.env.NODE_ENV !== 'production'
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname, '../src/renderer/utils/'),
            components: path.resolve(__dirname, '../src/renderer/components/'),
            views: path.resolve(__dirname, '../src/renderer/views/'),
            assets: path.resolve(__dirname, '../src/renderer/assets/'),
            root: path.resolve(__dirname, '../'),
            '@': path.resolve(__dirname, '../src/renderer/')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: [path.resolve(__dirname, '../src/renderer')],
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                loader: 'native-ext-loader',
                options: {
                    emit: false
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV !== 'production',
                            modules: {
                                localIdentName:
                                    process.env.NODE_ENV !== 'production' ? '[local]--[hash:base64:5]' : '[hash:base64]'
                            }
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV !== 'production'
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'fonts/[name]--[folder].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: 'src/renderer/index.html'
        })
    ]
});
