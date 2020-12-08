const { merge } = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require('./webpack.renderer.config');

let plugins = [];
if (process.env.analyzer) {
    plugins = [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundleReport.html',
            logLevel: 'info',
        }),
    ];
}

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: false,
    optimization: {
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    priority: 10,
                },
            },
        },
    },
    output: {
        filename: '[name].[contentHash].js',
        chunkFilename: '[name].[contentHash].chunk.js',
    },
    plugins,
});
