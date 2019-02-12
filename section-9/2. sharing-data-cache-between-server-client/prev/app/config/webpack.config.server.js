const path = require('path');

const srcPath = path.join(__dirname, '..');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    server: path.join(srcPath, 'server-render.js')
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '..', 'dist')
  },
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
