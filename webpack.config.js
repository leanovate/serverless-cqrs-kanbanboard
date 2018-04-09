const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: slsw.lib.entries,
    externals: [nodeExternals()],
    target: 'node',
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            include: __dirname,
            exclude: /node_modules/,
        }]
    }
};