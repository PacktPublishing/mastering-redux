const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.join(__dirname, '..', 'src');

module.exports = {
  entry: path.join(srcPath, 'index'),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist', 'client'),
    publicPath: '/static/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(srcPath, 'index.html'),
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(srcPath),
      components: path.resolve(srcPath, 'components')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  }
};
