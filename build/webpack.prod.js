const { merge } = require("webpack-merge");
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const path = require('path');
const globAll = require('glob-all');
const CopyPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css导出到link引入
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 压缩css
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js
const CompressionPlugin = require('compression-webpack-plugin');



const baseConfig = require("./webpack.base.js");


module.exports = merge(baseConfig, {
    mode: "production",
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: path.resolve(__dirname, '../dist'),
                    filter: source => { 
                        return !source.includes('index.html')
                    }
                }
            ]
        }),
        // css插件
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),
        new PurgeCSSPlugin({
            paths: globAll.sync([
                `${path.join(__dirname, '../src')}/**/*.tsx`,
                path.join(__dirname, '../public/index.html')
            ]),
            standard: [/^ant-/], // 用不到也不会删除
        }),
        new CompressionPlugin({
            test: /.(js|css)$/,
            filename: '[path][base].gz', // 文件命名
            algorithm: 'gzip', // 压缩算法
            test: /\.(js|css)$/,
            threshold: 10 * 1024, // 大于10kb才会被压缩
            minRatio: 0.8,
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true, // 多线程压缩
                terserOptions: {
                    compress: {
                        pure_funcs: ["console.log"] // 删除console.log
                    }
                }
            })
        ],
        splitChunks: { // 代码分割
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    name: 'vendors',
                    minChunks: 1,
                    chunks: 'initial',
                    minSize: 0,
                    priority: 1,
                },
                commons: {
                    name: 'commons',
                    minChunks: 2,
                    chunks: 'initial',
                    minSize: 0,
                }
            }
        }
    }
})