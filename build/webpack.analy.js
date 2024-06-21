const prodConfig = require('./webpack.prod.js');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { merge } = require('webpack-merge');
const smp = new SpeedMeasurePlugin();

// 与MiniCssExtractPlugin冲突，重置一下就可以了
const webpackConfig = merge(prodConfig, {});
const cssPluginIndex = webpackConfig.plugins.findIndex(e => e.constructor.name === 'MiniCssExtractPlugin');
const cssPlugin = webpackConfig.plugins[cssPluginIndex];

const configToExport = smp.wrap(webpackConfig);

configToExport.plugins[cssPluginIndex] = cssPlugin;



module.exports = configToExport;
