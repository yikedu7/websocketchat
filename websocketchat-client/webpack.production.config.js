'use strict';

var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglify-js-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // The entry file. All your app roots fromn here.
    entry: [
        path.join(__dirname, 'app/index.js')
    ],
    // Where you want the output to go
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    plugins: [

        // handles creating an index.html file and injecting assets. necessary because assets
        // change name because the hash part changes. We want hash name changes to bust cache
        // on client browsers.
        new HtmlWebPackPlugin({
            template: "./app/index.tpl.html",
            filename: "./index.html"
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),

        // plugin for passing in data to the js, like what NODE_ENV we are in.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
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
    }

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
           /* {
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
    },
    postcss: [
        require('autoprefixer')
    ]
};