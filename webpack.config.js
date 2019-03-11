const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 9000
  },

  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      
    ]
  },
  
node: {
  fs: "empty"
},

plugins: [  
  new CleanWebpackPlugin(['dist']),
  
  new HtmlWebpackPlugin({
    title: 'Wipro Weather App',
    template: './index.html',
    inject: false
  }),

  new MiniCssExtractPlugin({
    filename: 'app.css'
  }),

],
  stats: {
    children: false
  }
}