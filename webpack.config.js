const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
module.exports = {
	entry: {
		vendor: ['jquery','./src/js/common.js'],
		index: './src/js/index.js',
		cart: './src/js/cart.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js',
		publicPath: ''
	},
	module: {
		rules:[
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				use: [
				  {
					loader: MiniCssExtractPlugin.loader,
					options: {
					  publicPath: '../'
					}
				  },
				  "css-loader"
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin({
			root: path.resolve(__dirname, ''),
			verbose: true,
			dry: false
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			chunks: ['index','vendor']
		}),
		new HtmlWebpackPlugin({
			filename: 'cart.html',
			template: './src/cart.html',
			chunks: ['cart']
		}),
		new MiniCssExtractPlugin({
		  filename: "[name].css",
		  chunkFilename: "[id].css"
		})
	],
	optimization: { 
		splitChunks: {

			cacheGroups: {

				commons: {

					test: /node_modules/,

					name: "vendor",

					chunks: "all"

				}

			}

		}
	}
	// devtool: '#source-map'
}