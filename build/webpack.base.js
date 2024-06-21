const path = require('path');
const webpack = require('webpack');

const HtmlWepackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
// 配置样式的相关loader
const getCssLoaders = () => { 
    const cssLoaders = [
        isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: '[local]--[hash:base64:5]'
                },
                sourceMap: isDevelopment
            }
        }
    ];
    cssLoaders.push('sass-loader');
    isProduction && cssLoaders.push('postcss-loader');
    return cssLoaders;
}

module.exports = {
    entry: {
        main: path.join(__dirname, "../src/index.tsx")
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "static/js/[name].[chunkhash:8].js",
        clean: true,
        publicPath: '/', // 打包文件后的公共前缀路径
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: getCssLoaders(),
            },
            // webpack 5资源方式小于8kb的转base 64, 大于的打包引入
            {
                test: /\.(jep?g|png|svg|gif)$/,
                type: 'asset',
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                use: "babel-loader"
            },
             {
                test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb转base64位
                }
                },
                generator:{ 
                    filename:'static/fonts/[name][ext]', // 文件输出目录和命名
                },
            },
             {
                test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb转base64位
                }
                },
                generator:{ 
                    filename:'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },      
            },
        ]
    },
    plugins: [
        new HtmlWepackPlugin({
            title: 'Webpack Demo',
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "src"),
        },
        extensions: ['.js', '.tsx', '.ts']
    }
}