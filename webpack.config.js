/*eslint-disable */
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const path = require('path');

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: __dirname,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    externals: [
        {'aws-sdk': 'aws-sdk'},
        nodeExternals()
    ]
}
