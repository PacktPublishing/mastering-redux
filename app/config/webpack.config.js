const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const srcPath = path.join(__dirname, '..', 'src');

module.exports = {
  mode: 'development',
  entry: {
    main: path.join(srcPath, 'index.js')
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name]',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/static/'
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '..', 'dist')], {
      allowExternal: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(srcPath, 'index.html'),
      inject: 'body'
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
