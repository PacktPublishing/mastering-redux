const path = require('path');
const fs = require('fs');

const srcPath = path.join(__dirname, '..', '..');

const externals = fs
  .readdirSync(path.resolve(__dirname, '..', '..', 'node_modules'))
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

externals['react-dom/server'] = 'commonjs react-dom/server';

module.exports = {
  mode: 'development',
  entry: {
    server: path.join(srcPath, 'server-render.js')
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '..', '..', 'dist', 'server')
  },
  externals,
  target: 'node',
  resolve: {
    alias: {
      src: path.resolve(srcPath, 'src'),
      components: path.resolve(srcPath, 'src', 'components')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};
