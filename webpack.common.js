const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const DIST_DIR = path.resolve(__dirname, 'build')
const SRC_DIR = path.resolve(__dirname, 'src')

module.exports = {
    entry: {
        background: [path.join(SRC_DIR, 'background.js')],
        content: [path.join(SRC_DIR, 'content.js')],
        index: [path.join(SRC_DIR, 'index.js')]
    },
    output: {
        path: DIST_DIR,
        filename: '[name].js',
        publicPath: './',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(SRC_DIR, 'manifest.json') },
                { from: path.join(SRC_DIR, 'icons/'), to: './icons' },
                { from: path.join(SRC_DIR, 'index.html') },
                { from: path.join(SRC_DIR, 'extra'), to: './' }
            ]
        })
    ]
}