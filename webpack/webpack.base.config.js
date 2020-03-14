const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.node'],
        alias: {
            shared: path.resolve(__dirname, '../src/shared')
        }
    }
};
