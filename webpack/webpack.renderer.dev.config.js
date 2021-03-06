const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { spawn } = require('child_process');
const ESLintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const baseConfig = require('./webpack.renderer.config');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: {
        renderer: './src/renderer/index.tsx',
        vendors: ['react', 'react-dom', 'react-refresh/runtime'],
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new ESLintPlugin(), new ReactRefreshWebpackPlugin()],
    optimization: {
        moduleIds: 'named',
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [require.resolve('react-refresh/babel')],
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        port: 2003,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        hotOnly: true,
        contentBase: path.join(__dirname, '../dist'),
        historyApiFallback: {
            verbose: true,
            disableDotRule: false,
        },
        before() {
            console.log('Starting main process');
            spawn('npm', ['run', 'start-main-dev'], {
                shell: true,
                env: process.env,
                stdio: 'inherit',
            })
                .on('close', (code) => process.exit(code))
                .on('error', (spawnError) => console.error(spawnError));
        },
    },
});
