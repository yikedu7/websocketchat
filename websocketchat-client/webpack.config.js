'use strict';

var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglify-js-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 阅读 webpack 文档 
module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./app/index.tpl.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],

    optimization: {
        minimizer: [
          // we specify a custom UglifyJsPlugin here to get source maps in production
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: false,
              ecma: 6,
              mangle: true
            },
            sourceMap: true
          })
        ]
    },

    resolve:{
        extensions:['*','.js','.json']
    },        
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader"
              } 
            },
/*            {
                test: /\.html/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'file-loader',
                    options: { name: '[name].[ext]' },
                }]
            },*/
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader",
                    options: { minimize: true }
                  }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
            /*{
                test: /\.json?$/,
                loader: 'json-loader'
            },*/
            /*{
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }*/
        ]
    }
};