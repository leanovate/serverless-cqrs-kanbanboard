/*eslint-disable */
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const alwaysIncludeFiles = ['src/cqrs/**'];

module.exports = {
    node: {
        __dirname: true
    },
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
    ],
    plugins: [
        new CopyWebpackPlugin(alwaysIncludeFiles)
    ]
}
