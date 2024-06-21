const path = require('path');
const baseConfig = require('./webpack.base.js');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 配置开发环境
module.exports = merge(baseConfig, {
    mode: "development",
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ],
    devServer: {
        port: 3000,
        compress: false,
        hot: true, 
        historyApiFallback: true, // 解决history路由404问题
        static: {
            directory: path.join(__dirname, '../public'),
        }
    }
});