const merge = require('webpack-merge');

const TerserJSPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.main.config');

module.exports = merge.smart(baseConfig, {
    mode: 'production',
    devtool: false,
    optimization: {
        minimizer: [new TerserJSPlugin({})]
    }
});
